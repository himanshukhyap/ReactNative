import React from 'react';
import { Platform, Text, TouchableWithoutFeedback } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Colors';

const DefaultStackNavOptions = (navData) => {
    return {
        headerStyle: {
            backgroundColor: Colors.primary,
            height: Platform.OS === 'ios' ? 55 : 45
        },
        headerTitleStyle: {
            //backgroundColor: 'green',
            width: '100%'
        },
        headerTintColor: Colors.white,
        headerTitleContainerStyle: {
            left: Platform.OS === 'ios' ? -20 : -20,
            flex: 2.5,
        },
        headerTitleAlign: 'left',
        headerLeft: () => (
            <HeaderButtons>
                <Item IconComponent={Ionicons} iconName="ios-menu" color="white" iconSize={24}
                    onPress={() => { navData.navigation.toggleDrawer(); }} />
            </HeaderButtons>
        ),
        //headerRight: () => (<Text>sad</Text>)
    }
};

export default DefaultStackNavOptions;