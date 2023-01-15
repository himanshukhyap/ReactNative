import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const LogoutMenu = props => {
    return (
        <TouchableHighlight underlayColor="#ebebeb" activeOpacity={0.6} style={styles.logout} onPress={props.LogoutClickHandler}>
            <View style={styles.logoutContainer}>
                <Text style={styles.logoutText}>
                    Logout
                </Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    logout: {
        width: '100%',
        height: 45
    },
    logoutContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    logoutText: {
        fontWeight: 'bold',
        // fontFamily: 'Roboto_bold',r
        paddingLeft: 17
    }
});

export default LogoutMenu;