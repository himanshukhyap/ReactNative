import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HeaderRight from './HeaderRight';

const addIconPressed = (route, navigation) => {

	let navRoute = "";
	let navParams = {};
	switch (route.name) {

		case "Sites":
		case "Sites1":
			navRoute = 'SiteEntry';
			break;

		case "Warehouses":
		case "Warehouses1":
			navRoute = 'WarehouseEntry';
			break;

		case "Users":
		case "Users1":
			navRoute = 'UserEntry';
			break;

		case "CollectionRequests":
		case "CollectionRequests1":
			navRoute = 'CollectionRequestEntry';
			break;

		case "Vendors":
		case "Vendors1":
			navRoute = 'VendorEntry';
			break;

		case "Counters":
		case "Counters1":
			navRoute = 'CounterEntry';
			navParams = route.params;
			break;

		case "Transporters":
		case "Transporters1":
			navRoute = 'TransporterEntry';
			navParams = route.params;
			break;

		case "PDAs":
		case "PDAs1":
			navRoute = 'PDAEntry';
			navParams = route.params;
			break;

		case "Routes":
		case "Routes1":
			navRoute = 'RoutesEntry';
			navParams = route.params;
			break;

		case "Inwards":
		case "Inwards1":
			navRoute = 'InwardEntry';
			navParams = route.params;
			break;

		case "Outwards":
		case "Outwards1":
			navRoute = 'OutwardEntry';
			navParams = route.params;
			break;

		case "Leads":
		case "Leads1":
			navRoute = 'LeadsEntry';
			navParams = route.params;
			break;

	}

	if (navRoute == "") return;

	navigation.navigate(navRoute, navParams);
}

const backIconPressed = (route, navigation) => {

	if (route.name == 'Counters' || route.name == 'Counters1' || route.name == 'VendorEntry') { /* for marketing manager login */
		navigation.navigate('Vendors1', { params: { token: 'refresh' } });
	}

	else if (route.name == 'CounterEntry') {
		navigation.navigate('Counters1', route.params);
	}

	else if (route.name == 'CompList') {
		navigation.navigate('Compliances1', route.params);
	}

	else if (route.name == 'CompDates' || route.name == 'CompDocs') {
		navigation.navigate('CompList1', route.params);
	}

	else {
		navigation.goBack();
	}
}

export const DrawerOptions = ({ route }, drawerLabelText = '') => {

	const routeName = getFocusedRouteNameFromRoute(route) ?? '';

	const SwipeDisabledRoutes = [
		'UserEntry',
		'WarehouseEntry',
		'WarehouseDocuments',
		'CollectionRequestEntry',
		'CollectionRequestDetail',
		'Schedule',
		'OutwardEntry',
		'OutwardDetail',
		'OutwardDocuments',
		'InwardDetail',
		'Documents',
		'Counters',
		'CounterEntry',
		'LeadsDetail',
		'VendorEntry',
		'VendorDetails',
		'SitesEntry',
		'PendingChallanDetail',
		'GatePassViewer',
		'RoutesEntry'
	];

	if (SwipeDisabledRoutes.includes(routeName)) {
		return ({ swipeEnabled: false, headerShown: false, drawerLabel: drawerLabelText })
	}
	else {
		return ({ headerShown: false, drawerLabel: drawerLabelText })
	}
}



export const LeftBackIcon = ({ route, navigation }, headerText = '') => ({
	headerLeft: () => (
		<HeaderRight
			isIcon={true}
			iconName="ios-arrow-back"
			onPress={() => backIconPressed(route, navigation)}
		/>
	),
	// headerTitleContainerStyle: {
	// 	width: '80%',
	// 	alignItems: 'flex-start'
	// },
	// headerTitleStyle: {
	// 	maxWidth: 250,
	// 	alignItems: 'flex-start'
	// }, 
	title: headerText
})

export const RightAddIcon = ({ route, navigation }, headerText = '') => ({
	headerRight: () => (
		<HeaderRight
			isIcon={true}
			iconName="md-add-circle"
			onPress={() => addIconPressed(route, navigation)}
		/>
	),
	title: headerText
})

/*export const RightFilterIcon = ({ route, navigation }) => ({
	headerRight: () => (
		<HeaderRight
			isIcon={true}
			iconComp={MaterialCommunityIcons}
			iconName="filter-outline"
			onPress={() => filterIconPressed(route, navigation)}
		/>
	)
})*/

export const BackAndAddIcon = ({ route, navigation }, headerText = '') => ({
	headerLeft: () => (
		<HeaderRight
			isIcon={true}
			iconName="ios-arrow-back"
			onPress={() => backIconPressed(route, navigation)}
		/>
	),
	headerRight: () => (
		<HeaderRight
			isIcon={true}
			iconName="md-add-circle"
			onPress={() => addIconPressed(route, navigation)}
		/>
	),
	title: headerText
})