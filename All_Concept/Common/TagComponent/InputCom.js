import React, { useState, useRef } from "react"
import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native"
import { screen, screen_height, screen_width } from "../DimensionCom"
import Colors from "../Colors"
import { IsEmailValid, IsPasswordValid } from "../common/Validator function/ValidatorFunction"
import { DeleteIcon, EmailIcon, FacebookButton, ViewIcon } from "./IconCom"
import Icon from 'react-native-vector-icons/FontAwesome';

export const EmailInput = (props) => {
    
    const [error, seterror] = useState(false)
    const _onChangeText = (value) => {
        props.value["Email"] = value;
        const isvalid = IsEmailValid(value)
        if (isvalid == false) {
            seterror(true)
        }
        else {
            seterror(false)

        }
    }
    return (
        <View style={{
            gap: 5,
            marginBottom:screen_height*0.01,
            ...props.ViewStyle
        }}>
            <Text style={{ color: Colors.black, }}>
                {props.label}
            </Text>
            <View style={{
                    flexDirection:'column', 
                    // marginBottom: screen_height * .0,
            }}>
                <EmailIcon size={screen.fontScale * 18}
                style={styles.Icon}
                    onPress={() => { set_secureTextEntry(!_secureTextEntry) }}
                />

                <TextInput
                    style={{
                        ...styles.TextInput,
                        ...props.style,
                        paddingLeft: 35,

                      }}
                    name="Email"
                    onChangeText={_onChangeText}
                    underlineColorAndroid={props.underlineColorAndroid}
                    placeholder={props.placeholder}
                    placeholderTextColor={props.placeholderTextColor}
                    autoCapitalize={props.autoCapitalize}  //"sentences"
                    returnKeyType="next" //"next"
                    keyboardType="email-address"
                    secureTextEntry={props.secureTextEntry}
                    onSubmitEditing={props.onSubmitEditing}
                    blurOnSubmit={props.blurOnSubmit}  //false
                    ref={props.refs}
                />
            </View>
                {error == false ? null : <Text style={{ color: Colors.darkRed, fontStyle: "italic", fontSize: screen.fontScale * 14 }}>Please enter correct email</Text>}
        </View>
    )


}

export const PasswordInput = (props) => {
    const [error, seterror] = useState(false)
    const [_secureTextEntry, set_secureTextEntry] = useState(true)
    const _onChangeText = (value) => {

        props.value["Password"] = value;
        if (value == "" || undefined || null) {
            seterror(true)
        }
        else {
            seterror(false)
        }
    }
    return (
        <View style={{
            gap: 5,
            marginBottom:screen_height*0.010,
            ...props.ViewStyle
        }}>
            <Text style={{ color: Colors.black, }}>
                {props.label}
            </Text>
            <View style={{
                sectionStyle: {
                    flexDirection: 'row',
                },
            }}>
                <ViewIcon size={screen.fontScale * 17}
                   style={styles.Icon}
                    onPress={() => { set_secureTextEntry(!_secureTextEntry) }}
                />

                <TextInput

                    style={{
                        ...styles.TextInput,
                        ...props.style,
                        paddingLeft: 35
                    }}
                    name="Password"
                    onChangeText={_onChangeText}
                    underlineColorAndroid={props.underlineColorAndroid}
                    placeholder={props.placeholder}
                    placeholderTextColor={props.placeholderTextColor}
                    autoCapitalize={props.autoCapitalize}  //"sentences"
                    returnKeyType={props.returnKeyType} //"next"
                    keyboardType={props.keyboardType}//"keyboardType="default""
                    secureTextEntry={_secureTextEntry}
                    onSubmitEditing={Keyboard.dismiss}
                    // secureTextEntry={true}
                    blurOnSubmit={props.blurOnSubmit}  //false
                    ref={props.refs}

                />
                {error == false ? null : <Text style={{ color: Colors.darkRed, fontStyle: "italic", fontSize: screen.fontScale * 14 }}>Please enter password</Text>}
            </View>
        </View>
    )
}
export const PasswordCreateInput = (props) => {
    const [error, seterror] = useState(false)
    const _onChangeText = (value) => {
        props.value["Password"] = value;
        const isvalid = IsPasswordValid(value)
        if (isvalid == false) {
            seterror(true)
        }
        else {
            seterror(false)
        }
    }
    return (
        <View style={{
            gap: 0,
            marginBottom: screen_height * .025,
            ...props.ViewStyle
        }}>
            <Text style={{ color: Colors.darkGreen, }}>
                {props.label}
            </Text>
            <TextInput
                style={{
                    ...styles.TextInput,
                    ...props.style,
                }}
                name="Password"
                onChangeText={_onChangeText}
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
            {error == false ? null : <Text style={{ color: Colors.darkRed, fontStyle: "italic", fontSize: screen.fontScale * 14 }}>Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</Text>}
        </View>
    )
}
export const NumberInput = (props) => {
    const _onChangeText = (value) => {
        props.value[props.name] = value;
    }
    return (
        <View style={props.ViewStyle}>
            <Text style={{ color: Colors.white, paddingBottom: screen_height * .01 }}>
                {props.label}
            </Text>
            <TextInput

                style={{
                    ...styles.TextInput,
                    ...props.style,
                }}
                name={props.name}
                onChangeText={_onChangeText}


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
        </View>
    )


}
export const NormalInput = (props) => {
    const _onChangeText = (value) => {
        props.value[props.name] = value;
    }
    return (
        <View style={props.ViewStyle}>
            <Text style={{ color: Colors.white, paddingBottom: screen_height * .01 }}>
                {props.label}
            </Text>
            <TextInput

                style={{
                    ...styles.TextInput,
                    ...props.style,
                }}
                name={props.name}
                onChangeText={_onChangeText}

                editable={props.editable}
                underlineColorAndroid={props.underlineColorAndroid}
                placeholder={props.placeholder}
                placeholderTextColor={props.placeholderTextColor}
                autoCapitalize={props.autoCapitalize}  //"sentences"
                returnKeyType={props.returnKeyType} //"next"
                keyboardType={props.keyboardType}//"email-address"
                secureTextEntry={props.secureTextEntry}
                onSubmitEditing={props.onSubmitEditing}
                blurOnSubmit={props.blurOnSubmit}  //false
                ref={props.ref}
            />
        </View>
    )


}


const styles = StyleSheet.create({
    TextInput: {
        paddingHorizontal: 15,
        paddingVertical: 1,
        backgroundColor: Colors.offWhite,
        color: Colors.black,
        borderRadius: 10,
        borderColor: Colors.black,
        borderWidth: 1,
        width: screen.width * .75,
        height: screen.height * .07,
        fontSize: screen.fontScale * 15,
        // marginTop: screen.height * 0.01,
    },
    Icon:{
        position: "absolute",
        zIndex: 2,
        left: 0,  
        paddingHorizontal:8,
        paddingVertical:20,
        color: Colors.accent,
        // backgroundColor:Colors.info
    }
})


export const sumbithanddler_ = () => {

    if (IsEmailValid(formValue?.Email) == false) {
        alert("Enter Email")
        return false
    }
    if (formValue?.Password == "" || undefined || null) {
        alert("Enter Password")
        return false
    }
    console.log(formValue)
    return true

}