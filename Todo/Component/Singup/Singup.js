import { firebase } from '@react-native-firebase/firestore'
import { Button } from '@rneui/themed'
import React, { useState } from 'react'
import {
    View,
    TextInput,
    StyleSheet
} from 'react-native'
import { createuser } from '../../Firebase/Auth/createuser'

export default function Signup({ navigation }) {
    const user = firebase.auth().currentUser;
    const [Email, setEmail] = useState(null)
    const [password, setpassword] = useState(null)
    if (user != null) {
        navigation.navigate('Task')
        setEmail(null); setpassword(null)
    }


    const CreateUserfunction = () => {
        if (Email == null || Email == "") {
            alert("Please enter email")

        }
        if (password == null || password == "") {
            alert("Please enter password")

        }
        if (Email != null && password != null && Email != "" && password != "") {
            createuser(Email, password)
        }

    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Email'
                autoCapitalize="none"
                placeholderTextColor='white'
                onChangeText={val => setEmail(val)}
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                secureTextEntry={true}
                autoCapitalize="none"
                placeholderTextColor='white'
                onChangeText={(val) => setpassword(val)}
            />

            <Button
                title="Create Account"
                loading={false}
                loadingProps={{ size: 'small', color: 'white' }}
                buttonStyle={{
                    backgroundColor: 'rgba(111, 202, 186, 1)',
                    borderRadius: 5,
                }}
                titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                containerStyle={{
                    marginHorizontal: 50,
                    height: 50,
                    width: "80%",
                    marginVertical: 10,
                }}
                onPress={CreateUserfunction}

            />
        </View>
    )

}

const styles = StyleSheet.create({
    input: {
        width: "80%",
        height: 60,
        backgroundColor: 'black',
        margin: 10,
        padding: 15,
        color: 'white',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {

    }
})