import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Colors from '../../constants/Colors';
import globalstyles from '../../common/globalstyles';

const SubmitButton = props => {
    return (
        <View style={styles.container}>
            <Text style={globalstyles.h2}>{props.title}</Text>
            <View style={styles.addon_container}>
                <View style={{ ...styles.column, flex: 3 }}>
                    {
                        props.inputType != "readonly" &&
                        <TextInput style={styles.input} />
                    }
                    {
                        props.inputType == "readonly" &&
                        <Text style={styles.label}></Text>
                    }
                </View>
                <View style={{ ...styles.column, flex: 1 }}>
                    <TouchableHighlight style={{ ...styles.button, ...props.style }} onPress={props.onPress} underlayColor={Colors.gray} >
                        <Text style={{ ...styles.buttonText, ...props.textStyle }}>Browse</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 15,
        height: 55
    },
    addon_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 35,
    },
    column: {
        height: 35,
    },
    label: {
        height: 34,
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontFamily: 'Roboto',
        fontSize: 15.5,
        borderColor: Colors.gray,
        borderWidth: 1,
        textAlignVertical: 'center'
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontFamily: 'Roboto',
        fontSize: 15.5,
        borderColor: Colors.gray,
        borderWidth: 1
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.lightGray,
        height: 34,
        fontSize: 15,
        fontWeight: "bold",
        borderTopColor: Colors.gray,
        borderTopWidth: 1,
        borderRightColor: Colors.gray,
        borderRightWidth: 1,
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
    },
    buttonText: {
        color: Colors.black2,
        fontSize: 15,
        fontWeight: "bold"
    }
});


export default SubmitButton;