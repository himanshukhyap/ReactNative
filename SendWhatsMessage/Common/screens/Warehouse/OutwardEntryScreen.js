import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderRight from '../../navigation/HeaderRight';
import Colors from '../../constants/Colors';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';

import MyTextInput from '../../components/form/MyTextInput';
import MyPickerInput from '../../components/form/MyPickerInput';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';
import { ValidationType, KeyboardType, CapitalizeType } from '../../constants/Enums';
import Variables from '../../constants/Variables';
import * as GlobalFunctions from '../../common/GlobalFunctions';

import * as warehouseAction from '../../store/actions/warehouse';
import * as outwardAction from '../../store/actions/outwardtransaction';

const OutwardEntryScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const warehouses = useSelector(state => state.warehouses.list);

    const dispatch = useDispatch();

    useEffect(() => {

        props.navigation.setOptions({ title: 'Outward Transaction Entry' });

        const getData = async () => {
            try {
                setIsLoading(true);
                await dispatch(warehouseAction.getData(0));
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
            }
        }
        getData();
    }, [dispatch]);

    const cancelClickHandler = navData => {
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

        try {
            await dispatch(outwardAction.postData(formValues));
            setIsSubmitting(false);
            setShowButtonLoader(false);
            props.navigation.navigate('Outwards1', { token: 'refresh' });
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
            <View>

                <View style={styles.container}>

                    <MyPickerInput name="warehouse_id" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['warehouse_id']} label="Warehouse" pickerData={warehouses} pickerId="id" pickerValue="name"
                        validationType={ValidationType.Required} refs={formRefs} />

                    <MyPickerInput name="item_name" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['item_name']} label="Item Name" pickerData={Variables.ProductTypeOptions}
                        pickerId="name" pickerValue="name" validationType={ValidationType.Required} refs={formRefs} />

                    <MyTextInput name="company_name" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['company_name']} label="Company Name" validationType={ValidationType.Required}
                        keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.Words} maxLength={20} refs={formRefs}
                        nextCtl="address" />

                    <MyTextInput name="address" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['address']} label="Address" validationType={ValidationType.Required}
                        keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.Words} maxLength={20} refs={formRefs}
                        nextCtl="empty_weight" />

                    <MyTextInput name="empty_weight" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['empty_weight']} label="Empty Truck Weight" validationType={ValidationType.DecimalRequired}
                        keyboardType={KeyboardType.Number} autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs}
                        nextCtl="gross_weight" />

                    <MyTextInput name="gross_weight" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['gross_weight']} label="Gross Truck Weight" validationType={ValidationType.DecimalRequired}
                        keyboardType={KeyboardType.Number} autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs}
                        nextCtl="net_weight" />

                    <MyTextInput name="net_weight" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['net_weight']} label="Net Weight" validationType={ValidationType.DecimalRequired}
                        keyboardType={KeyboardType.Number} autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs}
                        nextCtl="vehicle_no" />

                    <MyTextInput name="vehicle_no" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['vehicle_no']} label="Vehicle No" validationType={ValidationType.Required}
                        keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.Characters} maxLength={20} refs={formRefs}
                        nextCtl="driver_name" />

                    <MyDateTimePickerDialog mode="datetime" name="vehicle_in_time" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['vehicle_in_time']} label="Vehicle In Time" refs={formRefs} returnKeyType="done" />

                    <MyDateTimePickerDialog mode="datetime" name="vehicle_out_time" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['vehicle_out_time']} label="Vehicle Out Time" refs={formRefs} returnKeyType="done" />

                    <MyTextInput name="driver_name" value={formValues} error={formErrors} submitting={isSubmitting}
                        validationType={ValidationType.Required} initialValue={formValues['driver_name']} label="Driver Name"
                        keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs}
                        nextCtl="driver_mobile" />

                    <MyTextInput name="driver_mobile" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['driver_mobile']} label="Driver Mobile" validationType={ValidationType.MobileRequired}
                        keyboardType={KeyboardType.Number} maxLength={10} refs={formRefs} nextCtl="remarks" />

                    <MyTextInput name="remarks" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['remarks']} label="Remarks" keyboardType={KeyboardType.Default}
                        maxLength={400} refs={formRefs} returnKeyType="done" autoCapitalize={CapitalizeType.Sentences}
                        multiline={true} numberOfLines={4} />

                    <View style={styles.formFooter}>
                        <SubmitButton title="Save/Update" onPress={submitClickHandler} IsLoading={showButtonLoader} />
                        <CancelButton title="Cancel" onPress={cancelClickHandler} />
                    </View>

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


export default OutwardEntryScreen;
