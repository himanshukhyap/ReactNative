import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';


import Colors from '../Colors';
import { screen, screen_width } from '../DimensionCom';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AnyIcon, DeleteIcon } from './IconCom';

export const ButtonCom = (props) => {

    return (
        <View>
        <TouchableOpacity disabled={props.IsLoading || props.disabled} style={{ ...styles.button ,...props.style }} onPress={props.onPress}>
            {props.IsLoading ?
                <View style={styles.container}>
                    <ActivityIndicator size="small" color={Colors.white} />
                </View> :
                <View style={styles.buttonContainer}>
                    <AnyIcon name={props.name} style={{color:Colors.white,width:screen_width*.08}} size={screen.fontScale*22}/>
                    <Text style={{ ...styles.buttonText, ...props.ButtonTextStyle }}>{props.ButtonText}</Text>
                    {/* <Icon.Button style={{ borderRadius: 50, ...props.style}} name={props.name} backgroundColor={props.color} onPress={props.onPress}>{props.ButtonText}</Icon.Button> */}
                    {/* <Icon size={props.Iconsize} style={props.Iconstyle} /> */}
                </View>
            }
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: 'center'
    },
    button: {

        width: screen.width * .75,
        height: screen.height * .07,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: Colors.black1,
    },
    buttonContainer: {
        // flex: 1,
        width:"100%",
        flexDirection:'row',
        justifyContent: "center",
        alignItems: 'center',
        // backgroundColor:Colors.warning
    },
    buttonText: {
        // color: Colors.white,
        fontSize: screen.fontScale * 15,
        textAlignVertical: 'center',
        color: Colors.white
    }
});
