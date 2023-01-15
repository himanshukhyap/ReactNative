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
import { ValidationType, KeyboardType, CapitalizeType, UserType } from '../../constants/Enums';
import * as GlobalFunctions from '../../common/GlobalFunctions';

import * as userAction from '../../store/actions/user';
import * as signupAction from '../../store/actions/signup';
import DetailsViewer from '../../components/DetailsViewer';

const LeadsDetailScreen = props => {

    const { params } = props.route;
    const [isLoading, setIsLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loginData = useSelector(state => state.login);
    const signupData = useSelector(state => state.signups.record);
    const managers = useSelector(state => state.users.list);

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const dispatch = useDispatch();

    const fetchAllData = async (pkid) => {
        try {
            setIsLoading(true);
            if (pkid > 0) {
                await dispatch(signupAction.getData(pkid, loginData.UserId));
                await dispatch(userAction.getData(0, UserType.LogisticManager));
                formValues['id'] = pkid;
                formValues['type'] = UserType.Vendor;
                formValues['password'] = '';
                formValues['gst_no'] = '';
                formValues['logistic_manger_id'] = '0';
                formValues['start_date'] = '';
                formValues['expire_date'] = '';
                formValues['oil_rate'] = '';
                formValues['min_liftup_qty'] = '';
                formValues['is_active'] = '1';
                formValues['entered_drums_qty'] = '';
                formValues['entered_volume'] = params.qty;
                formValues['empty_drums_qty'] = '';
                formValues['notes_for_team'] = '';
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    useEffect(() => {

        props.navigation.setOptions({ title: 'Convert To On Board' });

        if (params && params.id) {
            fetchAllData(params.id);
        } else {
            fetchAllData(0);
        }
    }, [dispatch]);


    const cancelClickHandler = navData => {
        props.navigation.goBack();
    }

    const submitClickHandler = async () => {
        Alert.alert('Registering As Vendor', 'Are you sure you want to register this lead as vendor & register an oil pickup request on his/her behalf ?',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        setIsSubmitting(true);
                        setTimeout(() => {
                            submitDetails();
                        }, 50);
                    }
                },
                {
                    text: 'No',
                    onPress: () => { }
                },
            ]);
    }

    const submitDetails = async () => {
        let formValidated = true;

        for (let fe in formErrors) {
            if (formErrors[fe] != '') {
                console.log(fe + ' missing');
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
            const msg = await dispatch(signupAction.convertToVendor(formValues));
            setIsSubmitting(false);
            setShowButtonLoader(false);
            Alert.alert('Success', msg,
                [
                    {
                        text: 'Okay',
                        onPress: () => {
                            props.navigation.navigate('Leads1', { token: 'refresh' });
                        }
                    }
                ]);
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

                <View style={styles.formHeader}>
                    <Text style={styles.heading}>Existing Details</Text>
                </View>

                <DetailsViewer
                    style={{ marginVertical: 5 }}
                    data={signupData}
                    captions="Vendor,Contact Person,Designation,Mobile,Email,Website,State,City,Address,Postal Code,Oil Quantity (Kg),Expected Rate (Per Kg),Remarks"
                    keys="firm_name,name,designation,mobile,email,website,state_name,city,address,postal_code,oil_quantity,expected_rate,remarks" />

                <View style={styles.container}>

                    <View style={styles.formHeader}>
                        <Text style={styles.heading}>Update Personal Information</Text>
                    </View>

                    <MyTextInput name="password" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['password']}
                        label="Password" keyboardType={KeyboardType.Default} nextCtl="gst_no" refs={formRefs}
                        maxLength={100} validationType={ValidationType.Required} />

                    <MyTextInput name="gst_no" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['gst_no']}
                        label="GST No" keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.Characters}
                        maxLength={15} minLength={15} refs={formRefs} returnKeyType="done" validationType={ValidationType.MinLength} />

                    <MyPickerInput name="logistic_manger_id" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['logistic_manger_id']} label="Logistic Manager" pickerData={managers} pickerId="id" pickerValue="name"
                        validationType={ValidationType.Required} refs={formRefs} />

                    <MyDateTimePickerDialog mode="date" name="start_date" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['start_date']}
                        label="Contract Start Date" refs={formRefs} returnKeyType="done" />

                    <MyDateTimePickerDialog mode="date" name="expire_date" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['expire_date']}
                        label="Contract Expire Date" refs={formRefs} returnKeyType="done" />

                    <MyTextInput name="oil_rate" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['oil_rate']} label="Deal Oil Rate" validationType={ValidationType.DecimalRequired}
                        keyboardType={KeyboardType.Number} autoCapitalize={CapitalizeType.Words} maxLength={10} refs={formRefs}
                        nextCtl="min_liftup_qty" />

                    <MyTextInput name="min_liftup_qty" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['min_liftup_qty']} label="Min Order Qty For Liftup" validationType={ValidationType.Decimal}
                        keyboardType={KeyboardType.Number} autoCapitalize={CapitalizeType.Words} maxLength={10} refs={formRefs}
                        returnKeyType="done" />

                    <MyRadioInput name="is_active" value={formValues} initialValue={formValues['is_active'] == "1" ? "1" : "0"}
                        label="Is Active ?" refs={formRefs} />


                    <View style={styles.formHeader}>
                        <Text style={styles.heading}>Collection Request Information</Text>
                    </View>

                    <MyTextInput name="entered_drums_qty" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['entered_drums_qty']} label="Filled Drums Quantity"
                        keyboardType={KeyboardType.Number} validationType={ValidationType.DecimalRequired}
                        autoCapitalize={CapitalizeType.Words} maxLength={10} refs={formRefs} nextCtl="entered_volume" />

                    <MyTextInput name="entered_volume" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['entered_volume']} label="Total Quantity (kg)" validationType={ValidationType.DecimalRequired}
                        keyboardType={KeyboardType.Number} autoCapitalize={CapitalizeType.Words} maxLength={10} refs={formRefs}
                        nextCtl="empty_drums_qty" />

                    <MyTextInput name="empty_drums_qty" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['empty_drums_qty']}
                        label="Empty Drums Required" validationType={ValidationType.Number} keyboardType={KeyboardType.Number}
                        autoCapitalize={CapitalizeType.None} maxLength={10} refs={formRefs} nextCtl="notes_for_team" />

                    <MyTextInput name="notes_for_team" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['notes_for_team']}
                        label="Additional Info" keyboardType={KeyboardType.Default} multiline={true} numberOfLines={4}
                        autoCapitalize={CapitalizeType.Sentences} maxLength={200} refs={formRefs} returnKeyType="done" />

                    <View style={styles.formFooter}>
                        <SubmitButton title="Create Vendor & Request" onPress={submitClickHandler} IsLoading={showButtonLoader} style={{ width: 190 }} />
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
        marginTop: 15,
        marginBottom: 10,
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
    },
    yes_no_buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 10,
        paddingTop: 10
    }
})


export default LeadsDetailScreen;
