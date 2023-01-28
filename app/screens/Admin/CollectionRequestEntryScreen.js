import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderRight from '../../navigation/HeaderRight';
import Colors from '../../constants/Colors';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';

import MyTextInput from '../../components/form/MyTextInput';
import MyImageSelector from '../../components/form/MyImageSelector';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';

import { ValidationType, KeyboardType, CapitalizeType, UserType, RequestStatus, FileType } from '../../constants/Enums';

import * as userAction from '../../store/actions/user';
import * as warehouseAction from '../../store/actions/warehouse';
import * as transporterAction from '../../store/actions/transporter';
import * as collectionrequestAction from '../../store/actions/collectionrequest';
import DetailsViewer from '../../components/DetailsViewer';
import * as GlobalFunctions from '../../common/GlobalFunctions';

const CollectionRequestEntryScreen = props => {

    const { params } = props.route;
    const [isLoading, setIsLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const collectionrequestData = useSelector(state => state.collectionrequests.record);

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const dispatch = useDispatch();

    const fetchAllData = async (pkid) => {
        try {
            setIsLoading(true);
            await dispatch(collectionrequestAction.getData(pkid));
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    useEffect(() => {

        props.navigation.setOptions({ title: 'Edit Collection Request' });

        if (params && params.id) {
            fetchAllData(params.id);
        } else {
            fetchAllData(0);
        }
    }, [dispatch]);


    useEffect(() => {
        if (collectionrequestData != null) {
            formValues['id'] = collectionrequestData.id;
            formValues['actual_drums_qty'] = collectionrequestData.actual_drums_qty;
            formValues['actual_volume'] = collectionrequestData.actual_volume;
            formValues['vehicle_no'] = collectionrequestData.vehicle_no;
            formValues['driver_name'] = collectionrequestData.driver_name;
            formValues['driver_mobile'] = collectionrequestData.driver_mobile;
            formValues['remarks'] = collectionrequestData.remarks;
            formValues['actual_completion_datetime'] = collectionrequestData.actual_completion_datetime;
        }
    }, [collectionrequestData]);


    const cancelClickHandler = navData => {
        props.navigation.navigate('CollectionDetail1', { token: 'refresh' });
    }

    const submitClickHandler = async () => {
        setIsSubmitting(true);
        setTimeout(() => {
            submitDetails();
        }, 50);
    }

    const submitDetails = async () => {
        let formValidated = true;

        for (let fe in formErrors) {
            if (formErrors[fe] != '') {
                formValidated = false;
                break;
            }
        }

        if (!formValidated) {
            GlobalFunctions.showErrorToast(() => setIsSubmitting(false));
            return;
        }

        setShowButtonLoader(true);

        console.log('details will be submitted now');

        try {
            await dispatch(collectionrequestAction.updateData(formValues));
            setIsSubmitting(false);
            setShowButtonLoader(false);
            props.navigation.navigate('CollectionDetail1', { token: 'refresh' });
        } catch (err) {
            setShowButtonLoader(false);
            setIsSubmitting(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }

    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <ScrollView keyboardShouldPersistTaps="handled">

            <View style={styles.container}>

                <MyTextInput name="actual_drums_qty" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['actual_drums_qty']} label="Actual Filled Drums Quantity" keyboardType={KeyboardType.Number}
                    refs={formRefs} nextCtl="actual_volume" validationType={ValidationType.DecimalRequired} />

                <MyTextInput name="actual_volume" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['actual_volume']} label="Actual Quantity (kg)" keyboardType={KeyboardType.Number}
                    refs={formRefs} nextCtl="vehicle_no" validationType={ValidationType.DecimalRequired} />

                <MyTextInput name="vehicle_no" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['vehicle_no']} label="Vehicle No" keyboardType={KeyboardType.Default}
                    autoCapitalize={CapitalizeType.Characters} maxLength={20} refs={formRefs} nextCtl="driver_name" />

                <MyTextInput name="driver_name" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['driver_name']} label="Driver Name" keyboardType={KeyboardType.Default}
                    autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} nextCtl="driver_mobile" />

                <MyTextInput name="driver_mobile" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['driver_mobile']} label="Driver Mobile" validationType={ValidationType.Mobile}
                    keyboardType={KeyboardType.Phone} maxLength={10} refs={formRefs} returnKeyType="done" />

                <MyDateTimePickerDialog mode="datetime" name="actual_completion_datetime" value={formValues} error={formErrors}
                    submitting={isSubmitting} initialValue={formValues['actual_completion_datetime']} label="Pickup Date Time"
                    refs={formRefs} returnKeyType="done" />

                <View style={styles.formHeader}>
                    <Text style={styles.heading}>{"\n"}Upload Gatepass</Text>
                </View>

                <MyImageSelector name="gate_pass" value={formValues} error={formErrors} submitting={isSubmitting}
                    label="Select Gatepass Picture" />

                <MyTextInput name="remarks" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['remarks']} label="Remarks" keyboardType={KeyboardType.Default}
                    maxLength={400} refs={formRefs} returnKeyType="done" autoCapitalize={CapitalizeType.Sentences}
                    multiline={true} numberOfLines={4} />

                <View style={styles.formFooter}>
                    <SubmitButton title="Save/Update" onPress={submitClickHandler} IsLoading={showButtonLoader} />
                    <CancelButton title="Cancel" onPress={cancelClickHandler} />
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    extraTopMargin: {
        marginTop: 15
    },
    formHeader: {
        width: '100%',
        borderBottomColor: Colors.gray,
        borderBottomWidth: 0,
        marginTop: 5,
        alignItems: 'center'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
    },
    formFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        borderTopColor: Colors.gray,
        borderTopWidth: 0,
        marginVertical: 10,
        paddingTop: 10
    }
})


export default CollectionRequestEntryScreen;
