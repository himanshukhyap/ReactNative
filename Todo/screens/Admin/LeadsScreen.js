import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Alert, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-tiny-toast';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import HeaderRight from '../../navigation/HeaderRight';

import CardData from '../../components/CardData';
import MyTextInput from '../../components/form/MyTextInput';
import MyPickerInput from '../../components/form/MyPickerInput';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';

import Colors from '../../constants/Colors';
import Variables from '../../constants/Variables';
import * as GlobalFunctions from '../../common/GlobalFunctions';
import { ActionIcons, ActionIconColors, UserType, CapitalizeType, KeyboardType } from '../../constants/Enums';

import * as signupAction from '../../store/actions/signup';
import * as downloadAction from '../../store/actions/download';

const LeadsScreen = props => {

	const [isLoading, setIsLoading] = useState(false);
	const [isFiltering, setIsFiltering] = useState(false);
	const [isResetting, setIsResetting] = useState(false);

	const [showFilters, setShowFilters] = useState(false);

	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [formRefs, setFormRefs] = useState({});

	const signups = useSelector(state => state.signups.list);

	const dispatch = useDispatch();

	const downloadClickHandler = async () => {
		try {
			Toast.show('Downloading, wait...');
			const serverFileName = await dispatch(downloadAction.generateLeadsExcel(formValues['entry_by'], formValues['firm_name'], formValues['name'], formValues['remarks'], formValues['city']));
			GlobalFunctions.downloadReport(serverFileName);
		} catch (err) {
			Alert.alert('Some Error Occurred !', err.message);
		}
	}

	useEffect(() => {
		props.navigation.setOptions({
			title: 'Leads', headerRight: () => (
				<View style={{ flexDirection: 'row' }}>
					<HeaderRight
						isIcon={true}
						iconName="md-download"
						onPress={downloadClickHandler}
					/>
					<HeaderRight
						isIcon={true}
						iconComp={MaterialCommunityIcons}
						iconName="filter-outline"
						onPress={() => setShowFilters(!showFilters)}
					/>
				</View>
			)
		});
	}, [showFilters]);

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				formValues['entry_by'] = -1;
				await dispatch(signupAction.getData(0, -1));
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
		let data = signups.filter((x) => x.id == id);
		if (data.length > 0) {
			props.navigation.navigate('LeadsEntry', { 'id': data[0].id });
		}
	}

	const viewClickHandler = id => {
		let data = signups.filter((x) => x.id == id);
		if (data.length > 0) {
			if (data[0].mobile == '' || data[0].mobile == undefined || data[0].mobile == 'NULL') {
				Alert.alert('Mobile Number Missing', 'Please edit this record & add mobile number first', [{ text: 'Okay' }]);
				return;
			}
			props.navigation.navigate('LeadsDetail', { 'id': data[0].id, 'qty': data[0].oil_quantity });
		}
	}

	const followupClickHandler = id => {
		props.navigation.navigate('LeadsFollowups', { 'lead_id': id });
	}

	const deleteClickHandler = id => {
		Alert.alert(
			'Deleting Record ?',
			'Are you sure you want to delete this record ?',
			[
				{ text: 'No', onPress: () => { } },
				{ text: 'Yes', onPress: () => { deleteRecord(id); } },
			],
			{
				cancelable: true
			}
		);
	}

	const deleteRecord = async (id) => {
		setIsLoading(true);
		try {
			await dispatch(signupAction.deleteData(id));
			await dispatch(signupAction.getData());
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
		setIsLoading(false);
	}

	const filterClickHandler = () => {
		setIsFiltering(true);
		setTimeout(() => {
			filterRecords();
		}, 50);
	}

	const filterRecords = async () => {
		try {
			await dispatch(signupAction.getData(0, formValues['entry_by'], formValues['firm_name'], formValues['name'], formValues['remarks'], formValues['city']));
			setIsFiltering(false);
			setShowFilters(false);
		} catch (err) {
			setIsFiltering(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	const resetClickHandler = async () => {
		try {
			setIsResetting(true);
			await dispatch(signupAction.getData(0, -1));
			setTimeout(() => {
				formValues['entry_by'] = -1;
				setIsResetting(false);
				setShowFilters(false);
			}, 100);
		} catch (err) {
			setIsResetting(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	return (
		<View style={styles.container}>

			<View style={{ ...styles.filterMain, display: showFilters ? 'flex' : 'none' }}>
				<View style={styles.filterChild}>

					<View style={{ flexDirection: 'row', width: '100%' }}>
						<View style={{ flex: 1, paddingRight: 5 }}>
							<MyTextInput name="firm_name" value={formValues} initialValue={formValues['firm_name']}
								label="Firm Name" keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.None}
								maxLength={100} refs={formRefs} returnKeyType="next" nextCtl="name"
								labelContainerStyle={{ marginTop: 0 }} error={formErrors}
								submitting={isFiltering} resetting={isResetting} />
						</View>
						<View style={{ flex: 1, paddingLeft: 5 }}>
							<MyTextInput name="name" value={formValues} initialValue={formValues['name']} label="Contact Person"
								autoCapitalize={CapitalizeType.None} maxLength={100} refs={formRefs} nextCtl="remarks"
								labelContainerStyle={{ marginTop: 0 }} error={formErrors} resetting={isResetting} />
						</View>
					</View>

					<View style={{ flexDirection: 'row', width: '100%' }}>
						<View style={{ flex: 1, paddingRight: 5 }}>
							<MyTextInput name="remarks" value={formValues} initialValue={formValues['remarks']}
								label="Remarks" keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.None}
								maxLength={100} refs={formRefs} returnKeyType="next" nextCtl="city" error={formErrors}
								labelContainerStyle={{ marginTop: 5 }} resetting={isResetting} />
						</View>
						<View style={{ flex: 1, paddingLeft: 5 }}>
							<MyTextInput name="city" value={formValues} initialValue={formValues['city']} label="City"
								autoCapitalize={CapitalizeType.None} maxLength={100} refs={formRefs} resetting={isResetting}
								returnKeyType="done" error={formErrors} labelContainerStyle={{ marginTop: 5 }} />
						</View>
					</View>

					<View style={{ flexDirection: 'row', width: '100%' }}>
						<View style={{ flex: 1, paddingRight: 5 }}>
							<MyPickerInput name="entry_by" value={formValues} error={formErrors}
								initialValue={formValues['entry_by']} label="Leads Type" pickerData={Variables.LeadsTypeOptions}
								pickerId="id" pickerValue="name" refs={formRefs} showSelectOption={false} resetting={isResetting}
								labelContainerStyle={{ marginTop: 5 }} />
						</View>
						<View style={{ flex: 1, paddingRight: 5 }}>
							<View style={styles.formFooter}>
								<SubmitButton title="Filter" style={{ width: 60 }} onPress={filterClickHandler} IsLoading={isFiltering} />
								<CancelButton title="Reset" buttonStyle={{ width: 60 }} onPress={resetClickHandler} IsLoading={isResetting} />
							</View>
						</View>
					</View>


				</View>
			</View>
			{
				(isFiltering || isResetting) ?
					<ActivityIndicator size="large" color={Colors.primary} /> :
					signups.length === 0 ?
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Image source={require('../../assets/no_record_found.png')} />
						</View> :
						<FlatList
							keyboardShouldPersistTaps="handled"
							data={signups}
							keyExtractor={item => item.id}
							renderItem={({ item, index }) => (
								<CardData
									index={index}
									data={item}
									titles={['firm name', 'contact person', 'mobile', 'city', 'oil quantity (kg)', 'expected rate (per kg)', 'created by', 'created date']}
									fields={['firm_name', 'name', 'mobile', 'city', 'oil_quantity', 'expected_rate', 'created_by', 'entry_date_string']}
									hasActions={true}
									actions={[followupClickHandler, editClickHandler, viewClickHandler, deleteClickHandler]}
									actionIcons={[ActionIcons.Schedule, ActionIcons.Edit, ActionIcons.View, ActionIcons.Delete]}
									actionIconColors={[ActionIconColors.Schedule, ActionIconColors.Edit, ActionIconColors.View, ActionIconColors.Delete]}
								/>
							)}
						/>
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
	label: {
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
		fontSize: 15,
	},
	input: {
		paddingHorizontal: 10,
		paddingVertical: 2,
		fontFamily: 'Roboto',
		fontSize: 15.5,
		borderColor: Colors.gray,
		borderWidth: 1
	},
	filterMain: {
		overflow: 'hidden',
		paddingBottom: 10,
	},
	filterChild: {
		backgroundColor: Colors.white1,
		height: 190,
		padding: 5,
		shadowColor: Colors.black,
		shadowOffset: { width: 1, height: 1, },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	formFooter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		borderTopColor: Colors.gray,
		borderTopWidth: 0,
		marginVertical: 10,
		paddingTop: 12
	}
})


export default LeadsScreen;
