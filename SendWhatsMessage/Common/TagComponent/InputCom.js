import React from "react"
import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native"
import { screen, screen_height } from "../DimensionCom"
import Colors from "../Colors"


export const EmailInput = (props) => {
    // console.log(props)
    return (
        <TextInput
            value={props.value}
            style={{
             
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
        <View style={props.ViewStyle}>
        <Text style={{color:Colors.white,paddingBottom:screen_height*.01}}>
          {props.label}
        </Text>
        <TextInput
            value={props.value}
            style={{
                
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
        </View>
    )


}
export const NormalInput = (props) => {
    // console.log(props)
    return (
        <View style={props.ViewStyle}>
        <Text style={{color:Colors.white,paddingBottom:screen_height*.01}}>
          {props.label}
        </Text>
        <TextInput
            value={props.value}
            style={{
                
                ...styles.TextInput,
                ...props.style,

            }}
    
        editable= {props.editable}
           
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
        </View>
    )


}


const styles = StyleSheet.create({
 


    TextInput: {
        paddingHorizontal: 15,
        paddingVertical: 1,
        backgroundColor: Colors.black,
        color: Colors.white,
        borderRadius: 10,
        borderColor:Colors.white2,
        borderWidth:1,
        width: screen.width * .75,
        height: screen.height * .07,
        fontSize: screen.fontScale * 15,
        marginTop: screen.height * 0.01,
    },
})

