import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderRight from '../navigation/HeaderRight';
import Colors from '../constants/Colors';
import SubmitButton from '../components/form/SubmitButton';
import CancelButton from '../components/form/CancelButton';

import MyTextInput from '../components/form/MyTextInput';
import { ValidationType, KeyboardType, CapitalizeType, UserType } from '../constants/Enums';
import * as GlobalFunctions from '../common/GlobalFunctions';

import * as userAction from '../store/actions/user';

const ProfileScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loginUserId, setLoginUserId] = useState(0);
    const [loginUserType, setLoginUserType] = useState(0);
    const [loginPassword, setLoginPassword] = useState('');

    const userData = useSelector(state => state.users.record);

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);

                const userData = await AsyncStorage.getItem('userData');
                const objData = JSON.parse(userData);
                const { userId, userType, password } = objData;

                setLoginUserId(userId);
                setLoginUserType(userType);
                setLoginPassword(password);

                await dispatch(userAction.getData(userId));

                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
            }
        }
        getData();        
    }, [dispatch]);


    useEffect(() => {
        if (userData != null) {
            formValues['name'] = userData.name;
            formValues['mobile'] = userData.mobile;
            formValues['email'] = userData.email;
            formValues['password'] = 'PASSWORDNOTCHANGED';
        }
    }, [userData]);


    const cancelClickHandler = navData => {
        props.navigation.navigate('Dashboard', { token: 'refresh' });
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

        formValues['id'] = loginUserId;
        try {
            await dispatch(userAction.postData(formValues));
            setIsSubmitting(false);
            setShowButtonLoader(false);

            AsyncStorage.setItem('userData', JSON.stringify({
                userId: loginUserId,
                userType: loginUserType,
                name: formValues['name'],
                mobile: formValues['mobile'],
                password: formValues['password'] == 'PASSWORDNOTCHANGED' ? loginPassword : formValues['password']
            }));

            props.navigation.navigate('Dashboard', { token: 'refresh' });
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
                    <Text style={styles.heading}>View/Change Profile</Text>
                </View>

                <MyTextInput name="name" value={formValues} error={formErrors} submitting={isSubmitting}
                    initialValue={formValues['name']} label="Name" validationType={ValidationType.Required}
                    autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} nextCtl="mobile" />

                <MyTextInput name="mobile" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['mobile']}
                    label="Mobile" validationType={ValidationType.MobileRequired} keyboardType={KeyboardType.Phone}
                    autoCapitalize={CapitalizeType.None} maxLength={10} refs={formRefs} nextCtl="email" />

                <MyTextInput name="email" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['email']}
                    label="Email" keyboardType={KeyboardType.Email} autoCapitalize={CapitalizeType.None} returnKeyType="next"
                    maxLength={50} refs={formRefs} nextCtl="password" validationType={ValidationType.Email} />

                <MyTextInput name="password" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['password']}
                    label="Password" keyboardType={KeyboardType.Default} refs={formRefs} nextCtl="email"
                    maxLength={100} validationType={ValidationType.Required} returnKeyType="done" />

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


export default ProfileScreen;
