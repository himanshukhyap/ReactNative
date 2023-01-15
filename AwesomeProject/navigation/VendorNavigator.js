import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultStackNavOptions from './DefaultStackNavOptions';
import DrawerContent from './DrawerContent';
import * as HeaderOptions from './HeaderOptions';

import DashboardScreen from '../screens/Vendor/DashboardScreen';
import CollectionRequestEntryScreen from '../screens/Vendor/CollectionRequestEntryScreen';
import CollectionRequestDetailScreen from '../screens/Vendor/CollectionRequestDetailScreen';
import CollectionRequestsScreen from '../screens/Vendor/CollectionRequestsScreen';
import CountersCollectionStats from '../screens/Vendor/CountersCollectionStats';
import AgreementScreen from '../screens/Vendor/AgreementScreen';
import DocumentsScreen from '../screens/Vendor/DocumentsScreen';

import SiteEntryScreen from '../screens/Vendor/SiteEntryScreen';
import SitesScreen from '../screens/Vendor/SitesScreen';

import CompDashboardScreen from '../screens/Vendor/CompDashboardScreen';
import CompListScreen from '../screens/Vendor/CompListScreen';
import CompDatesScreen from '../screens/Vendor/CompDatesScreen';
import CompDocsScreen from '../screens/Vendor/CompDocsScreen';
import CompInfoScreen from '../screens/Vendor/CompInfoScreen';

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
			<Stack.Screen name="CollectionRequests1" component={CollectionRequestsScreen} options={(props) => HeaderOptions.RightAddIcon(props, 'Collection Requests')} />
			<Stack.Screen name="CollectionRequestEntry" component={CollectionRequestEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Collection Request Entry')} />
			<Stack.Screen name="CollectionRequestDetail" component={CollectionRequestDetailScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Collection Request Detail')} />
		</Stack.Navigator>
	)
}

const CounterCollectionStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={DefaultStackNavOptions}>
			<Stack.Screen name="CountersCollection1" component={CountersCollectionStats} options={{ title: 'Counters Collection' }} />
		</Stack.Navigator>
	)
}

const SitesStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={DefaultStackNavOptions}>
			<Stack.Screen name="Sites1" component={SitesScreen} options={(props) => HeaderOptions.RightAddIcon(props, 'Sites')} />
			<Stack.Screen name="SiteEntry" component={SiteEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Site Entry')} />
		</Stack.Navigator>
	)
}

const CompStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={DefaultStackNavOptions}>
			<Stack.Screen name="Compliances1" component={CompDashboardScreen} options={{ title: 'Compliances' }} />
			<Stack.Screen name="CompList" component={CompListScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Compliances List')} />
			<Stack.Screen name="CompDates" component={CompDatesScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Compliances Dates')} />
			<Stack.Screen name="CompDocs" component={CompDocsScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Compliances Documents')} />
			<Stack.Screen name="CompInfo" component={CompInfoScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Compliances Information')} />
		</Stack.Navigator>
	)
}

const AgreementStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={DefaultStackNavOptions}>
			<Stack.Screen name="Agreement1" component={AgreementScreen} options={{ title: 'Agreement' }} />
		</Stack.Navigator>
	)
}

const DocumentStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={DefaultStackNavOptions}>
			<Stack.Screen name="Documents1" component={DocumentsScreen} options={{ title: 'Documents' }} />
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

const VendorDrawerNavigator = () => {
	return (
		<Drawer.Navigator initialRouteName="Dashboard"
			drawerContent={(props) => <DrawerContent {...props} />}
			screenOptions={{ drawerItemStyle: { marginTop: 1, marginVertical: 0, paddingVertical: 0 } }} >

			<Drawer.Screen name="Dashboard" component={DashboardStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Dashboard')} />
			<Drawer.Screen name="CollectionRequests" component={CollectionRequestStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Collection Requests')} />
			<Drawer.Screen name="CountersCollection" component={CounterCollectionStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Counters Collection')} />
			<Drawer.Screen name="Sites" component={SitesStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Sites')} />
			<Drawer.Screen name="Compliances" component={CompStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Compliances')} />
			<Drawer.Screen name="Agreement" component={AgreementStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Agreement')} />
			<Drawer.Screen name="Documents" component={DocumentStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Documents')} />
			<Drawer.Screen name="Profile" component={ProfileStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Profile')} />

		</Drawer.Navigator>
	)
}

export default VendorDrawerNavigator;