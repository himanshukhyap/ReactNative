import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import SubmitButton from '../components/form/SubmitButton';
import CancelButton from '../components/form/CancelButton';

import MyTextInput from '../components/form/MyTextInput';
import MyPickerInput from '../components/form/MyPickerInput';
import { ValidationType, KeyboardType, CapitalizeType, UserType } from '../constants/Enums';
import * as GlobalFunctions from '../common/GlobalFunctions';

import * as signupAction from '../store/actions/signup';
import * as statesAction from '../store/actions/states';

const SignupScreen = props => {

    const { params } = props.route;

    const [isLoading, setIsLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const statesData = useSelector(state => state.states.list);

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const dispatch = useDispatch();

    const fetchStates = async () => {
        try {
            setIsLoading(true);
            await dispatch(statesAction.getData());
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    useEffect(() => {
        fetchStates();
        formValues['mobile'] = params.mobile;
    }, [dispatch]);

    const cancelClickHandler = navData => {
        Alert.alert('Don\'t Want Signup ?', 'Are you sure you want to cancel signup ?',
            [
                {
                    text: 'Yes', onPress: () => { props.navigation.navigate('Login', { token: 'refresh' }); }
                },
                {
                    text: 'No', onPress: () => { }
                }
            ]
        );
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

        formValues['entry_by'] = 0;
		formValues['remarks_option'] = 4; //other
        try {
            const apiData = await dispatch(signupAction.postData(formValues));
            setIsSubmitting(false);
            setShowButtonLoader(false);
            Alert.alert('Success', apiData.message,
                [
                    {
                        text: 'Okay',
                        onPress: () => {
                            //props.navigation.navigate('Login', { token: 'refresh' });
                            props.navigation.navigate('PriceDiscovery', { 'id': apiData.data });
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
            <View style={styles.container}>

                <Image style={styles.logo} source={require('../assets/logo.png')} />


                <MyTextInput name="firm_name" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['firm_name']}
                    label="Firm Name" keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.Words} validationType={ValidationType.Required}
                    maxLength={100} refs={formRefs} returnKeyType="next" nextCtl="name" />

                <MyTextInput name="name" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['name']} label="Contact Person Name" validationType={ValidationType.Required}
                    keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} nextCtl="email" />

                <MyTextInput name="email" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['email']}
                    label="Email" keyboardType={KeyboardType.Email} autoCapitalize={CapitalizeType.None} returnKeyType="done"
                    maxLength={50} refs={formRefs} validationType={ValidationType.Email} />

                <MyPickerInput name="state_id" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['state_id']}
                    label="State" pickerData={statesData} pickerId="id" pickerValue="name" validationType={ValidationType.Required}
                    refs={formRefs} returnKeyType="done" />

                <MyTextInput name="city" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['city']}
                    label="City" keyboardType={KeyboardType.Default} returnKeyType="next" refs={formRefs} nextCtl="address"
                    autoCapitalize={CapitalizeType.Words} maxLength={100} validationType={ValidationType.Required} />

                <MyTextInput name="address" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['address']}
                    label="Address" keyboardType={KeyboardType.Default} returnKeyType="next" nextCtl="postal_code"
                    autoCapitalize={CapitalizeType.Words} maxLength={200} validationType={ValidationType.Required} refs={formRefs} />

                <MyTextInput name="postal_code" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['postal_code']} label="Postal Code" validationType={ValidationType.NumberRequired}
                    keyboardType={KeyboardType.Number} maxLength={6} refs={formRefs} nextCtl="oil_quantity" />

                <MyTextInput name="oil_quantity" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['oil_quantity']}
                    label="Oil Quantity (Kg)" keyboardType={KeyboardType.Number} autoCapitalize={CapitalizeType.None}
                    refs={formRefs} nextCtl="expected_rate" validationType={ValidationType.DecimalRequired} />

                <MyTextInput name="expected_rate" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['expected_rate']}
                    label="Expected Rate (Per Kg)" keyboardType={KeyboardType.Number} autoCapitalize={CapitalizeType.CharaNonecters}
                    refs={formRefs} returnKeyType="done" validationType={ValidationType.DecimalRequired} />


                <View style={styles.formFooter}>
                    <SubmitButton title="Submit" onPress={submitClickHandler} IsLoading={showButtonLoader} />
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
        alignItems: "center"
    },
    logo: {
        width: 90,
        height: 90,
        marginTop: 40,
        marginBottom: 20
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


export default SignupScreen;
