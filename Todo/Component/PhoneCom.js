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
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { IsPhoneValid } from '../constants/Validator/ValidatorFunction';

export default function PhoneCom({ navigation }, props) {
    // const user = firebase.auth().currentUser;
    const [number, setnumber] = useState(null)
    const [confirm, setConfirm] = useState(null);
    const [Loading, setLoading] = useState(false);

    if (confirm != null) {
        // setLoading(false)
        navigation.navigate("OTPScreen", { confirm: confirm })
    }

    const handleSubmitButton = async () => {
        setLoading(true)
        const _IsPhoneValid = await IsPhoneValid(number)

        if (_IsPhoneValid === true) {
            
            // console.warn("df")
            try {
                const confirmation = await auth().signInWithPhoneNumber('+91' +number);
                setConfirm(confirmation);

            }
            catch (error) {
                alert('Invalid number.');
                setLoading(false)
            }
        }
        else {
            setLoading(false)
        }

    };
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
                    placeholder="Enter Phone Number"
                    secureTextEntry={false}
                    keyboardType="numeric"
                    backgroundColor={Colors.white}
                    placeholderTextColor={Colors.white}
                    onChangeText={(number) => { setnumber(number) }}
                    maxLength={10}
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
                    onPress={() => {
                        handleSubmitButton( number)
                    }}
                    title="Submit"
                    // disabled={number == null}

                />
                <Spinner visible={Loading} textContent={'Loading...'}
                //   textStyle={styles.spinnerTextStyle}
                />

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