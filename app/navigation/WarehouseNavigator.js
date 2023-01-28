import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultStackNavOptions from './DefaultStackNavOptions';
import DrawerContent from './DrawerContent';
import * as HeaderOptions from './HeaderOptions';

import DashboardScreen from '../screens/Warehouse/DashboardScreen';
import OutwardEntryScreen from '../screens/Warehouse/OutwardEntryScreen';
import OutwardsScreen from '../screens/Warehouse/OutwardsScreen';
import OutwardDetailScreen from '../screens/Warehouse/OutwardDetailScreen';
import OutwardDocumentsScreen from '../screens/Warehouse/OutwardDocumentsScreen';
import InwardsScreen from '../screens/Warehouse/InwardsScreen';
import InwardDetailScreen from '../screens/Warehouse/InwardDetailScreen';
import CollectionRequestsScreen from '../screens/Warehouse/CollectionRequestsScreen';
import CollectionRequestEntryScreen from '../screens/Warehouse/CollectionRequestEntryScreen';
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

const CollectionRequestStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="PendingInward1" component={CollectionRequestsScreen} options={{ title: 'Pending Inwards' }} />
            <Stack.Screen name="CollectionRequestEntry" component={CollectionRequestEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Collection Request Entry')} />
        </Stack.Navigator>
    )
}

const InwardStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="Inwards1" component={InwardsScreen} options={{ title: 'Inwards' }} />
            <Stack.Screen name="InwardDetail" component={InwardDetailScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Inward Detail')} />
        </Stack.Navigator>
    )
}

const OutwardsStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="Outwards1" component={OutwardsScreen} options={(props) => HeaderOptions.RightAddIcon(props, 'Outwards')} />
            <Stack.Screen name="OutwardEntry" component={OutwardEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Outward Entry')} />
            <Stack.Screen name="OutwardDetail" component={OutwardDetailScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Outward Details')} />
            <Stack.Screen name="OutwardDocuments" component={OutwardDocumentsScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Outward Documents')} />
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

const WarehouseDrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Dashboard"
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{ drawerItemStyle: { marginTop: 1, marginVertical: 0, paddingVertical: 0 } }} >

            <Drawer.Screen name="Dashboard" component={DashboardStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Dashboard')} />
            <Drawer.Screen name="PendingInward" component={CollectionRequestStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Pending Inwards')} />
            <Drawer.Screen name="Inwards" component={InwardStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Inwards')} />
            <Drawer.Screen name="Outwards" component={OutwardsStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Outwards')} />
            <Drawer.Screen name="Profile" component={ProfileStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Profile')} />

        </Drawer.Navigator>
    )
}

export default WarehouseDrawerNavigator;