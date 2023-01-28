import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Alert, BackHandler, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import HeaderRight from '../../navigation/HeaderRight';

import MyAccordion from '../../components/MyAccordion';
import CardData from '../../components/CardData';
import MyCheckBox from '../../components/form/MyCheckBox';
import MyPickerInput from '../../components/form/MyPickerInput';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';

import Colors from '../../constants/Colors';
import { ActionIcons, ActionIconColors, RequestStatus } from '../../constants/Enums';
import * as GlobalFunctions from '../../common/GlobalFunctions';
import GS from '../../common/GlobalStyles';

import * as collectionRequestAction from '../../store/actions/collectionrequest';
import * as statesAction from '../../store/actions/states';
import Variables from '../../constants/Variables';

const CollectionRequestsScreen = props => {

	const [isLoading, setIsLoading] = useState(false);

	const statesData = useSelector(state => state.states.list);
	const loggedInUser = useSelector(state => state.login);

	const [colReqs, setColReqs] = useState([]);

	const [showFilters, setShowFilters] = useState(false);
	const [multipleAction, setMultipleAction] = useState(false);

	const [checkedIds, setCheckedIds] = useState([]);
	const [routeNames, setRouteNames] = useState([]);

	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [formRefs, setFormRefs] = useState({});

	const dispatch = useDispatch();

	useEffect(() => {
		const backAction = () => {
			if (multipleAction) {
				setMultipleAction(false);
				setCheckedIds([]);
				return true;
			}
		};

		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

		return () => backHandler.remove();
	}, [multipleAction]);

	useEffect(() => {
		props.navigation.setOptions({
			title: 'Collection Requests', headerRight: () => (
				<View style={{ flexDirection: 'row' }}>
					{
						multipleAction &&
						<HeaderRight
							isIcon={true}
							iconComp={MaterialIcons}
							iconName="assignment-ind"
							onPress={editMultiple}
						/>
					}
					<HeaderRight
						isIcon={true}
						iconComp={MaterialCommunityIcons}
						iconName="filter-outline"
						onPress={() => setShowFilters(!showFilters)}
					/>
				</View>
			)
		});
	}, [showFilters, multipleAction]);


	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				const today = moment().format('DD-MMM-YYYY');
				await dispatch(statesAction.getData());
				const reqApiData = await dispatch(collectionRequestAction.getData(0, 0, loggedInUser.UserId, 0, 0, 0, today, today));
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

				formValues['state_id'] = "0";
				formValues['request_status'] = "0";
				formValues['date_from'] = today;
				formValues['date_upto'] = today;

				setMultipleAction(false);
				setCheckedIds([]);

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

	const editClickHandler = id => {
		let data = colReqs.filter((x) => x.id == id);
		if (data[0]['request_status'] == RequestStatus.Pending || data[0]['request_status'] == RequestStatus.InProcess) {
			props.navigation.navigate('CollectionRequestEntry', { 'id': data[0].id });
		}
		else {
			Alert.alert('Can\'t be edited', 'Only Pending or InProcess requests can be edited');
		}
	}

	const editMultiple = () => {
		if (checkedIds.length > 0) {
			props.navigation.navigate('CollectionRequestBulkEntry', { 'ids': checkedIds.join(",") });
		} else {
			Alert.alert('No Request Selected', 'Please select one or more pending entries');
		}
	}

	const viewClickHandler = id => {
		let data = colReqs.filter((x) => x.id == id);
		if (data.length > 0) {
			props.navigation.navigate('CollectionRequestDetail', { 'id': data[0].id });
		}
	}

	const scheduleClickHandler = id => {
		let data = colReqs.filter((x) => x.id == id);
		//if (data[0]['request_status'] == RequestStatus.Pending || data[0]['request_status'] == RequestStatus.InProcess) {
		props.navigation.navigate('Schedule', { 'id': data[0].id });
		/*}
		else {
			Alert.alert('Can\'t be re-scheduled', 'Only Pending or InProcess requests can be re-scheduled');
		}*/
	}

	const getFilteredData = async () => {
		setIsLoading(true);
		try {
			const reqApiData = await dispatch(collectionRequestAction.getData(0, 0, loggedInUser.UserId, 0, 0,
				formValues['state_id'], formValues['date_from'], formValues['date_upto'],
				formValues['request_status']));
			setColReqs(reqApiData);

			setIsLoading(false);
			setShowFilters(false);
			if (multipleAction && formValues['request_status'] != '1') {
				setMultipleAction(false);
			}
			setCheckedIds([]);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	const checkForMultipleAssign = (id) => {
		if (formValues['request_status'] == '1') {
			checkedIds.push(parseInt(id));
			setMultipleAction(true);
		} else {
			GlobalFunctions.showToast('Filter For Pending Requests Only');
		}
	}

	const checkUnckeckRequest = (status, item) => {
		const id = parseInt(item.id);
		if (checkedIds.includes(id)) {
			const index = checkedIds.indexOf(id);
			if (index > -1) {
				checkedIds.splice(index, 1);
			}
		} else {
			checkedIds.push(id);
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
					<View style={{ flexDirection: 'row', alignItems: 'center' }} key={item.id}>
						{
							multipleAction &&
							<MyCheckBox isChecked={checkedIds.includes(parseInt(item.id))} onCheckChanged={(status) => checkUnckeckRequest(status, item)} />
						}
						<TouchableWithoutFeedback onLongPress={() => checkForMultipleAssign(item.id)}>
							<View>
								<CardData
									index={colIndex}
									data={item}
									titles={['vendor', 'pickup request date', 'address', 'Status']}
									fields={['firm_name', 'request_date', 'address', 'request_status_name']}
									hasActions={true}
									showingCheckBox={multipleAction}
									actions={[editClickHandler, viewClickHandler, scheduleClickHandler]}
									actionIcons={[ActionIcons.Assignment, ActionIcons.View, ActionIcons.Schedule]}
									actionIconColors={[ActionIconColors.Assignment, ActionIconColors.View, ActionIconColors.Schedule]}
								/>
							</View>
						</TouchableWithoutFeedback>
					</View>
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

			<View style={{ ...styles.filterMain, display: showFilters ? 'flex' : 'none' }}>
				<View style={styles.filterChild}>

					<View style={{ flexDirection: 'row' }}>
						<View style={{ flex: 1, paddingRight: 1 }}>
							<MyPickerInput name="state_id" label="State" firstItemTitle="All States" pickerData={statesData}
								pickerId="id" pickerValue="name" onValueChange={getFilteredData} value={formValues} error={formErrors} refs={formRefs}
								initialValue={formValues['state_id']} labelContainerStyle={{ marginTop: 2 }} />
						</View>
						<View style={{ flex: 1, paddingRight: 1 }}>
							<MyPickerInput name="request_status" label="Status" pickerData={Variables.RequestStatusOptions}
								pickerId="id" pickerValue="name" onValueChange={getFilteredData} value={formValues} error={formErrors} refs={formRefs}
								showSelectOption={false} initialValue={formValues['request_status']} labelContainerStyle={{ marginTop: 2 }} />
						</View>
					</View>

					<View style={{ flexDirection: 'row' }}>
						<View style={{ flex: 1, paddingRight: 1 }}>
							<MyDateTimePickerDialog mode="date" name="date_from" value={formValues} error={formErrors} onDateChange={getFilteredData}
								initialValue={formValues['date_from']} label="Date From" refs={formRefs} returnKeyType="done" />
						</View>
						<View style={{ flex: 1, paddingLeft: 1 }}>
							<MyDateTimePickerDialog mode="date" name="date_upto" value={formValues} error={formErrors} onDateChange={getFilteredData}
								initialValue={formValues['date_upto']} label="Date Upto" refs={formRefs} returnKeyType="done" />
						</View>
					</View>

				</View>
			</View>

			{
				colReqs.length === 0 &&
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Image source={require('../../assets/no_record_found.png')} />
				</View>
			}

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
	},
	label: {
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
		fontSize: 15,
	},
	filterMain: {
		overflow: 'hidden',
		paddingBottom: 5,
	},
	filterChild: {
		backgroundColor: Colors.white1,
		height: 135,
		padding: 5,
		shadowColor: Colors.black,
		shadowOffset: { width: 1, height: 1, },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	}
})

export default CollectionRequestsScreen;
