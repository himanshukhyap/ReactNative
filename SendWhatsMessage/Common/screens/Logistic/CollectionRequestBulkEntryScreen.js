import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import TableHeaderFix from '../../components/TableHeaderFix';
import TableDataFix from '../../components/TableDataFix';
import Colors from '../../constants/Colors';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';

import MyTextInput from '../../components/form/MyTextInput';
import MyLabelAsInput from '../../components/form/MyLabelAsInput';
import MyPickerInput from '../../components/form/MyPickerInput';
import MyRadioInput from '../../components/form/MyRadioInput';
import MyImageSelector from '../../components/form/MyImageSelector';
import { ValidationType, KeyboardType, CapitalizeType, UserType, RequestStatus, FileType } from '../../constants/Enums';

import * as userAction from '../../store/actions/user';
import * as warehouseAction from '../../store/actions/warehouse';
import * as transporterAction from '../../store/actions/transporter';
import * as collectionrequestAction from '../../store/actions/collectionrequest';
import DetailsViewer from '../../components/DetailsViewer';
import * as GlobalFunctions from '../../common/GlobalFunctions';

const CollectionRequestBulkEntryScreen = props => {

	const { params } = props.route;
	const [isLoading, setIsLoading] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [ids, setIds] = useState(0);

	const [requests, setRequests] = useState([]);

	const [driverDetailsFound, setDriverDetailsFound] = useState(false);

	const users = useSelector(state => state.users.list);
	const warehouses = useSelector(state => state.warehouses.list);
	const transporters = useSelector(state => state.transporters.list);
	const loggedInUser = useSelector(state => state.login);

	const [formValues, setFormValues] = useState([]);
	const [formErrors, setFormErrors] = useState([]);
	const [formRefs, setFormRefs] = useState([]);

	const dispatch = useDispatch();

	const fetchAllData = async (pkids) => {
		try {
			setIsLoading(true);

			await dispatch(userAction.getData(0, UserType.PDA, loggedInUser.UserId, 1));
			await dispatch(transporterAction.getData(0));
			await dispatch(warehouseAction.getData(0));

			if (pkids != "") {
				setIds(pkids);
				const apiData = await dispatch(collectionrequestAction.getMultipleRequests(pkids));
				setRequests(apiData);
			}
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	useEffect(() => {

		props.navigation.setOptions({ title: 'Collection Request Processing' });

		if (params && params.ids) {
			fetchAllData(params.ids);
		} else {
			fetchAllData(0);
		}
	}, [dispatch]);


	const cancelClickHandler = navData => {
		props.navigation.goBack();
	}

	const submitClickHandler = async () => {
		setIsSubmitting(true);
		setTimeout(() => {
			submitDetails();
		}, 50);
	}

	const onTransporterSelected = (tid) => {
		const tData = transporters.filter(x => x.id == tid);
		if(tData.length > 0) {
			formValues['vehicle_no'] = tData[0].vehicle_no;
            formValues['driver_name'] = tData[0].driver_name;
            formValues['driver_mobile'] = tData[0].driver_mobile;
			setDriverDetailsFound(true);
			setTimeout(() => {
				setDriverDetailsFound(false);
			}, 100);
		}
	}

	const submitDetails = async () => {
		let formValidated = true;

		for (let fe in formErrors) {
			if (formErrors[fe] != '') {
				formValidated = false;
				break;
			}
		}

		if (!formValidated) {
			GlobalFunctions.showErrorToast(() => setIsSubmitting(false));
			return;
		}

		setShowButtonLoader(true);

		formValues['ids'] = ids;
		formValues['request_status'] = RequestStatus.InProcess;

		try {
			await dispatch(collectionrequestAction.submitMultiple(formValues));
			setIsSubmitting(false);
			setShowButtonLoader(false);
			props.navigation.navigate('CollectionRequests1', { token: 'refresh' });
		} catch (err) {
			setShowButtonLoader(false);
			setIsSubmitting(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}

	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	return (
		<ScrollView keyboardShouldPersistTaps="handled">
			<View>

				<View style={styles.formHeader}>
					<Text style={styles.heading}>List of Requests</Text>
				</View>

				<ScrollView horizontal={true}>
					<View>
						<TableHeaderFix titles={['Vendor', 'Address', 'Request Date', 'Drums Quantity', 'Total Quantity (kg)', 'Empty Drums Required']}
							sizes={[1, 1, 1, 1, 1.1, 1.3]}
							alignments={['left', 'left', 'center', 'right', 'right', 'right']} />

						<FlatList
							data={requests}
							keyExtractor={item => item.id}
							renderItem={({ item, index }) => (
								<View style={index % 2 == 0 ? styles.even : styles.odd}>
									<TableDataFix data={item} fields={['firm_name', 'address', 'request_date', 'actual_drums_qty_temp', 'actual_volume_temp', 'empty_drums_qty']}
										alignments={['left', 'left', 'center', 'right', 'right', 'right']}
										index={index} sizes={[1, 1, 1, 1, 1.1, 1.3]}
										onEditPress={() => { editClickHandler(item.id) }}
										onDeletePress={() => { deleteClickHandler(item.id) }} />
								</View>
							)}
						/>
					</View>
				</ScrollView>

				<View style={styles.container}>

					<View style={styles.formHeader}>
						<Text style={styles.heading}>Assign PDA & Transporter</Text>
					</View>

					<MyPickerInput name="assigned_to" value={formValues} error={formErrors} submitting={isSubmitting}
						initialValue={formValues['assigned_to']} label="PDA" pickerData={users} pickerId="id" pickerValue="name"
						validationType={ValidationType.Required} refs={formRefs} />

					<MyPickerInput name="transporter_id" value={formValues} error={formErrors} submitting={isSubmitting}
						initialValue={formValues['transporter_id']} label="Transporter" pickerData={transporters} pickerId="id" pickerValue="name"
						validationType={ValidationType.Required} refs={formRefs} onValueChange={onTransporterSelected} />

					<MyPickerInput name="warehouse_id" value={formValues} error={formErrors} submitting={isSubmitting}
						initialValue={formValues['warehouse_id']} label="Warehouse" pickerData={warehouses} pickerId="id" pickerValue="name"
						validationType={ValidationType.Required} refs={formRefs} />

					<MyTextInput name="driver_name" value={formValues} error={formErrors} submitting={isSubmitting} driverDetailsFound={driverDetailsFound}
						initialValue={formValues['driver_name']} label="Driver Name" keyboardType={KeyboardType.Default}
						autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} nextCtl="driver_mobile" />

					<MyTextInput name="driver_mobile" value={formValues} error={formErrors} submitting={isSubmitting} driverDetailsFound={driverDetailsFound}
						initialValue={formValues['driver_mobile']} label="Driver Mobile" validationType={ValidationType.Mobile}
						keyboardType={KeyboardType.Phone} maxLength={10} refs={formRefs} nextCtl="vehicle_no" />

					<MyTextInput name="vehicle_no" value={formValues} error={formErrors} submitting={isSubmitting} driverDetailsFound={driverDetailsFound}
						initialValue={formValues['vehicle_no']} label="Vehicle No" keyboardType={KeyboardType.Default}
						autoCapitalize={CapitalizeType.Characters} maxLength={20} refs={formRefs} returnKeyType="done" />


					<View style={styles.formFooter}>
						<SubmitButton title="Save/Update" onPress={submitClickHandler} IsLoading={showButtonLoader} />
						<CancelButton title="Cancel" onPress={cancelClickHandler} />
					</View>

				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1,
		paddingLeft: 10,
		paddingRight: 10,
	},
	extraTopMargin: {
		marginTop: 15
	},
	formHeader: {
		width: '100%',
		borderBottomColor: Colors.gray,
		borderBottomWidth: 0,
		marginTop: 5,
		alignItems: 'center'
	},
	heading: {
		fontSize: 20,
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
	},
	formFooter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		borderTopColor: Colors.gray,
		borderTopWidth: 0,
		marginVertical: 10,
		paddingTop: 10
	},
    odd: {
        backgroundColor: Colors.white2,
        borderBottomColor: Colors.offWhite,
        borderBottomWidth: 1
    },
    even: {
        backgroundColor: Colors.white1,
        borderBottomColor: Colors.offWhite,
        borderBottomWidth: 1
    },
})


export default CollectionRequestBulkEntryScreen;
