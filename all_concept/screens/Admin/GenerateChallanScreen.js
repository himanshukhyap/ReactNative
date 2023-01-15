import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import HeaderRight from '../../navigation/HeaderRight';
import Colors from '../../constants/Colors';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';

import MyTextInput from '../../components/form/MyTextInput';
import MyPickerInput from '../../components/form/MyPickerInput';
import MyRadioInput from '../../components/form/MyRadioInput';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';
import { ValidationType, KeyboardType, CapitalizeType, UserType } from '../../constants/Enums';

import Variables from '../../constants/Variables';
import * as GlobalFunctions from '../../common/GlobalFunctions';

import * as requestAction from '../../store/actions/collectionrequest';

const GenerateChallanScreen = props => {

    const { params } = props.route;
    const [isLoading, setIsLoading] = useState(true);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [id, setId] = useState(0);

    const userData = useSelector(state => state.users.record);

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        formValues['challan_date'] = moment().clone().format('DD-MMM-YYYY');
        setIsLoading(false);
    }, [props]);

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
                console.log(fe + ' - ' + formErrors[fe]);
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
            await dispatch(requestAction.generateInstantChallan(formValues));
            setIsSubmitting(false);
            setShowButtonLoader(false);
            Alert.alert(
                'Challan Generated',
                'Challan has been generated successfully & sent on email',
                [
                    { text: 'Ok', onPress: async () => { props.navigation.navigate('Dashboard', { token: 'refresh' }); } },
                ],
                {
                    cancelable: false
                }
            )
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
                <View style={styles.formHeader}>
                    <Text style={styles.heading}>Generate Challan Manually</Text>
                </View>

                <MyDateTimePickerDialog mode="date" name="challan_date" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['challan_date']} label="Challan Date" refs={formRefs} returnKeyType="done" />

                <MyTextInput name="contact_person" value={formValues} error={formErrors} submitting={isSubmitting} 
                    initialValue={formValues['contact_person']} label="Contact Person" validationType={ValidationType.Required} 
                    keyboardType={KeyboardType.Default} maxLength={100} refs={formRefs} nextCtl="firm_name" autoCapitalize={CapitalizeType.Words} />

                <MyTextInput name="firm_name" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['firm_name']}
                    label="Firm Name" validationType={ValidationType.Required} keyboardType={KeyboardType.Default}
                    maxLength={100} refs={formRefs} nextCtl="address" autoCapitalize={CapitalizeType.Words} />

                <MyTextInput name="firm_email" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['firm_email']} label="Firm Email" validationType={ValidationType.EmailRequired}
                    autoCapitalize={CapitalizeType.None} maxLength={50} refs={formRefs} nextCtl="address"
                    keyboardType={KeyboardType.Email} />

                <MyTextInput name="address" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['address']}
                    label="Address" keyboardType={KeyboardType.Default} returnKeyType="next" refs={formRefs} nextCtl="actual_drums_qty"
                    maxLength={200} validationType={ValidationType.Required} autoCapitalize={CapitalizeType.Words} />

                <MyTextInput name="city" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['city']}
                    label="City" keyboardType={KeyboardType.Default} returnKeyType="next" refs={formRefs} nextCtl="actual_drums_qty"
                    maxLength={100} validationType={ValidationType.Required} autoCapitalize={CapitalizeType.Words} />

                <MyTextInput name="actual_drums_qty" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['actual_drums_qty']} label="Filled Drums Quantity" keyboardType={KeyboardType.Number}
                    returnKeyType="next" refs={formRefs} nextCtl="actual_volume" validationType={ValidationType.NumberRequired} />

                <MyTextInput name="actual_volume" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['actual_volume']} label="Total Oil Weight (Kg)" keyboardType={KeyboardType.Number}
                    returnKeyType="next" refs={formRefs} nextCtl="empty_drums_qty" validationType={ValidationType.DecimalRequired} />

                <MyTextInput name="empty_drums_qty" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['empty_drums_qty']} label="Empty Drums Quantity" keyboardType={KeyboardType.Number}
                    refs={formRefs} returnKeyType="done" validationType={ValidationType.NumberRequired} />


                <View style={styles.formFooter}>
                    <SubmitButton title="Generate" onPress={submitClickHandler} IsLoading={showButtonLoader} />
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


export default GenerateChallanScreen;
