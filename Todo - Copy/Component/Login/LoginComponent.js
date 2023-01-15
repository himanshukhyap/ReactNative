import React, { useState, useEffect, createRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, Keyboard, KeyboardAvoidingView } from 'react-native';
import auth from '@react-native-firebase/auth';
import Task from '../../AfterLogin/Task/Task';
import { logout } from '../../Firebase/Auth/SingOut';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { GoogleLogin, loginEmailAndPassword } from '../../Firebase/Auth/GoogleLogin';
import { firebase } from '@react-native-firebase/firestore';
import { SocialIcon } from '@rneui/themed';
import Colors from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleIcon, UserIcon } from '../../constants/IconCom';
import { color } from 'react-native-reanimated';
import { EmailInput, InputCom, PasswordInput } from '../../constants/InputCom';
import { MyButton } from '../../constants/MyButton';
import { fonts } from '@rneui/base';
import { Dimensions } from 'react-native';
import { screen, window } from '../../constants/DimensionCom';
import { container } from '../../CSS/CssLibrary';
import { IsEmailValid, IsPasswordValid } from '../../constants/Validator/ValidatorFunction';
import Spinner from 'react-native-loading-spinner-overlay/lib';

export default function LoginComponent({ navigation }) {
    const [Loading, setLoading] = useState(false)
    const [Email, setEmail] = useState(null)
    const [password, setpassword] = useState(null)
    const emailInputRef = createRef();
    const passwordInputRef = createRef();
    const forgotPassword = async (Email) => {
        const isemailvalid = await IsEmailValid(Email)
        if (isemailvalid === true) {
            firebase.auth().sendPasswordResetEmail(Email)
                .then(function (user) {

                    alert('Please check your email...')

                }).catch(function (e) {
                    alert(e)
                })
        }

    }

    const handleSubmitButton = async () => {
        setLoading(true)
        const isemailvalid = await IsEmailValid(Email)
        const ispasswordvalid = isemailvalid ? await IsPasswordValid(password) : false

        if (isemailvalid === true & ispasswordvalid === true) {
            setLoading(false)
            // console.warn("df")
            await loginEmailAndPassword(Email, password)
            // await Login();
            // await   setIsRegistraionSuccess(true)
        }
        else {
            setLoading(false)
        }

    };

    return (

        <View style={{ ...container, backgroundColor: Colors.black }}>
            <Spinner visible={Loading} />
            <UserIcon style={{ color: Colors.white1 }} size={screen.scale * 45} />
            {/* <KeyboardAvoidingView enabled> */}

            <EmailInput
                // underlineColorAndroid
                // style={styles.TextInput}
                placeholder="Enter Email"
                placeholderTextColor={Colors.white}
                keyboardType="email-address"
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={(Email) => { setEmail(Email) }}
                onSubmitEditing={() =>
                    passwordInputRef.current &&
                    passwordInputRef.current.focus()
                }

            />
            <PasswordInput

                // style={styles.TextInput}
                placeholder="Enter Password"
                placeholderTextColor={Colors.white}
                // keyboardType="password"  

                secureTextEntry={true}
                returnKeyType="next"
                blurOnSubmit={false}
                onChangeText={(password) => { setpassword(password) }}
                onSubmitEditing={Keyboard.dismiss}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: screen.height * .05, }}>
                <MyButton
                    onPress={() => navigation.navigate('RegisterScreen')}
                    textStyle={{
                        color: Colors.white,
                    }}
                    style={{ width: "35%" }}
                    title="SingUp"

                />
                <MyButton
                    onPress={() => { forgotPassword(Email) }}
                    textStyle={{
                        color: Colors.white1,

                        // backgroundColor:Colors.black3
                    }}
                    title="Forgot Password?"
                    style={{ width: "35%" }}
                />

            </View>
            {/* </KeyboardAvoidingView> */}
            <MyButton
                onPress={handleSubmitButton}
                style={{
                    // width: "70%",
                    borderRadius: 25,
                    // height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: screen.height * 0.02,
                    backgroundColor: Colors.gray,

                }}
                textStyle={{
                    color: Colors.black
                    // backgroundColor:Colors.black3
                }}
                title="Login"

            />
            <MyButton
                style={{
                    // width: "70%",
                    borderRadius: 25,
                    // height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: screen.height * 0.01,
                    backgroundColor: Colors.gray,

                }}
                onPress={() => GoogleLogin().then(() => console.log("loggin successful"))}
                title={<GoogleIcon style={{ color: Colors.black1 }} size={screen.scale * 12} />}
            />

            <MyButton
                style={{
                    // width: "70%",
                    borderRadius: 25,
                    // height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: screen.height * 0.01,
                    backgroundColor: Colors.gray,

                }}
                onPress={() => navigation.navigate('PhoneScreen')}
                textStyle={{
                    color: Colors.black,

                }}
                title="Sign In Phone Number"

            />
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
        alignItems: "center",
        justifyContent: "center",
    },

    // image: {
    //     marginBottom: 30,
    //     height: "10%",
    //     width: "10%"
    // },


    // TextInput: {
    //     // height: 50,
    //     paddingHorizontal: 15,
    //     paddingVertical: 1,
    //     // width: "70%",
    //     backgroundColor: Colors.darkGray,
    //     color: Colors.white,
    //     borderRadius: 25,
    //     // fontSize: 10,
    //     marginTop:screen.height*0.01,
    // },

    forgot_button: {
        // height: 30,
        marginBottom: "1%",
        color: Colors.white1
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#FF1493",

    },
    SocialButton: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: Colors.gray,
    },

});