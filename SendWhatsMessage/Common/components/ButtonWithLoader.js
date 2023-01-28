import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Colors from '../Colors';



const ButtonWithLoader = props => {

    return (
        <TouchableOpacity disabled={props.IsLoading} style={{ ...styles.button, ...props.ButtonStyle }} onPress={props.ButtonClickHandler}>
            {props.IsLoading ?
                <View style={styles.container}>
                    <ActivityIndicator size="small" color={Colors={}.white} />
                </View> :
                <View style={styles.buttonWithIcon}>
                    <Text style={{ ...styles.buttonText, ...props.ButtonTextStyle }}>{props.ButtonText}</Text>
                    <Ionicons name={props.IconName} size={24} color={Colors.white} />
                </View>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: "center"
    },
    button: {
        width: 120,
        height: 40,
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: Colors.blue,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        flexDirection: 'row'
    },
    buttonWithIcon: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: "bold"
    }
});


export default ButtonWithLoader;