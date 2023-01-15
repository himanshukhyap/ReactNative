import { firebase } from '@react-native-firebase/firestore'
import { Button } from '@rneui/themed'
import React, { useState } from 'react'
import {
    View,
    TextInput,
    StyleSheet
} from 'react-native'
import { NumberInput } from '../constants/InputCom';
import Colors from '../constants/Colors';
import { UserIcon } from '../constants/IconCom';
import { MyButton } from '../constants/MyButton';
import auth from '@react-native-firebase/auth';

export default function OTPCom({ route, navigation }, props) {
    const user = firebase.auth().currentUser;
    const [code, setCode] = useState('');
    const { confirm } = route.params;

    async function confirmCode() {
        console.log(code)
        try {
            await confirm.confirm(code);
            // alert("Succesfull")
        } catch (error) {
            alert('Invalid code.');
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <View style={styles.container}>
                <UserIcon style={{ color: Colors.white1 }} size={100} />
                <NumberInput
                    style={{
                        height: 50,
                        paddingHorizontal: 20,

                        marginVertical: 20,
                        backgroundColor: Colors.black3,
                        color: Colors.white,
                        borderRadius: 25,
                        width: "80%"
                    }}
                    placeholder="Enter Code"
                    secureTextEntry={false}
                    keyboardType="numeric"
                    backgroundColor={Colors.white}
                    placeholderTextColor={Colors.white}
                    value={code}
                    onChangeText={text => setCode(text)}
                />
                <MyButton
                    style={{
                        width: "80%",
                        borderRadius: 25,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 10,
                        backgroundColor: Colors.gray,

                    }}
                    onPress={() => confirmCode()}
                    title="Confirm"
                />
                {/* <TouchableOpacity disabled={number == null} style={styles.Phonebutton} onPress={() => signInWithPhoneNumber('+91' + number)}>
                    <Text style={styles.Textstyle}>Sign In Phone Number</Text>

                </TouchableOpacity> */}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 50
    },

})