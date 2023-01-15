import React from "react"
import { Keyboard, StyleSheet, TextInput } from "react-native"
import { screen } from "./DimensionCom"
import Colors from "./Colors"

export const EmailInput = (props) => {
    // console.log(props)
    return (
        <TextInput
            value={props.value}
            style={{
                width: screen.width * .65,
                height: screen.height * .05,
                fontSize: screen.fontScale * 12,
                ...styles.TextInput,
                ...props.style,

            }}
            onChangeText={props.onChangeText}
            // onChangeText={(props.onChangeText(a)) =>
            //   setUserName()
            // }
            underlineColorAndroid={props.underlineColorAndroid}
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor}
            autoCapitalize={props.autoCapitalize}  //"sentences"
            returnKeyType={props.returnKeyType} //"next"
            keyboardType="email-address"
            secureTextEntry={props.secureTextEntry}
            onSubmitEditing={props.onSubmitEditing}
            blurOnSubmit={props.blurOnSubmit}  //false
            ref={props.refs}
        />
    )


}

export const PasswordInput = (props) => {
    return (

        <TextInput
            value={props.value}
            style={{
                width: screen.width * .65,
                height: screen.height * .05,
                fontSize: screen.fontScale * 12,
                ...styles.TextInput,
                ...props.style,

            }}
            onChangeText={props.onChangeText}
            // onChangeText={(props.onChangeText(a)) =>
            //   setUserName()
            // }
            underlineColorAndroid={props.underlineColorAndroid}
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor}
            autoCapitalize={props.autoCapitalize}  //"sentences"
            returnKeyType={props.returnKeyType} //"next"
            keyboardType={props.keyboardType}//"keyboardType="default""
            // secureTextEntry = {props.secureTextEntry}
            onSubmitEditing={Keyboard.dismiss}
            secureTextEntry={true}
            blurOnSubmit={props.blurOnSubmit}  //false
            ref={props.refs}

        />
    )
}

export const NumberInput = (props) => {
    // console.log(props)
    return (
        <TextInput
            value={props.value}
            style={{
                width: screen.width * .65,
                height: screen.height * .05,
                fontSize: screen.fontScale * 12,
                ...styles.TextInput,
                ...props.style,

            }}
            onChangeText={props.onChangeText}
            // onChangeText={(props.onChangeText(a)) =>
            //   setUserName()
            // }
            maxLength={props.maxLength}
            minLength={props.minLength}
            underlineColorAndroid={props.underlineColorAndroid}
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor}
            autoCapitalize={props.autoCapitalize}  //"sentences"
            returnKeyType={props.returnKeyType} //"next"
            keyboardType="numeric"
            secureTextEntry={props.secureTextEntry}
            onSubmitEditing={props.onSubmitEditing}
            blurOnSubmit={props.blurOnSubmit}  //false
            ref={props.refs}
        />
    )


}

const styles = StyleSheet.create({
 


    TextInput: {
        paddingHorizontal: 15,
        paddingVertical: 1,
        backgroundColor: Colors.darkGray,
        color: Colors.white,
        borderRadius: 25,
        marginTop: screen.height * 0.01,
    },
})

export const NormalInput = (props) => {
    // console.log(props)
    return (
        <TextInput
        editable= {props.editable}
            value={props.value}
            style={{
                width: screen.width * .65,
                height: screen.height * .05,
                fontSize: screen.fontScale * 12,
                ...styles.TextInput,
                ...props.style,

            }}
            onChangeText={props.onChangeText}
            // onChangeText={(props.onChangeText(a)) =>
            //   setUserName()
            // }
            underlineColorAndroid={props.underlineColorAndroid}
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor}
            autoCapitalize={props.autoCapitalize}  //"sentences"
            returnKeyType={props.returnKeyType} //"next"
            keyboardType={props.keyboardType}//"email-address"
            secureTextEntry={props.secureTextEntry}
            onSubmitEditing={props.onSubmitEditing}
            blurOnSubmit={props.blurOnSubmit}  //false
            ref={props.refs}
        />
    )


}
