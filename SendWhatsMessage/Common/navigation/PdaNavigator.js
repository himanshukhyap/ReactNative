import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultStackNavOptions from './DefaultStackNavOptions';
import DrawerContent from './DrawerContent';
import * as HeaderOptions from './HeaderOptions';

import DashboardScreen from '../screens/PDA/DashboardScreen';
import CollectionRequestEntryScreen from '../screens/PDA/CollectionRequestEntryScreen';
import CollectionRequestDetailScreen from '../screens/PDA/CollectionRequestDetailScreen';
import CollectionRequestsScreen from '../screens/PDA/CollectionRequestsScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DashboardStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="Dashboard1" component={DashboardScreen} options={{ title: 'Dashboard' }} />
        </Stack.Navigator>
    )
}

const AttendanceStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="Attendance1" component={AttendanceScreen} options={{ title: 'Attendance' }} />
        </Stack.Navigator>
    )
}

const CollectionRequestStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="CollectionRequests1" component={CollectionRequestsScreen} options={{ title: 'Collection Requests' }} />
            <Stack.Screen name="CollectionRequestEntry" component={CollectionRequestEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Collection Request Entry')} />
            <Stack.Screen name="CollectionRequestDetail" component={CollectionRequestDetailScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Collection Request Detail')} />
        </Stack.Navigator>
    )
}

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="Profile1" component={ProfileScreen} options={{ title: 'Profile' }} />
        </Stack.Navigator>
    )
}

const PdaDrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Dashboard"
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{ drawerItemStyle: { marginTop: 1, marginVertical: 0, paddingVertical: 0 } }} >

            <Drawer.Screen name="Dashboard" component={DashboardStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Dashboard')} />
            <Drawer.Screen name="Attendance" component={AttendanceStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Attendance')} />
            <Drawer.Screen name="CollectionRequests" component={CollectionRequestStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Collection Requests')} />
            <Drawer.Screen name="Profile" component={ProfileStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Profile')} />

        </Drawer.Navigator>
    )
}

export default PdaDrawerNavigator;