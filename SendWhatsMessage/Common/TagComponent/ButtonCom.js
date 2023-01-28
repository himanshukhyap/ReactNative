import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';


import Colors from '../Colors';
import { screen } from '../DimensionCom';


export const ButtonCom = (props) => {

    return (
        <View>
        <TouchableOpacity disabled={props.IsLoading || props.disabled} style={{ ...styles.button, ...props.style }} onPress={props.onPress}>
            {props.IsLoading ?
                <View style={styles.container}>
                    <ActivityIndicator size="small" color={Colors.white} />
                </View> :
                <View style={styles.buttonContainer}>
                    <Text style={{ ...styles.buttonText, ...props.ButtonTextStyle }}>{props.ButtonText}</Text>
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
        borderRadius: 5,
        backgroundColor: Colors.darkGreen,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    buttonText: {
        // color: Colors.white,
        fontSize: screen.fontScale * 15,
        textAlignVertical: 'center',
        color: Colors.white
    }
});
