import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
//import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';

export const setupPushNotification = () => {

    Notifications.setNotificationHandler({
        handleNotification: async () => {
            return {
                shouldShowAlert: true,
            };
        },
    });

    const playNoificationSound = async () => {
        let sound = await (await Audio.Sound.createAsync(require('../assets/notification.wav'))).sound;
        await sound.playAsync();
        //await sound.unloadAsync();
    }

    const registerForPushNotificationsAsync = async () => {
        try {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                //alert('Failed to get push token for push notification!');
                return;
            }
            // const token = (await Notifications.getExpoPushTokenAsync({
			// 	experienceId: '@Arisesapp/Arises'
			// })).data;
            const token = (await Notifications.getDevicePushTokenAsync()).data;

            //console.log('---token---');
            //console.log(token);
            AsyncStorage.setItem('pushToken', token);

            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        registerForPushNotificationsAsync();

        // Permissions.getAsync(Permissions.NOTIFICATIONS)
        //     .then((statusObj) => {
        //         if (statusObj.status !== 'granted') {
        //             return Permissions.askAsync(Permissions.NOTIFICATIONS);
        //         }
        //         return statusObj;
        //     })
        //     .then((statusObj) => {
        //         if (statusObj.status !== 'granted') {
        //             throw new Error('Permission not granted!');
        //         }
        //     })
        //     .then(() => {
        //         return Notifications.getExpoPushTokenAsync();
        //     })
        //     .then(response => {
        //         const token = response.data;
        //         AsyncStorage.setItem('pushToken', token);

        //         if (Platform.OS === 'android') {
        //             Notifications.setNotificationChannelAsync('noti-message', {
        //                 name: 'Notification Message',
        //                 sound: true,
        //                 vibrate: true,
        //             });
        //         }

        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         return null;
        //     });
    }, []);

    useEffect(() => {

        //setNotificationSound();

        /*Notifications.setNotificationHandler((abc) => {
            console.log('abc');
        })*/

        const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                //console.log(response);
                console.log('bg');
                playNoificationSound();
            }
        );

        const foregroundSubscription = Notifications.addNotificationReceivedListener(
            (notification) => {
                //console.log(notification);
                playNoificationSound();
            }
        );

        return () => {
            backgroundSubscription.remove();
            foregroundSubscription.remove();
            //sound.unloadAsync();
        };

    }, []);

}