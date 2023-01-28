import React, { useState, useEffect, useReducer, useCallback, useRef } from 'react';
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
import { ValidationType, KeyboardType, CapitalizeType, UserType } from '../../constants/Enums';
import * as GlobalFunctions from '../../common/GlobalFunctions';

import * as userAction from '../../store/actions/user';
import * as statesAction from '../../store/actions/states';

const VendorEntryScreen = props => {

    const { params } = props.route;
    const [isLoading, setIsLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [id, setId] = useState(0);

    const statesData = useSelector(state => state.states.list);
    const userData = useSelector(state => state.users.record);
    const managers = useSelector(state => state.users.list);

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const dispatch = useDispatch();

    const fetchAllData = async (pkid) => {
        try {
            setIsLoading(true);
            await dispatch(statesAction.getData());
            await dispatch(userAction.getData(0, UserType.LogisticManager));
            if (pkid > 0) {
                setId(pkid);
                await dispatch(userAction.getData(pkid));
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    useEffect(() => {

        props.navigation.setOptions({ title: 'Vendor Entry' });

        if (params && params.id) {
            fetchAllData(params.id);
        } else {
            fetchAllData(0);
        }
    }, [dispatch]);


    useEffect(() => {
        if (userData != null) {
            formValues['name'] = userData.name;
            formValues['mobile'] = userData.mobile;
            formValues['store_code'] = userData.store_code;
            formValues['password'] = 'PASSWORDNOTCHANGED';
            formValues['email'] = userData.email;
            formValues['firm_name'] = userData.firm_name;
            formValues['state_id'] = userData.state_id;
            formValues['city'] = userData.city;
            formValues['address'] = userData.address;
            formValues['postal_code'] = userData.postal_code;
            formValues['gst_no'] = userData.gst_no;
            formValues['start_date'] = userData.start_date;
            formValues['expire_date'] = userData.expire_date;
            formValues['oil_rate'] = userData.oil_rate;
            formValues['min_liftup_qty'] = userData.min_liftup_qty;
            formValues['is_active'] = userData.is_active;
            formValues['logistic_manger_id'] = userData.logistic_manger_id;
        }
    }, [userData]);


    const cancelClickHandler = navData => {
        //props.navigation.navigate('Vendors1', { token: 'refresh' });
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

        formValues['id'] = id;
        formValues['type'] = UserType.Vendor;
        try {
            await dispatch(userAction.postData(formValues));
            setIsSubmitting(false);
            setShowButtonLoader(false);
            props.navigation.navigate('Vendors1', { token: 'refresh' });
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
                    <Text style={styles.heading}>Add/Edit Vendor</Text>
                </View>

                <MyTextInput name="firm_name" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['firm_name']}
                    label="Firm Name" keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.Words}
                    maxLength={100} refs={formRefs} returnKeyType="next" nextCtl="name" validationType={ValidationType.Required} />

                <MyTextInput name="name" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['name']} label="Contact Person Name" validationType={ValidationType.Required}
                    autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} nextCtl="mobile" />

                <MyTextInput name="mobile" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['mobile']}
                    label="Mobile" validationType={ValidationType.MobileRequired} keyboardType={KeyboardType.Number}
                    autoCapitalize={CapitalizeType.None} maxLength={10} refs={formRefs} nextCtl="store_code" />

                <MyTextInput name="store_code" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['store_code']}
                    label="Store Code" validationType={ValidationType.Required} keyboardType={KeyboardType.Number}
                    autoCapitalize={CapitalizeType.None} maxLength={10} refs={formRefs} nextCtl="password" />

                <MyTextInput name="password" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['password']}
                    label="Password" keyboardType={KeyboardType.Default} returnKeyType="next" refs={formRefs} nextCtl="email"
                    maxLength={100} validationType={ValidationType.Required} />

                <MyTextInput name="email" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['email']}
                    label="Email" keyboardType={KeyboardType.Email} autoCapitalize={CapitalizeType.None} returnKeyType="done"
                    maxLength={50} refs={formRefs} nextCtl="gst_no" validationType={ValidationType.Email} />

                <MyPickerInput name="state_id" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['state_id']}
                    label="State" pickerData={statesData} pickerId="id" pickerValue="name" validationType={ValidationType.Required}
                    refs={formRefs} />

                <MyTextInput name="city" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['city']}
                    label="City" keyboardType={KeyboardType.Default} returnKeyType="next" refs={formRefs} nextCtl="address"
                    autoCapitalize={CapitalizeType.Words} maxLength={100} validationType={ValidationType.Required} />

                <MyTextInput name="address" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['address']}
                    label="Address" keyboardType={KeyboardType.Default} returnKeyType="next" nextCtl="postal_code"
                    autoCapitalize={CapitalizeType.Words} maxLength={200} validationType={ValidationType.Required} refs={formRefs} />

                <MyTextInput name="postal_code" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['postal_code']} keyboardType={KeyboardType.Number} label="Postal Code" 
                    validationType={ValidationType.NumberRequired} maxLength={6} refs={formRefs} returnKeyType="done" />

                <MyTextInput name="gst_no" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['gst_no']}
                    label="GST No" keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.Characters}
                    maxLength={15} minLength={15} refs={formRefs} returnKeyType="done" validationType={ValidationType.MinLength} />

                <MyPickerInput name="logistic_manger_id" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['logistic_manger_id']} label="Logistic Manager" pickerData={managers} pickerId="id" pickerValue="name"
                    validationType={ValidationType.Required} refs={formRefs} />

                <MyDateTimePickerDialog mode="date" name="start_date" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['start_date']} label="Contract Start Date" refs={formRefs} returnKeyType="done" />

                <MyDateTimePickerDialog mode="date" name="expire_date" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['expire_date']} label="Contract Expire Date" refs={formRefs} returnKeyType="done" />

                <MyTextInput name="oil_rate" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['oil_rate']} label="Deal Oil Rate" validationType={ValidationType.Decimal}
                    keyboardType={KeyboardType.Number} autoCapitalize={CapitalizeType.Words} maxLength={10} refs={formRefs}
                    nextCtl="min_liftup_qty" />

                <MyTextInput name="min_liftup_qty" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['min_liftup_qty']} label="Min Order Qty For Liftup" validationType={ValidationType.Decimal}
                    keyboardType={KeyboardType.Number} autoCapitalize={CapitalizeType.Words} maxLength={10} refs={formRefs}
                    returnKeyType="done" />

                <MyRadioInput name="is_active" value={formValues} initialValue={formValues['is_active'] == "1" ? "1" : "0"}
                    label="Is Active ?" refs={formRefs} />

                <View style={styles.formFooter}>
                    <SubmitButton title="Save" onPress={submitClickHandler} IsLoading={showButtonLoader} />
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


export default VendorEntryScreen;
