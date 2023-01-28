import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Alert, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ActionIcons, ActionIconColors, RequestStatus } from '../../constants/Enums';

import MyAccordion from '../../components/MyAccordion';
import CardData from '../../components/CardData';

import Colors from '../../constants/Colors';
import GS from '../../common/GlobalStyles';

import * as collectionRequestAction from '../../store/actions/collectionrequest';


const CollectionRequestsScreen = props => {

	const [isLoading, setIsLoading] = useState(false);

	const [routeNames, setRouteNames] = useState([]);
	const [colReqs, setColReqs] = useState([]);

	const loginData = useSelector(state => state.login);

	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				const reqApiData = await dispatch(collectionRequestAction.getData(0, 0, 0, loginData.UserId));
				setColReqs(reqApiData);

				const routeSortedData = reqApiData.sort((a, b) => parseInt(a['route_seq_no']) - parseInt(b['route_seq_no']));

				let arrRouteNames = [];
				for (let i = 0; i < routeSortedData.length; i++) {
					const element = routeSortedData[i];
					if (!arrRouteNames.includes(element['route_name'])) {
						arrRouteNames.push(element['route_name']);
					}
				}

				setRouteNames(arrRouteNames);

				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
			}
		}
		getData();
	}, [dispatch, props]);


	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	if (colReqs.length === 0) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Image source={require('../../assets/no_record_found.png')} />
			</View>
		);
	}

	const editClickHandler = id => {
		let data = colReqs.filter((x) => x.id == id);
		if (data[0]['request_status'] == RequestStatus.InProcess) {
			props.navigation.navigate('CollectionRequestEntry', { 'id': data[0].id });
		}
		else {
			Alert.alert('Can\'t be edited', 'Only InProcess requests can be edited');
		}
	}

	const viewClickHandler = id => {
		let data = colReqs.filter((x) => x.id == id);
		if (data.length > 0) {
			props.navigation.navigate('CollectionRequestDetail', { 'id': data[0].id });
		}
	}

	const renderColRequestCards = () => {
		let arrAccordion = [];

		for (let r = 0; r < routeNames.length; r++) {
			const routeName = routeNames[r];
			const routeRequests = colReqs.filter(x => x.route_name == routeName);
			const sortedRequests = routeRequests.sort((a, b) => parseInt(a['vendor_seq_no']) - parseInt(b['vendor_seq_no']));

			let arrReqView = [];

			for (let colIndex = 0; colIndex < sortedRequests.length; colIndex++) {
				const item = sortedRequests[colIndex];

				arrReqView.push(
					<CardData
						key={item.id}
						index={colIndex}
						data={item}
						titles={['vendor', 'pickup request date', 'address', 'Status']}
						fields={['firm_name', 'request_date', 'address', 'request_status_name']}
						hasActions={true}
						actions={[editClickHandler, viewClickHandler]}
						actionIcons={[ActionIcons.Upload, ActionIcons.View]}
						actionIconColors={[ActionIconColors.Upload, ActionIconColors.View]}
					/>
				);
			}

			if (arrReqView.length > 0) {
				arrAccordion.push(
					<MyAccordion title={routeName} key={routeName} containerStyle={{ ...GS.mt5 }}>
						{arrReqView}
					</MyAccordion>
				)
			}

		}

		return arrAccordion;
	}

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={{ ...GS.ph5, ...GS.pv5 }}>
					{
						colReqs.length > 0 &&
						renderColRequestCards()
					}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1
	},
	list: {
		marginHorizontal: 2,
		borderLeftColor: Colors.offWhite,
		borderLeftWidth: 1,
		borderRightColor: Colors.offWhite,
		borderRightWidth: 1
	}
})

export default CollectionRequestsScreen;
