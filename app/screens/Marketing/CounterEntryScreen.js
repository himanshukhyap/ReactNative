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
import { ValidationType, KeyboardType, CapitalizeType, UserType } from '../../constants/Enums';
import * as GlobalFunctions from '../../common/GlobalFunctions';

import * as userAction from '../../store/actions/user';
import * as statesAction from '../../store/actions/states';

let vendorId = 0;

const CounterEntryScreen = props => {

	const { params } = props.route;
	const [isLoading, setIsLoading] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [id, setId] = useState(0);

	const statesData = useSelector(state => state.states.list);
	const userData = useSelector(state => state.users.record);
	const managers = useSelector(state => state.users.list);

	const [formValues, setFormValues] = useState([]);
	const [formErrors, setFormErrors] = useState([]);
	const [formRefs, setFormRefs] = useState([]);

	const dispatch = useDispatch();

	const fetchAllData = async (pkid) => {
		try {
			setIsLoading(true);
			await dispatch(statesAction.getData());
			await dispatch(userAction.getData(0, UserType.LogisticManager));
			if (pkid > 0) {
				setId(pkid);
				await dispatch(userAction.getData(pkid));
			}
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	useEffect(() => {
		vendorId = params.vendorId;
		if (params && params.id) {
			fetchAllData(params.id);
		} else {
			fetchAllData(0);
		}
	}, [dispatch]);


	useEffect(() => {
		if (userData != null) {
			formValues['name'] = userData.name;
			formValues['mobile'] = userData.mobile;
			formValues['store_code'] = userData.store_code;
			formValues['password'] = 'PASSWORDNOTCHANGED';
			formValues['email'] = userData.email;
			formValues['state_id'] = userData.state_id;
			formValues['city'] = userData.city;
			formValues['address'] = userData.address;
			formValues['postal_code'] = userData.postal_code;
			formValues['is_active'] = userData.is_active;
			formValues['logistic_manger_id'] = userData.logistic_manger_id;
		}
	}, [userData]);


	const cancelClickHandler = navData => {
		props.navigation.navigate('Counters', { 'vendorid': vendorId, token: 'refresh' });
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
				console.log(fe + ' - ' + formErrors[fe]);
				formValidated = false;
				break;
			}
		}

		for (let fv in formValues) {
			console.log(fv + ' - ' + formValues[fv]);
		}

		if (!formValidated) {
			GlobalFunctions.showErrorToast(() => setIsSubmitting(false));
			return;
		}

		setShowButtonLoader(true);

		console.log('details will be submitted now');

		formValues['id'] = id;
		formValues['type'] = UserType.Vendor;
		formValues['vendor_id'] = vendorId;
		try {
			await dispatch(userAction.postData(formValues));
			setIsSubmitting(false);
			setShowButtonLoader(false);
			props.navigation.navigate('Counters', { 'vendorid': vendorId, token: 'refresh' });
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
					<Text style={styles.heading}>Add/Edit Counter</Text>
				</View>

				<MyTextInput name="name" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['name']} label="Contact Person Name" validationType={ValidationType.Required}
					autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} nextCtl="mobile" />

				<MyTextInput name="mobile" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['mobile']}
					label="Mobile" validationType={ValidationType.MobileRequired} keyboardType={KeyboardType.Number}
					autoCapitalize={CapitalizeType.None} maxLength={10} refs={formRefs} nextCtl="store_code" />

				<MyTextInput name="store_code" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['store_code']}
					label="Store Code" validationType={ValidationType.Required} keyboardType={KeyboardType.Number}
					autoCapitalize={CapitalizeType.None} maxLength={10} refs={formRefs} nextCtl="password" />

				<MyTextInput name="password" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['password']}
					label="Password" keyboardType={KeyboardType.Default} returnKeyType="next" refs={formRefs} nextCtl="email"
					maxLength={100} validationType={ValidationType.Required} />

				<MyTextInput name="email" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['email']}
					label="Email" keyboardType={KeyboardType.Email} autoCapitalize={CapitalizeType.None} returnKeyType="done"
					maxLength={50} refs={formRefs} nextCtl="gst_no" validationType={ValidationType.Email} />

				<MyPickerInput name="state_id" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['state_id']}
					label="State" pickerData={statesData} pickerId="id" pickerValue="name" validationType={ValidationType.Required}
					refs={formRefs} />

				<MyTextInput name="city" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['city']}
					label="City" keyboardType={KeyboardType.Default} returnKeyType="next" refs={formRefs} nextCtl="address"
					autoCapitalize={CapitalizeType.Words} maxLength={100} validationType={ValidationType.Required} />

				<MyTextInput name="address" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['address']}
					label="Address" keyboardType={KeyboardType.Default} returnKeyType="next" nextCtl="postal_code"
					autoCapitalize={CapitalizeType.Words} maxLength={200} validationType={ValidationType.Required} refs={formRefs} />

				<MyTextInput name="postal_code" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['postal_code']} label="Postal Code" validationType={ValidationType.NumberRequired}
					maxLength={6} refs={formRefs} returnKeyType="done" keyboardType={KeyboardType.Number} />

				<MyPickerInput name="logistic_manger_id" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['logistic_manger_id']} label="Logistic Manager" pickerData={managers} pickerId="id" pickerValue="name"
					validationType={ValidationType.Required} refs={formRefs} />

				<MyRadioInput name="is_active" value={formValues} initialValue={formValues['is_active'] == "1" ? "1" : "0"}
					label="Is Active ?" refs={formRefs} />

				<View style={styles.formFooter}>
					<SubmitButton title="Save" onPress={submitClickHandler} IsLoading={showButtonLoader} />
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


export default CounterEntryScreen;
