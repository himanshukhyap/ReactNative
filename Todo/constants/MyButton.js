import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


import Colors from './Colors';
import { screen } from './DimensionCom';

export const MyButton = (props) => {

    return (
        <TouchableOpacity style={{ ...styles.button, ...props.style }} onPress={props.onPress} disabled={props.disabled} >
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
       
            width:screen.width*.65,
            height:screen.height*.05,
            
        justifyContent: "center",
        borderRadius: 3,
        // backgroundColor: Colors.darkGreen,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    buttonText: {
        // color: Colors.white,
        fontSize:screen.fontScale*12,
        textAlignVertical: 'center'
    }
});
