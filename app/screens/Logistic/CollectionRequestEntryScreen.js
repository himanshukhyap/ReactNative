import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderRight from '../../navigation/HeaderRight';
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
import GS from '../../common/GlobalStyles';
import Variables from '../../constants/Variables';

const CollectionRequestEntryScreen = props => {

	const { params } = props.route;
	const [isLoading, setIsLoading] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [id, setId] = useState(0);
	const [reqStatus, setReqStatus] = useState(1);
	const [assignedTo, setAssignedTo] = useState(0);

	const users = useSelector(state => state.users.list);
	const warehouses = useSelector(state => state.warehouses.list);
	const transporters = useSelector(state => state.transporters.list);
	const collectionrequestData = useSelector(state => state.collectionrequests.record);
	const loggedInUser = useSelector(state => state.login);

	const [filledQtyState, setFilledQtyState] = useState(2);
	const [filledVolState, setFilledVolState] = useState(2);
	const [unitChanged, setUnitChanged] = useState(false);

	const [driverDetailsFound, setDriverDetailsFound] = useState(false);

	const [formValues, setFormValues] = useState([]);
	const [formErrors, setFormErrors] = useState([]);
	const [formRefs, setFormRefs] = useState([]);

	const dispatch = useDispatch();

	const fetchAllData = async (pkid) => {
		try {
			setIsLoading(true);

			await dispatch(userAction.getData(0, UserType.PDA, loggedInUser.UserId, 1));
			await dispatch(transporterAction.getData(0));
			await dispatch(warehouseAction.getData(0));

			if (pkid > 0) {
				setId(pkid);
				await dispatch(collectionrequestAction.getData(pkid));
			}
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	useEffect(() => {

		props.navigation.setOptions({ title: 'Collection Request Processing' });

		if (params && params.id) {
			fetchAllData(params.id);
		} else {
			fetchAllData(0);
		}
	}, [dispatch]);


	useEffect(() => {
		if (collectionrequestData != null) {
			formValues['assigned_to'] = collectionrequestData.assigned_to;
			formValues['transporter_id'] = collectionrequestData.transporter_id;
			formValues['warehouse_id'] = collectionrequestData.warehouse_id;
			formValues['vehicle_no'] = collectionrequestData.vehicle_no;
			formValues['driver_name'] = collectionrequestData.driver_name;
			formValues['driver_mobile'] = collectionrequestData.driver_mobile;
			//formValues['entered_drums_qty'] = collectionrequestData.entered_drums_qty;
			//formValues['actual_drums_qty'] = collectionrequestData.actual_drums_qty;
			//formValues['entered_volume'] = collectionrequestData.entered_volume;
			//formValues['actual_volume'] = collectionrequestData.actual_volume;
			//formValues['empty_drums_qty'] = collectionrequestData.empty_drums_qty;
			setAssignedTo(collectionrequestData.assigned_to);
			setReqStatus(collectionrequestData.request_status);
		}
	}, [collectionrequestData]);


	const onTransporterSelected = (tid) => {
		const tData = transporters.filter(x => x.id == tid);
		if (tData.length > 0) {
			formValues['vehicle_no'] = tData[0].vehicle_no;
			formValues['driver_name'] = tData[0].driver_name;
			formValues['driver_mobile'] = tData[0].driver_mobile;
			setDriverDetailsFound(true);
			setTimeout(() => {
				setDriverDetailsFound(false);
			}, 100);
		}
	}

	const cancelClickHandler = navData => {
		props.navigation.goBack();
	}

	const submitClickHandler = async () => {
		setIsSubmitting(true);
		setTimeout(() => {
			submitDetails();
		}, 50);
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

		formValues['id'] = id;
		if (formValues['gate_pass'] != undefined && formValues['gate_pass'] != '' && reqStatus == RequestStatus.InProcess) {
			formValues['request_status'] = RequestStatus.Completed;
		} else {
			formValues['request_status'] = reqStatus == RequestStatus.Pending ? RequestStatus.InProcess : reqStatus;
		}
		if (reqStatus == RequestStatus.InProcess) {
			formValues['actual_volume'] = formValues['inKg'];
			formValues['unit'] = 1;
		}
		try {
			await dispatch(collectionrequestAction.postData(formValues));
			setIsSubmitting(false);
			setShowButtonLoader(false);
			props.navigation.navigate('CollectionRequests1', { token: 'refresh' });
		} catch (err) {
			setShowButtonLoader(false);
			setIsSubmitting(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}

	}

	const unitChangedHandler = (val) => {
		const vol = isNaN(parseFloat(formValues['actual_volume'])) ? 0 : parseFloat(formValues['actual_volume']);
		if (val == 1) {
			formValues['inKg'] = vol.toFixed(2);
		} else if (val == 2) {
			formValues['inKg'] = (vol * 0.91).toFixed(2);
		} else {
			formValues['inKg'] = '';
		}
		setUnitChanged(!unitChanged);
	}

	const volChangedHandler = (v) => {
		const vol = isNaN(parseFloat(formValues['actual_volume'])) ? 0 : parseFloat(formValues['actual_volume'])
		if (formValues['unit'] == 1) {
			formValues['inKg'] = vol.toFixed(2);
		} else if (formValues['unit'] == 2) {
			formValues['inKg'] = (vol * 0.91).toFixed(2);
		} else {
			formValues['inKg'] = '';
		}
		setUnitChanged(!unitChanged);
	}

	const changeAssignment = (val) => {
		setAssignedTo(val);
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
					<Text style={styles.heading}>Request Details</Text>
				</View>

				<DetailsViewer
					style={{ marginVertical: 5 }}
					data={collectionrequestData}
					captions="Vendor,Address,Request Date,Request Status,Drums Quantity,Total Quantity (kg),Empty Drums Required"
					keys="firm_name,address,request_date,request_status_name,actual_drums_qty_temp,actual_volume_temp,empty_drums_qty" />

				<View style={styles.container}>

					<View style={styles.formHeader}>
						<Text style={styles.heading}>Assign PDA & Transporter</Text>
					</View>

					<MyPickerInput name="assigned_to" value={formValues} error={formErrors} submitting={isSubmitting}
						initialValue={formValues['assigned_to']} label="PDA" pickerData={users} pickerId="id" pickerValue="name"
						validationType={ValidationType.Required} refs={formRefs} onValueChange={changeAssignment} />

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

					{
						(assignedTo == loggedInUser.UserId && reqStatus == RequestStatus.InProcess) &&
						<View>

							<View style={[styles.formHeader, styles.extraTopMargin]}>
								<Text style={styles.heading}>Fill Details</Text>
							</View>

							<MyTextInput name="actual_drums_qty" value={formValues} error={formErrors} submitting={isSubmitting}
								initialValue={formValues['actual_drums_qty']} label="Actual Filled Drums Quantity" keyboardType={KeyboardType.Number}
								refs={formRefs} nextCtl="actual_volume" validationType={ValidationType.NumberRequired} />

							<View style={{ ...GS.row100 }}>
								<View style={{ flex: 1.3, ...GS.pr2 }}>
									<MyTextInput name="actual_volume" value={formValues} error={formErrors} submitting={isSubmitting} showError={false}
										initialValue={formValues['actual_volume']} label="Actual Quantity" keyboardType={KeyboardType.Number}
										refs={formRefs} nextCtl="empty_drums_qty" validationType={ValidationType.DecimalRequired} OnTextChanged={volChangedHandler} />
								</View>
								<View style={{ ...GS.f1 }}>
									<MyPickerInput name="unit" value={formValues} error={formErrors} submitting={isSubmitting} firstItemTitle=" "
										initialValue={formValues['unit']} label="Unit" pickerData={Variables.OilUnit} pickerId="id" pickerValue="name"
										validationType={ValidationType.Required} refs={formRefs} onValueChange={unitChangedHandler} showError={false} />
								</View>
								<View style={{ ...GS.f1, ...GS.pl2 }}>
									<MyLabelAsInput label="In kg" initialValue={formValues['inKg']} currentUnit={unitChanged} />
								</View>
							</View>

							<MyTextInput name="empty_drums_qty" value={formValues} error={formErrors} submitting={isSubmitting}
								initialValue={formValues['empty_drums_qty']} label="Empty Drums Required" keyboardType={KeyboardType.Number}
								refs={formRefs} returnKeyType="done"  />


							<View style={styles.formHeader}>
								<Text style={styles.heading}>{"\n"}Upload Gatepass</Text>
							</View>

							<MyImageSelector name="gate_pass" value={formValues} error={formErrors} submitting={isSubmitting}
								label="Select Gate Pass Picture" validationType={ValidationType.Required} />

							<MyTextInput name="remarks" value={formValues} error={formErrors} submitting={isSubmitting}
								initialValue={formValues['remarks']} label="Remarks" keyboardType={KeyboardType.Default}
								maxLength={400} refs={formRefs} returnKeyType="done" autoCapitalize={CapitalizeType.Sentences}
								multiline={true} numberOfLines={4} />
						</View>
					}
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
	}
})


export default CollectionRequestEntryScreen;
