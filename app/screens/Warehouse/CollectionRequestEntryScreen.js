import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderRight from '../../navigation/HeaderRight';
import Colors from '../../constants/Colors';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';

import MyTextInput from '../../components/form/MyTextInput';
import MyPickerInput from '../../components/form/MyPickerInput';
import MyRadioInput from '../../components/form/MyRadioInput';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';
import MyLabelAsInput from '../../components/form/MyLabelAsInput';
import { ValidationType, KeyboardType, CapitalizeType, TransactionType } from '../../constants/Enums';
import * as GlobalFunctions from '../../common/GlobalFunctions';

import * as collectionrequestAction from '../../store/actions/collectionrequest';
import * as transactionAction from '../../store/actions/inwardtransaction';

const CollectionRequestEntryScreen = props => {

    const { params } = props.route;
    const [isLoading, setIsLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [id, setId] = useState(0);
    const [firmName, setFirmName] = useState('');
    const [address, setAddress] = useState('');
    const [warehouseId, setWarehouseId] = useState(0);
    const [warehouseName, setWarehouseName] = useState('');

    const collectionrequestData = useSelector(state => state.collectionrequests.record);

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const dispatch = useDispatch();

    const fetchAllData = async (pkid) => {
        try {
            setIsLoading(true);
            if (pkid > 0) {
                setId(pkid);
                await dispatch(collectionrequestAction.getData(pkid));
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    useEffect(() => {

        props.navigation.setOptions({title: 'Accept Inward Entry'});

        if (params && params.id) {
            fetchAllData(params.id);
        } else {
            fetchAllData(0);
        }
    }, [dispatch]);


    useEffect(() => {
        if (collectionrequestData != null) {
            formValues['total_drums'] = collectionrequestData.actual_drums_qty;
            formValues['total_volume'] = collectionrequestData.actual_volume;
            formValues['sample_taken'] = collectionrequestData.sample_taken;
            formValues['vehicle_no'] = collectionrequestData.vehicle_no;
            formValues['driver_name'] = collectionrequestData.driver_name;
            formValues['driver_mobile'] = collectionrequestData.driver_mobile;
            setFirmName(collectionrequestData.firm_name);
            setAddress(collectionrequestData.address);
            setWarehouseId(collectionrequestData.warehouse_id);
            setWarehouseName(collectionrequestData.warehouse_name);
        }
    }, [collectionrequestData]);


    const cancelClickHandler = navData => {
        //props.navigation.navigate('PendingInward', { token: 'refresh' });
        props.navigation.goBack();
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

        formValues['collection_request_id'] = id;
        formValues['warehouse_id'] = warehouseId;
        try {
            await dispatch(transactionAction.postData(formValues));
            setIsSubmitting(false);
            setShowButtonLoader(false);
            props.navigation.navigate('PendingInward1', { token: 'refresh' });
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
                {/* <View style={styles.formHeader}>
                    <Text style={styles.heading}>Accept Inward Entry</Text>
                </View> */}

                <MyLabelAsInput initialValue={firmName} label="Vendor" />

                <MyLabelAsInput initialValue={address} label="Address" />

                <MyLabelAsInput initialValue={warehouseName} label="Warehouse" />

                <MyTextInput name="total_drums" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['total_drums']} label="Total Drums"
                    keyboardType={KeyboardType.Number} validationType={ValidationType.DecimalRequired}
                    autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} nextCtl="total_volume" />

                <MyTextInput name="total_volume" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['total_volume']} label="Total Quantity (kg)" validationType={ValidationType.DecimalRequired}
                    keyboardType={KeyboardType.Number} autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs}
                    nextCtl="driver_name" />

                <MyRadioInput name="sample_taken" value={formValues} initialValue={formValues['sample_taken'] == "1" ? "1" : "0"}
                    label="Sample Taken ?" refs={formRefs} />

                <MyTextInput name="vehicle_no" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['vehicle_no']} label="Vehicle No" validationType={ValidationType.Required}
                    keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.Characters} maxLength={20} refs={formRefs}
                    returnKeyType="done" />

                <MyDateTimePickerDialog mode="datetime" name="vehicle_in_time" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['vehicle_in_time']} label="Vehicle In Time" refs={formRefs} returnKeyType="done" />

                <MyDateTimePickerDialog mode="datetime" name="vehicle_out_time" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['vehicle_out_time']} label="Vehicle Out Time" refs={formRefs} returnKeyType="done" />

                <MyTextInput name="driver_name" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['driver_name']} label="Driver Name" keyboardType={KeyboardType.Default}
                    autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} nextCtl="driver_mobile" />

                <MyTextInput name="driver_mobile" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['driver_mobile']} label="Driver Mobile" validationType={ValidationType.MobileRequired}
                    keyboardType={KeyboardType.Phone} maxLength={10} refs={formRefs} nextCtl="remarks" />

                <MyTextInput name="remarks" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['remarks']}
                    label="Remarks" keyboardType={KeyboardType.Default} multiline={true} numberOfLines={4}
                    autoCapitalize={CapitalizeType.Sentences} maxLength={500} refs={formRefs} returnKeyType="done" />

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
