import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import SubmitButton from '../components/form/SubmitButton';
import CancelButton from '../components/form/CancelButton';

import MyTextInput from '../components/form/MyTextInput';
import MyLabelAsInput from '../components/form/MyLabelAsInput';
import { ValidationType, KeyboardType, CapitalizeType, UserType } from '../constants/Enums';
import * as GlobalFunctions from '../common/GlobalFunctions';

import * as userAction from '../store/actions/user';

const ForgotPasswordScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userOtp, setUserOtp] = useState('');
    const [otpResendMessage, setOtpResendMessage] = useState('');
    const [canResend, setCanResend] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [timer, setTimer] = useState();
    const [otpValidated, setOtpValidated] = useState(false);
    const [userId, setUserId] = useState(0);

    //let timer = null;

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const dispatch = useDispatch();

    const sendOtpClickHandler = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            sendOtp();
        }, 50);
    }

    const resendClickHandler = () => {
        if (!canResend) {
            return;
        }
        sendOtp();
    }

    const changeMobileClickHandler = () => {
        formValues['mobile'] = '';
        formValues['otp'] = '';
        if (timer) {
            clearInterval(timer);
        }
        setUserOtp('');
        setCanResend(false);
        setOtpResendMessage('');
    }

    const sendOtp = async () => {
        let formValidated = true;

        if (formErrors['mobile'] != '') {
            formValidated = false;
        }

        if (!formValidated) {
            GlobalFunctions.showErrorToast(() => setIsSubmitting(false));
            return;
        }

        formErrors['otp'] = '';

        setShowButtonLoader(true);

        try {
            const response = await dispatch(userAction.sendForgotPwdOTP(formValues['mobile']));
            formValues['otp'] = '';
            setUserOtp(response.data.otp);
            setUserId(response.data.id);
            setIsSubmitting(false);
            setShowButtonLoader(false);
            setCanResend(false);
            startTimer();
        } catch (err) {
            setShowButtonLoader(false);
            setIsSubmitting(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }

    }

    const startTimer = () => {
        if (timer) {
            clearInterval(timer);
        }
        let remain = timeRemaining;
        let tmr = setInterval(() => {
            if (remain == 0) {
                clearInterval(timer);
                setCanResend(true);
                setOtpResendMessage('Resend');
            } else {
                remain--;
                setOtpResendMessage('You can resend after ' + remain + ' seconds');
            }
        }, 1000);

        setTimer(tmr);
    }

    const validateOtpClickHandler = async () => {
        setShowButtonLoader(true);

        if (userOtp == formValues['otp']) {
            if (timer) {
                clearInterval(timer);
            }
            setOtpValidated(true);
            setShowButtonLoader(false);
        }
        else {
            setShowButtonLoader(false);
            Alert.alert('Invalid OTP', 'Please enter a valid OTP that you would have received', [{ text: 'Okay' }]);
        }
    }

    const updateClickHandler = async () => {
        setIsSubmitting(true);
        setTimeout(() => {
            resetPassword();
        }, 50);
    }

    const resetPassword = async () => {
        let formValidated = true;

        if (formErrors['password'] != '') {
            formValidated = false;
        }
        if (formErrors['confirm_password'] != '') {
            formValidated = false;
        }

        if (!formValidated) {
            GlobalFunctions.showErrorToast(() => setIsSubmitting(false));
            return;
        }

        if (formValues['password'] != formValues['confirm_password']) {
            setIsSubmitting(false);
            Alert.alert('Passwords Mismatch', 'Both Passwords Must Be Same', [{ text: 'Okay' }]);
            return;
        }

        setShowButtonLoader(true);

        try {
            await dispatch(userAction.updatePassword(userId, formValues['password']));
            setIsSubmitting(false);
            setShowButtonLoader(false);
            Alert.alert('Password Changed', 'Password Changed Successfully', [{
                text: 'Okay',
                onPress: () => { props.navigation.navigate('Login'); }
            }]);
        } catch (err) {
            setIsSubmitting(false);
            setShowButtonLoader(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    const openLoginScreen = () => {
        if (timer) {
            clearInterval(timer);
        }
        props.navigation.navigate('Login');
    }

    return (
        <>
            <TouchableOpacity style={styles.closeIcon} onPress={openLoginScreen}>
                <AntDesign name="closecircle" size={24} />
            </TouchableOpacity>

            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={styles.container}>

                    <Image style={styles.logo} source={require('../assets/logo.png')} />

                    {
                        userOtp == '' && !otpValidated &&
                        <MyTextInput name="mobile" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['mobile']}
                            label="Enter Mobile" validationType={ValidationType.MobileRequired} keyboardType={KeyboardType.Number}
                            autoCapitalize={CapitalizeType.None} maxLength={10} refs={formRefs} returnKeyType="done" />
                    }
                    {
                        userOtp != '' && !otpValidated &&
                        <>
                            <MyLabelAsInput label="Mobile" initialValue={formValues['mobile']} />
                            <View style={{ alignItems: 'flex-end', width: '100%' }}>
                                <TouchableWithoutFeedback onPress={changeMobileClickHandler}>
                                    <Text style={styles.resendMessage}>Change Number</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </>
                    }

                    {
                        userOtp != '' && !otpValidated &&
                        <>
                            <MyTextInput name="otp" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['otp']}
                                label="Enter OTP" keyboardType={KeyboardType.Number} autoCapitalize={CapitalizeType.None} maxLength={6}
                                refs={formRefs} returnKeyType="done" />

                            <View style={{ alignItems: 'flex-end', width: '100%' }}>
                                <TouchableWithoutFeedback onPress={resendClickHandler}  >
                                    <Text style={styles.resendMessage}>{otpResendMessage}</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </>
                    }
                    {
                        otpValidated &&
                        <>
                            <MyTextInput name="password" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['password']}
                                label="Enter New Password" validationType={ValidationType.Required} keyboardType={KeyboardType.Default}
                                autoCapitalize={CapitalizeType.None} refs={formRefs} nextCtl="confirm_password" />

                            <MyTextInput name="confirm_password" value={formValues} error={formErrors} submitting={isSubmitting}
                                initialValue={formValues['confirm_password']} label="Re-Enter Password" validationType={ValidationType.Required}
                                keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.None} refs={formRefs} returnKeyType="done" />
                        </>
                    }

                    <View style={styles.formFooter}>
                        {
                            userOtp == '' && !otpValidated &&
                            <SubmitButton title="Send OTP" onPress={sendOtpClickHandler} IsLoading={showButtonLoader} />
                        }
                        {
                            userOtp != '' && !otpValidated &&
                            <SubmitButton title="Validate OTP" onPress={validateOtpClickHandler} IsLoading={showButtonLoader} />
                        }
                        {
                            otpValidated &&
                            <SubmitButton title="Update" onPress={updateClickHandler} IsLoading={showButtonLoader} />
                        }
                    </View>

                </View>
            </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeIcon: {
        width: 40,
        height: 40,
        marginTop: 10,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'center'
    },
    resendMessage: {
        color: Colors.darkGreen,
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
        paddingHorizontal: 5,
        paddingVertical: 2
    },
    logo: {
        width: 90,
        height: 90,
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


export default ForgotPasswordScreen;
