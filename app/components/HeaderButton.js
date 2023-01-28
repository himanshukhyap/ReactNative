import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';

const HeaderButton = props => {

    return (
        <TouchableOpacity style={{ ...styles.button, ...props.style }} onPress={props.onPress}>
            <View style={styles.buttonContainer}>
                <Text style={{ ...styles.buttonText, ...props.textStyle }}>{props.title}</Text>
            </View>
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
        height: 32,
        padding: 15,
        marginRight: 5,
        borderRadius: 5,
        justifyContent: "center",
        backgroundColor: Colors.black1,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        textAlignVertical: 'center'
    }
});


export default HeaderButton;