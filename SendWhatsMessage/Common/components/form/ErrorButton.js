import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Colors from '../../constants/Colors';

const ErrorButton = props => {

    return (
        <TouchableOpacity disabled={props.IsLoading} style={{ ...styles.button, ...props.buttonStyle }} onPress={props.onPress}>
            {props.IsLoading ?
                <View style={styles.container}>
                    <ActivityIndicator size="small" color={Colors.white} />
                </View> :
                <View style={styles.container}>
                    <Text style={{ ...styles.buttonText, ...props.textStyle }}>{props.title}</Text>
                </View>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    button: {
        width: 110,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.red,
        borderRadius: 3,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 15,
        fontWeight: "bold"
    }
});


export default ErrorButton;