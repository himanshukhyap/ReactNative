import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Alert, BackHandler, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import HeaderRight from '../../navigation/HeaderRight';

import SubmitButton from '../../components/form/SubmitButton';
import CardView from '../../components/CardView';
import MyCheckBox from '../../components/form/MyCheckBox';
import MyPickerInput from '../../components/form/MyPickerInput';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';

import Colors from '../../constants/Colors';
import { ActionIcons, ActionIconColors, RequestStatus } from '../../constants/Enums';
import * as GlobalFunctions from '../../common/GlobalFunctions';
import GS from '../../common/GlobalStyles';

import * as statesAction from '../../store/actions/states';
import * as userAction from '../../store/actions/user';
import * as routeAction from '../../store/actions/routes';
import Variables from '../../constants/Variables';

const RouteVendorSelectionScreen = props => {

	const { params } = props.route;
	const [isLoading, setIsLoading] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [statesEnabled, setStatesEnabled] = useState(true);

	const [statesData, setStatesData] = useState([]);
	const [vendors, setVendors] = useState([]);
	const [routeId, setRouteId] = useState(0);
	const [routeName, setRouteName] = useState('');

	const loggedInUser = useSelector(state => state.login);

	const [checkedIds, setCheckedIds] = useState([]);

	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [formRefs, setFormRefs] = useState({});

	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				setRouteId(params.id);
				setRouteName(params.name);
				const stateApiData = await dispatch(statesAction.getData());
				setStatesData(stateApiData);
				formValues['state_id'] = "0";
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

	const getFilteredData = async () => {
		setIsSearching(true);
		try {
			const apiData = await dispatch(userAction.getVendorsByState(formValues['state_id'], true));
			setVendors(apiData);
			setIsSearching(false);
			setCheckedIds([]);
		} catch (err) {
			setIsSearching(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
		setIsSearching(false);
	}

	const checkUnckeckVendor = (status, item) => {
		const id = parseInt(item.id);
		if (checkedIds.includes(id)) {
			const index = checkedIds.indexOf(id);
			if (index > -1) {
				checkedIds.splice(index, 1);
			}
		} else {
			checkedIds.push(id);
		}
		setStatesEnabled(checkedIds.length == 0);
	}

	const updateClickHandler = async () => {
		setShowButtonLoader(true);
		try {
			await dispatch(routeAction.updateVendorsRoute(routeId, checkedIds.join(',')));
			GlobalFunctions.showMessage("Updated", "Route Updated Successfully !", backToRoutes);
		} catch (err) {
			setShowButtonLoader(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
		setShowButtonLoader(false);
	}

	const backToRoutes = () => {
		props.navigation.goBack();
	}

	return (
		<View style={styles.container}>

			<View style={{ ...GS.w100p, ...GS.bgSuccessLight, ...GS.acenter }}>
				<Text style={{ ...GS.bold, ...GS.pv5, ...GS.ph5, ...GS.fs17 }}>Route : {routeName}</Text>
			</View>

			<View style={{ ...styles.filterMain }}>
				<View style={styles.filterChild}>
					<View style={{ flexDirection: 'row' }}>
						<View style={{ flex: 1, paddingRight: 1 }}>
							<MyPickerInput name="state_id" label="Select State To Get Vendors/Counters" firstItemTitle="All States" pickerData={statesData}
								enabled={statesEnabled} pickerId="id" pickerValue="name" onValueChange={getFilteredData}
								value={formValues} error={formErrors} refs={formRefs} initialValue={formValues['state_id']}
								labelContainerStyle={{ marginTop: 2 }} />
						</View>
					</View>
				</View>
			</View>

			{
				isSearching &&
				<View style={styles.centered}>
					<ActivityIndicator size="large" color={Colors.primary} />
				</View>
			}

			{
				vendors.length == 0 && !isSearching && !isLoading &&
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Image source={require('../../assets/no_record_found.png')} />
				</View>
			}

			{
				vendors.length > 0 && !isSearching &&
				<>
					<FlatList
						data={vendors}
						keyExtractor={item => item.id}
						renderItem={({ item, index }) => (
							<View style={{ ...GS.row100, ...GS.ph5 }}>
								<MyCheckBox isChecked={checkedIds.includes(parseInt(item.id))}
									onCheckChanged={(status) => checkUnckeckVendor(status, item)} />
								<CardView style={{ ...GS.f1, ...GS.mv5, ...GS.aleft }}>
									<Text style={{ ...GS.bold }}>{item.firm_name}</Text>
									<Text>Store Code : {item.store_code}</Text>
									<Text>{item.address}, {item.city}</Text>
								</CardView>
							</View>
						)}
					/>

					<SubmitButton title="Update Route" onPress={updateClickHandler} IsLoading={showButtonLoader}
						style={{ ...GS.w125, ...GS.scenter, ...GS.mv10 }} />
				</>
			}

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
		height: 70,
		padding: 5,
		shadowColor: Colors.black,
		shadowOffset: { width: 1, height: 1, },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	}
})

export default RouteVendorSelectionScreen;