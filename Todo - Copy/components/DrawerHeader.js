import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import Constants from 'expo-constants';


import Colors from '../constants/Colors';
import LogoutMenu from '../components/LogoutMenu';

const DrawerHeader = props => {

    const onLogoutClicked = () => {
        props.navigation.closeDrawer();
        Alert.alert(
            'Logging out ?',
            'Do you really want to logout ?',
            [
                {
                    text: 'No', onPress: () => {
                        
                    }
                },
                {
                    text: 'Yes', onPress: () => {
                        AsyncStorage.clear();
                        props.navigation.navigate('Login')
                    }
                },
            ],
            { 
                cancelable: false 
            }
        )
    }

    return (
        <View style={styles.headerMain}>
            <View style={styles.headerSpace}>
                <Text style={styles.headerText}>
                    Welcome !!
                </Text>
                <Text style={styles.headerText}>
                    Administrator
                </Text>
            </View>
            <DrawerItems {...props} />
            <LogoutMenu LogoutClickHandler={onLogoutClicked} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerMain: {
        marginTop: Constants.statusBarHeight
    },
    headerSpace: {
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        height: 100,
        padding: 10
    },
    headerText: {
        color: Colors.black,
        fontSize: 30
    }
});


export default DrawerHeader;