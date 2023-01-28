import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultStackNavOptions from './DefaultStackNavOptions';
import DrawerContent from './DrawerContent';
import * as HeaderOptions from './HeaderOptions';

import DashboardScreen from '../screens/Marketing/DashboardScreen';
import VendorEntryScreen from '../screens/Marketing/VendorEntryScreen';
import VendorsScreen from '../screens/Marketing/VendorsScreen';
import DocumentsScreen from '../screens/Marketing/DocumentsScreen';
import CountersScreen from '../screens/Marketing/CountersScreen';
import CounterEntryScreen from '../screens/Marketing/CounterEntryScreen';
import LeadsScreen from '../screens/Marketing/LeadsScreen';
import LeadsDetailScreen from '../screens/Marketing/LeadsDetailScreen';
import LeadsEntryScreen from '../screens/Marketing/LeadsEntryScreen';
import LeadsFollowupScreen from '../screens/Marketing/LeadsFollowupScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import PendingFollowupsScreen from '../screens/Marketing/PendingFollowupsScreen';
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


const FollowupStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="PendingFollowups1" component={PendingFollowupsScreen} options={{ title: 'Pending Followups' }} />
            <Stack.Screen name="LeadsFollowups" component={LeadsFollowupScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Collection Request Detail')} />
        </Stack.Navigator>
    )
}



const VendorStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="Vendors1" component={VendorsScreen} options={(props) => HeaderOptions.RightAddIcon(props, 'Vendors')} />
            <Stack.Screen name="VendorEntry" component={VendorEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Vendor Entry')} />
            <Stack.Screen name="Documents" component={DocumentsScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Documents')} />
            <Stack.Screen name="Counters" component={CountersScreen} options={(props) => HeaderOptions.BackAndAddIcon(props, 'Counters')} />
            <Stack.Screen name="CounterEntry" component={CounterEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Counter Entry')} />
        </Stack.Navigator>
    )
}

const LeadsStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="Leads1" component={LeadsScreen} options={(props) => HeaderOptions.RightAddIcon(props, 'Leads')} />
            <Stack.Screen name="LeadsEntry" component={LeadsEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Leads Entry')} />
            <Stack.Screen name="LeadsDetail" component={LeadsDetailScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Leads Detail')} />
            <Stack.Screen name="LeadsFollowups" component={LeadsFollowupScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Leads Followups')} />
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

const MarketingDrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Dashboard"
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{ drawerItemStyle: { marginTop: 1, marginVertical: 0, paddingVertical: 0 } }} >

            <Drawer.Screen name="Dashboard" component={DashboardStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Dashboard')} />
            <Drawer.Screen name="Attendance" component={AttendanceStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Attendance')} />
            <Drawer.Screen name="Vendors" component={VendorStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Vendors')} />
            <Drawer.Screen name="Leads" component={LeadsStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Leads')} />
            <Drawer.Screen name="PendingFollowups" component={FollowupStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Pending Followups')} />
            <Drawer.Screen name="Profile" component={ProfileStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Profile')} />

        </Drawer.Navigator>
    )
}

export default MarketingDrawerNavigator;