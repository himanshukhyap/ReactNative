import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, StatusBar, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as loginActions from '../store/actions/login';

const SplashScreen = props => {

    const dispatch = useDispatch();

    useEffect(() => {

        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');

            if (!userData) {
                setTimeout(() => {
                    props.navigation.navigate('Login');
                }, 2000);                
            }
            else {
                const objData = JSON.parse(userData);
                const { username, password } = objData;                
                let action = loginActions.login(username, password);
                try {
                    await dispatch(action);
                    props.navigation.navigate('Dashboard');
                } catch (err) {
                    props.navigation.navigate('Login');
                }
            }
        }

        tryLogin();

    }, [dispatch]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.white} translucent={true} barStyle='light-content' />
            <Image style={styles.logo} source={require('../assets/logo.png')}></Image>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 225,
        height: 225
    }
});

export default SplashScreen;
