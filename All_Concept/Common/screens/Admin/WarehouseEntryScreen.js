import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderRight from '../../navigation/HeaderRight';
import Colors from '../../constants/Colors';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';

import MyTextInput from '../../components/form/MyTextInput';
import MyPickerInput from '../../components/form/MyPickerInput';
import MyRadioInput from '../../components/form/MyRadioInput';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';
import { ValidationType, KeyboardType, CapitalizeType, UserType } from '../../constants/Enums';

import * as userAction from '../../store/actions/user';
import * as statesAction from '../../store/actions/states';
import * as warehouseAction from '../../store/actions/warehouse';
import * as GlobalFunctions from '../../common/GlobalFunctions';

const WarehouseEntryScreen = props => {

    const { params } = props.route;
    const [isLoading, setIsLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [id, setId] = useState(0);

    const users = useSelector(state => state.users.list);
    const statesData = useSelector(state => state.states.list);
    const warehouseData = useSelector(state => state.warehouses.record);

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const dispatch = useDispatch();

    const fetchAllData = async (pkid) => {
        try {
            setIsLoading(true);
            await dispatch(userAction.getData(0, UserType.WarehouseManager));
            await dispatch(statesAction.getData());
            if (pkid > 0) {
                setId(pkid);
                await dispatch(warehouseAction.getData(pkid));
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    useEffect(() => {
        if (params && params.id) {
            fetchAllData(params.id);
        } else {
            fetchAllData(0);
        }
    }, [dispatch]);


    useEffect(() => {
        if (warehouseData != null) {
            formValues['name'] = warehouseData.name;
            formValues['manager_id'] = warehouseData.manager_id;
            formValues['state_id'] = warehouseData.state_id;
            formValues['city'] = warehouseData.city;
            formValues['address'] = warehouseData.address;
            formValues['postal_code'] = warehouseData.postal_code;
            formValues['rent'] = warehouseData.rent;
            formValues['gst_no'] = warehouseData.gst_no;
            formValues['area'] = warehouseData.area;
            formValues['elec_kno'] = warehouseData.elec_kno;
            formValues['start_date'] = warehouseData.start_date;
            formValues['expire_date'] = warehouseData.expire_date;
            formValues['is_active'] = warehouseData.is_active;
        }
    }, [warehouseData]);


    const cancelClickHandler = () => {
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

        formValues['id'] = id;
        try {
            await dispatch(warehouseAction.postData(formValues));
            setIsSubmitting(false);
            setShowButtonLoader(false);
            props.navigation.navigate('Warehouses1', { token: 'refresh' });
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
        <KeyboardAvoidingView
            style={{ flex: 1 }} keyboardVerticalOffset={70}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={styles.container}>
                    <View style={styles.formHeader}>
                        <Text style={styles.heading}>Add/Edit Warehouse</Text>
                    </View>

                    <MyTextInput name="name" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['name']} label="Name" validationType={ValidationType.Required}
                        autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} nextCtl="contact_person" />

                    <MyPickerInput name="manager_id" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['manager_id']}
                        label="Manager" pickerData={users} pickerId="id" pickerValue="name" validationType={ValidationType.Required}
                        refs={formRefs} />

                    <MyPickerInput name="state_id" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['state_id']}
                        label="State" pickerData={statesData} pickerId="id" pickerValue="name" validationType={ValidationType.Required}
                        refs={formRefs} />

                    <MyTextInput name="city" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['city']}
                        label="City" keyboardType={KeyboardType.Default} refs={formRefs} nextCtl="address"
                        autoCapitalize={CapitalizeType.Words} maxLength={100} />

                    <MyTextInput name="address" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['address']}
                        label="Address" keyboardType={KeyboardType.Default} nextCtl="postal_code"
                        autoCapitalize={CapitalizeType.Words} maxLength={200} refs={formRefs} />

                    <MyTextInput name="postal_code" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['postal_code']}
                        label="Postal Code" keyboardType={KeyboardType.Number} validationType={ValidationType.Number}
                        maxLength={6} refs={formRefs} nextCtl="rent" />

                    <MyTextInput name="rent" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['rent']}
                        label="Rent" keyboardType={KeyboardType.Number} validationType={ValidationType.Number} refs={formRefs} nextCtl="gst_no" />

                    <MyTextInput name="gst_no" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['gst_no']}
                        label="GST No" maxLength={15} minLength={15} refs={formRefs} nextCtl="area" keyboardType={KeyboardType.Default}
                        autoCapitalize={CapitalizeType.Characters} validationType={ValidationType.MinLength} />

                    <MyTextInput name="area" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['area']}
                        label="Area" keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.Words} refs={formRefs} nextCtl="elec_kno" />

                    <MyTextInput name="elec_kno" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['elec_kno']}
                        label="Electricity K. No." keyboardType={KeyboardType.Number} validationType={ValidationType.Number}
                        refs={formRefs} returnKeyType="done" />

                    <MyDateTimePickerDialog mode="date" name="start_date" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['start_date']}
                        label="Contract Start Date" refs={formRefs} returnKeyType="done" />

                    <MyDateTimePickerDialog mode="date" name="expire_date" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['expire_date']}
                        label="Contract Expire Date" refs={formRefs} returnKeyType="done" />

                    <MyRadioInput name="is_active" value={formValues} initialValue={formValues['is_active'] == "1" ? "1" : "0"}
                        label="Is Active ?" refs={formRefs} />


                    <View style={styles.formFooter}>
                        <SubmitButton title="Save/Update" onPress={submitClickHandler} IsLoading={showButtonLoader} />
                        <CancelButton title="Cancel" onPress={cancelClickHandler} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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


export default WarehouseEntryScreen;
