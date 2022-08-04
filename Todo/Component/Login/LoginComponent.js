import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import Task from '../../AfterLogin/Task/Task';
import { logout } from '../../Firebase/Auth/SingOut';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Input, Icon, } from '@rneui/themed';
import { Divider } from "@rneui/themed";
import { GoogleLogin, loginEmailAndPassword } from '../../Firebase/Auth/GoogleLogin';
import { firebase } from '@react-native-firebase/firestore';



export default function LoginComponent({ navigation }) {

    const [Email, setEmail] = useState(null)
    const [password, setpassword] = useState(null)
    const [user, setUser] = useState(null);


    // function onAuthStateChanged(user) {
    //     setUser(user);
    //     if (user != null) {
    //         navigation.navigate('Task')
    //     }
    //     if (user == null) {
    //         navigation.navigate('Login')
    //     }

    // }
    // useEffect(() => {

    //     auth().onAuthStateChanged(onAuthStateChanged)

    // }, []);


    const forgotPassword = (Email) => {

        if (Email != null) {
            firebase.auth().sendPasswordResetEmail(Email)
                .then(function (user) {
                    console.log(user);
                    alert('Please check your email...')

                }).catch(function (e) {
                    alert(e)
                })
        }
        else {
            alert("Please enter email")
        }
    }

    const Login = () => {
        if (Email == null || Email == "") {
            alert("Please enter email")

        }
        if (password == null || password == "") {
            alert("Please enter password")

        }
        if (Email != null && password != null && Email != "" && password != "") {
            loginEmailAndPassword(Email, password)
        }

    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <View style={styles.container}>
                {/* <Image source={require('./android/logo.jpg')} /> */}
                <Icon name="android" color="green" size={100} style={{ marginBottom: 20 }} />

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email"
                        placeholderTextColor="#003f5c"
                        onChangeText={(Email) => { setEmail(Email) }}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password."
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        onChangeText={(password) => { setpassword(password) }}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: "80%" }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                        <Text style={styles.forgot_button}>SingUp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { forgotPassword(Email) }}>
                        <Text style={styles.forgot_button}>Forgot Password?</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={styles.loginBtn} onPress={Login} >
                    <Text style={styles.Textstyle}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.SocialButton} onPress={() => GoogleLogin().then(() => console.log("loggin successful"))}>
                    <Text style={styles.Textstyle}>Google Sign-In</Text>

                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 20,
        height: "10%",
        width: "10%"
    },

    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "80%",
        height: 50,
        marginBottom: 20,
        //   alignItems: "center",
    },

    TextInput: {
        height: 50,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 15,
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
        backgroundColor: "orange",
    },
    Textstyle: {
        color: "white"
    }
});