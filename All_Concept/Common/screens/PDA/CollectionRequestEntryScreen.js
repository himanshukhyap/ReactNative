import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderRight from '../../navigation/HeaderRight';
import Colors from '../../constants/Colors';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';

import MyTextInput from '../../components/form/MyTextInput';
import MyPickerInput from '../../components/form/MyPickerInput';
import MyLabelAsInput from '../../components/form/MyLabelAsInput';
import MyRadioInput from '../../components/form/MyRadioInput';
import MyImagePicker from '../../components/form/MyImagePicker';
import { ValidationType, KeyboardType, CapitalizeType, UserType, RequestStatus } from '../../constants/Enums';
import * as GlobalFunctions from '../../common/GlobalFunctions';
import GS from '../../common/GlobalStyles';
import Variables from '../../constants/Variables';

import * as collectionrequestAction from '../../store/actions/collectionrequest';
import DetailsViewer from '../../components/DetailsViewer';

const CollectionRequestEntryScreen = props => {

	const { params } = props.route;
	const [isLoading, setIsLoading] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [id, setId] = useState(0);
	const [reqStatus, setReqStatus] = useState(1);

	const [unitChanged, setUnitChanged] = useState(false);

	const [filledQtyState, setFilledQtyState] = useState(2);
	const [filledVolState, setFilledVolState] = useState(2);

	const collectionrequestData = useSelector(state => state.collectionrequests.record);

	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [formRefs, setFormRefs] = useState({});

	const dispatch = useDispatch();

	const fetchAllData = async (pkid) => {
		try {
			setIsLoading(true);
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

		props.navigation.setOptions({ title: 'Collection Request Entry' });

		if (params && params.id) {
			fetchAllData(params.id);
		} else {
			fetchAllData(0);
		}
	}, [dispatch]);


	useEffect(() => {
		if (collectionrequestData != null) {
			//formValues['entered_drums_qty'] = collectionrequestData.entered_drums_qty;
			//formValues['actual_drums_qty'] = collectionrequestData.entered_drums_qty;
			//formValues['entered_volume'] = collectionrequestData.entered_volume;
			//formValues['actual_volume'] = collectionrequestData.actual_volume;
			//formValues['empty_drums_qty'] = collectionrequestData.empty_drums_qty;
			//formValues['inKg'] = collectionrequestData.actual_volume;
			setReqStatus(collectionrequestData.request_status);
		}
	}, [collectionrequestData]);


	const filledQtyStatusClick = status => {
		if (status == 1) {
			formValues['actual_drums_qty'] = formValues['entered_drums_qty'];
			formErrors['actual_drums_qty'] = '';
		}
		setFilledQtyState(status);
	}

	const filledVolStatusClick = status => {
		if (status == 1) {
			formValues['actual_volume'] = formValues['entered_volume'];
			formErrors['actual_volume'] = '';
			formValues['unit'] = 1; //for KG by Default
			formValues['inKg'] = formValues['entered_volume'];
		}
		setFilledVolState(status);
	}

	const unitChangedHandler = (val) => {
		const vol = isNaN(parseFloat(formValues['actual_volume'])) ? 0 : parseFloat(formValues['actual_volume']);
		if (val == 1) {
			formValues['inKg'] = vol.toFixed(2);
		} else if (val == 2) {
			formValues['inKg'] = (vol * 0.99).toFixed(2);
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
			formValues['inKg'] = (vol * 0.99).toFixed(2);
		} else {
			formValues['inKg'] = '';
		}
		setUnitChanged(!unitChanged);
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
				console.log(fe + ' missing');
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
		formValues['request_status'] = reqStatus == RequestStatus.InProcess ? RequestStatus.Completed : reqStatus;
		formValues['actual_volume'] = formValues['inKg'];
		formValues['unit'] = 1;
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
					<Text style={styles.heading}>Existing Details</Text>
				</View>

				<DetailsViewer
					style={{ marginVertical: 5 }}
					data={collectionrequestData}
					captions="Vendor,Address,Request Date,Request Status,Transporter,Vehicle No,Driver Name,Driver Mobile,Warehouse,Entered Filled Drums,Requested Empty Drums,Entered Quantity (Kg)"
					keys="firm_name,address,request_date,request_status_name,transporter,vehicle_no,driver_name,driver_mobile,warehouse_name,entered_drums_qty,empty_drums_qty,entered_volume" />

				<View style={styles.container}>

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
						refs={formRefs} returnKeyType="done" validationType={ValidationType.NumberRequired} />


					<View style={styles.formHeader}>
						<Text style={styles.heading}>Upload Gate Pass</Text>
					</View>

					<MyImagePicker name="gate_pass" value={formValues} error={formErrors} submitting={isSubmitting}
						label="Gatepass Picture" />

					<MyTextInput name="remarks" value={formValues} error={formErrors} submitting={isSubmitting}
						initialValue={formValues['remarks']} label="Remarks" keyboardType={KeyboardType.Default}
						maxLength={400} refs={formRefs} returnKeyType="done" autoCapitalize={CapitalizeType.Sentences}
						multiline={true} numberOfLines={4} />

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
	formHeader: {
		width: '100%',
		borderBottomColor: Colors.gray,
		borderBottomWidth: 0,
		marginTop: 15,
		marginBottom: 10,
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
	yes_no_buttons: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		marginVertical: 10,
		paddingTop: 10
	}
})


export default CollectionRequestEntryScreen;
