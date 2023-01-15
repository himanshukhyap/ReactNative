import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultStackNavOptions from './DefaultStackNavOptions';
import DrawerContent from './DrawerContent';
import * as HeaderOptions from './HeaderOptions';

import DashboardScreen from '../screens/Logistic/DashboardScreen';
import TransporterEntryScreen from '../screens/Logistic/TransporterEntryScreen';
import TransportersScreen from '../screens/Logistic/TransportersScreen';
import PDAEntryScreen from '../screens/Logistic/PDAEntryScreen';
import PDAsScreen from '../screens/Logistic/PDAsScreen';
import RoutesEntryScreen from '../screens/Logistic/RoutesEntryScreen';
import RoutesScreen from '../screens/Logistic/RoutesScreen';
import RouteVendorSelectionScreen from '../screens/Logistic/RouteVendorSelectionScreen';
import RouteVendorsScreen from '../screens/Logistic/RouteVendorsScreen';
import CollectionRequestsScreen from '../screens/Logistic/CollectionRequestsScreen';
import PendingChallansScreen from '../screens/Logistic/PendingChallansScreen';
import PendingChallanDetailScreen from '../screens/Logistic/PendingChallanDetailScreen';
import CollectionRequestEntryScreen from '../screens/Logistic/CollectionRequestEntryScreen';
import CollectionRequestDetailScreen from '../screens/Logistic/CollectionRequestDetailScreen';
import CollectionRequestBulkEntryScreen from '../screens/Logistic/CollectionRequestBulkEntryScreen';
import ScheduleScreen from '../screens/Logistic/ScheduleScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CollectionStatsReport from '../screens/Admin/CollectionStatsReport';
import CollectionQuantityReport from '../screens/Admin/CollectionQuantityReport';
import SeparatorScreen from '../screens/SeparatorScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DashboardStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={DefaultStackNavOptions}>
			<Stack.Screen name="Dashboard1" component={DashboardScreen} options={{ title: 'Dashboard' }} />
		</Stack.Navigator>
	)
}

const PendingChallansStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={DefaultStackNavOptions}>
			<Stack.Screen name="PendingChallans1" component={PendingChallansScreen} options={{ title: 'Pending Challans' }} />
			<Stack.Screen name="PendingChallanDetail" component={PendingChallanDetailScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Pending Challan Detail')} />
		</Stack.Navigator>
	)
}

const CollectionRequestStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={DefaultStackNavOptions}>
			<Stack.Screen name="CollectionRequests1" component={CollectionRequestsScreen} options={{ title: 'Collection Requests' }} />
			<Stack.Screen name="CollectionRequestEntry" component={CollectionRequestEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Collection Request Entry')} />
			<Stack.Screen name="CollectionRequestDetail" component={CollectionRequestDetailScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Collection Request Detail')} />
			<Stack.Screen name="Schedule" component={ScheduleScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Schedule')} />
			<Stack.Screen name="CollectionRequestBulkEntry" component={CollectionRequestBulkEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Collection Request Bulk Entry')} />
		</Stack.Navigator>
	)
}

const TransporterStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={DefaultStackNavOptions}>
			<Stack.Screen name="Transporters1" component={TransportersScreen} options={(props) => HeaderOptions.RightAddIcon(props, 'Transporters')} />
			<Stack.Screen name="TransporterEntry" component={TransporterEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Transporter Entry')} />
		</Stack.Navigator>
	)
}

const PDAStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={DefaultStackNavOptions}>
			<Stack.Screen name="PDAs1" component={PDAsScreen} options={(props) => HeaderOptions.RightAddIcon(props, 'PDAs')} />
			<Stack.Screen name="PDAEntry" component={PDAEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'PDA Entry')} />
		</Stack.Navigator>
	)
}

const RoutesStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={DefaultStackNavOptions}>
			<Stack.Screen name="Routes1" component={RoutesScreen} options={{ title: 'Routes Entry' }} />
			<Stack.Screen name="RoutesEntry" component={RoutesEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Routes')} />
			<Stack.Screen name="RouteVendorSelection" component={RouteVendorSelectionScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Add Vendors/Counters')} />
			<Stack.Screen name="RouteVendors" component={RouteVendorsScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Route Vendors/Counters')} />
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

const CollectionStatsStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={DefaultStackNavOptions}>
			<Stack.Screen name="CollectionStats1" component={CollectionStatsReport} options={{ title: 'Collection Statistics' }} />
		</Stack.Navigator>
	)
}

const CollectionQuantityStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={DefaultStackNavOptions} >
			<Stack.Screen name="CollectionQuantity1" component={CollectionQuantityReport} options={{ title: 'Collection Quantity Report' }} />
		</Stack.Navigator>
	)
}

const LogisticDrawerNavigator = () => {
	return (
		<Drawer.Navigator initialRouteName="Dashboard"
			drawerContent={(props) => <DrawerContent {...props} />}
			screenOptions={{ drawerItemStyle: { marginTop: 1, marginVertical: 0, paddingVertical: 0 } }} >

			<Drawer.Screen name="Dashboard" component={DashboardStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Dashboard')} />
			<Drawer.Screen name="CollectionRequests" component={CollectionRequestStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Collection Requests')} />
			<Drawer.Screen name="PendingChallans" component={PendingChallansStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Pending Challans')} />
			<Drawer.Screen name="Routes" component={RoutesStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Routes')} />
			<Drawer.Screen name="PDAs" component={PDAStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'PDAs')} />
			<Drawer.Screen name="Transporters" component={TransporterStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Transporters')} />
			<Drawer.Screen name="Profile" component={ProfileStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Profile')} />
			<Drawer.Screen name="Separator1" component={SeparatorScreen} options={HeaderOptions.DrawerOptions} />
			<Drawer.Screen name="CollectionStats" component={CollectionStatsStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Collection Statistics')} />
			<Drawer.Screen name="CollectionQuantity" component={CollectionQuantityStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Collection Quantity Report')} />
			<Drawer.Screen name="Separator2" component={SeparatorScreen} options={HeaderOptions.DrawerOptions} />

		</Drawer.Navigator>
	)
}

export default LogisticDrawerNavigator;