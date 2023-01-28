import React, { useState, useEffect, useReducer, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderRight from '../../navigation/HeaderRight';
import Colors from '../../constants/Colors';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';

import MyTextInput from '../../components/form/MyTextInput';
import MyPickerInput from '../../components/form/MyPickerInput';
import MyRadioInput from '../../components/form/MyRadioInput';
import { ValidationType, KeyboardType, CapitalizeType } from '../../constants/Enums';
import * as GlobalFunctions from '../../common/GlobalFunctions';

import * as statesAction from '../../store/actions/states';
import * as transporterAction from '../../store/actions/transporter';

const TransporterEntryScreen = props => {

	const { params } = props.route;
	const [isLoading, setIsLoading] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [id, setId] = useState(0);

	const statesData = useSelector(state => state.states.list);
	const transporterData = useSelector(state => state.transporters.record);

	const [formValues, setFormValues] = useState([]);
	const [formErrors, setFormErrors] = useState([]);
	const [formRefs, setFormRefs] = useState([]);

	const dispatch = useDispatch();

	const fetchAllData = async (pkid) => {
		try {
			setIsLoading(true);
			await dispatch(statesAction.getData());
			if (pkid > 0) {
				setId(pkid);
				await dispatch(transporterAction.getData(pkid, 0));
			}
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	useEffect(() => {
		if (params && params.id) {
			fetchAllData(params.id);
		} else {
			fetchAllData(0);
		}
	}, [dispatch]);


	useEffect(() => {
		if (transporterData != null) {
			formValues['name'] = transporterData.name;
			formValues['contact_person'] = transporterData.contact_person;
			formValues['contact_no'] = transporterData.contact_no;
			formValues['rate_per_kg'] = transporterData.rate_per_kg;
			formValues['state_id'] = transporterData.state_id;
			formValues['city'] = transporterData.city;
			formValues['address'] = transporterData.address;
			formValues['postal_code'] = transporterData.postal_code;
			formValues['vehicle_number'] = transporterData.vehicle_number;
			formValues['driver_name'] = transporterData.driver_name;
			formValues['driver_mobile'] = transporterData.driver_mobile;
			formValues['is_active'] = transporterData.is_active;
		}
	}, [transporterData]);


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

		console.log('details will be submitted now');

		formValues['id'] = id;
		try {
			await dispatch(transporterAction.postData(formValues));
			setIsSubmitting(false);
			setShowButtonLoader(false);
			props.navigation.navigate('Transporters1', { token: 'refresh' });
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
			<View style={styles.container}>
				<View style={styles.formHeader}>
					<Text style={styles.heading}>Add/Edit Transporter</Text>
				</View>

				<MyTextInput name="name" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['name']} label="Name" validationType={ValidationType.Required}
					autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} nextCtl="contact_person" />

				<MyTextInput name="contact_person" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['contact_person']} label="Contact Person"
					autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} nextCtl="contact_no" />

				<MyTextInput name="contact_no" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['contact_no']}
					label="Contact No" validationType={ValidationType.Mobile} keyboardType={KeyboardType.Phone}
					maxLength={10} refs={formRefs} nextCtl="rate_per_kg" />

				<MyTextInput name="rate_per_kg" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['rate_per_kg']}
					label="Rate Per Kg" keyboardType={KeyboardType.Number} validationType={ValidationType.Decimal}
					refs={formRefs} returnKeyType="done" />

				<MyPickerInput name="state_id" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['state_id']}
					label="State" pickerData={statesData} pickerId="id" pickerValue="name" refs={formRefs} nextCtl="city" />

				<MyTextInput name="city" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['city']}
					label="City" keyboardType={KeyboardType.Default} returnKeyType="next" refs={formRefs} nextCtl="address"
					autoCapitalize={CapitalizeType.Words} maxLength={100} />

				<MyTextInput name="address" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['address']}
					label="Address" keyboardType={KeyboardType.Default} returnKeyType="next"
					autoCapitalize={CapitalizeType.Words} maxLength={200} refs={formRefs} nextCtl="postal_code" />

				<MyTextInput name="postal_code" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['postal_code']}
					label="Postal Code" keyboardType={KeyboardType.Number} validationType={ValidationType.Number}
					maxLength={6} refs={formRefs} nextCtl="vehicle_no" />

				<MyTextInput name="vehicle_no" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['vehicle_no']}
					label="Vehicle Number" keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.Characters}
					maxLength={20} refs={formRefs} nextCtl="driver_name" />

				<MyTextInput name="driver_name" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['driver_name']}
					label="Driver Name" keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.Words}
					maxLength={100} refs={formRefs} nextCtl="driver_mobile" />

				<MyTextInput name="driver_mobile" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['driver_mobile']}
					label="Driver Mobile" keyboardType={KeyboardType.Number} validationType={ValidationType.Phone}
					maxLength={10} refs={formRefs} returnKeyType="done" />

				<MyRadioInput name="is_active" value={formValues} initialValue={formValues['is_active'] == "1" ? "1" : "0"}
					label="Is Active ?" refs={formRefs} />


				<View style={styles.formFooter}>
					<SubmitButton title="Save/Update" onPress={submitClickHandler} IsLoading={showButtonLoader} />
					<CancelButton title="Cancel" onPress={cancelClickHandler} />
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


export default TransporterEntryScreen;
