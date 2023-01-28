import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SignupScreen from '../screens/SignupScreen';
import PriceDiscoveryScreen from '../screens/PriceDiscoveryScreen';
import OtpScreen from '../screens/OtpScreen';
import MainAdminNavigator from './AdminNavigator';
import MainVendorNavigator from './VendorNavigator';
import MainLogisticNavigator from './LogisticNavigator';
import MainPdaNavigator from './PdaNavigator';
import MainWarehouseNavigator from './WarehouseNavigator';
 import MainMarketingNavigator from './MarketingNavigator';

import { UserType } from '../constants/Enums';

const Stack = createStackNavigator();

const AppNavigator = props => {

    let initRootName = "";

    if (props.userType == UserType.Admin) {
        initRootName = "Admin";
    }
    else if (props.userType == UserType.Vendor) {
        initRootName = "Vendor";
    }
    else if (props.userType == UserType.LogisticManager) {
        initRootName = "Logistic";
    }
    else if (props.userType == UserType.PDA) {
        initRootName = "Pda";
    }
    else if (props.userType == UserType.WarehouseManager) {
        initRootName = "Warehouse";
    }
    else if (props.userType == UserType.Marketing) {
        initRootName = "Marketing";
    }
    else {
        initRootName = "Login";
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initRootName}>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PriceDiscovery" component={PriceDiscoveryScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Otp" component={OtpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Admin" component={MainAdminNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Vendor" component={MainVendorNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Logistic" component={MainLogisticNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Pda" component={MainPdaNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Warehouse" component={MainWarehouseNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Marketing" component={MainMarketingNavigator} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;