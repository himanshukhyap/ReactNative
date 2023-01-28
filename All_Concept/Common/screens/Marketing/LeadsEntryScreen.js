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
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';
import { ValidationType, KeyboardType, CapitalizeType } from '../../constants/Enums';
import * as GlobalFunctions from '../../common/GlobalFunctions';

import * as signupAction from '../../store/actions/signup';
import * as firmtypesAction from '../../store/actions/firmtypes';
import * as statesAction from '../../store/actions/states';
import Variables from '../../constants/Variables';

const LeadsEntryScreen = props => {

	const { params } = props.route;
	const [isLoading, setIsLoading] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [id, setId] = useState(0);
	const [remarksOption, setRemarksOption] = useState(0);
	const [nextDate, setNextDate] = useState();

	const loginData = useSelector(state => state.login);
	const statesData = useSelector(state => state.states.list);
	const signupData = useSelector(state => state.signups.record);
	const firmtypesData = useSelector(state => state.firmtypes.list);

	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [formRefs, setFormRefs] = useState({});

	const dispatch = useDispatch();

	const fetchAllData = async (pkid) => {
		try {
			setIsLoading(true);
			await dispatch(firmtypesAction.getData());
			await dispatch(statesAction.getData());
			if (pkid > 0) {
				setId(pkid);
				await dispatch(signupAction.getData(pkid, loginData.UserId));
			}

			const dt = new Date();
			dt.setDate(dt.getDate() + 1);
			setNextDate(dt);

			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	useEffect(() => {

		props.navigation.setOptions({ title: 'Leads Entry' });

		if (params && params.id) {
			fetchAllData(params.id);
		} else {
			fetchAllData(0);
		}
	}, [dispatch]);


	useEffect(() => {
		if (signupData != null) {
			formValues['firm_name'] = signupData.firm_name;
			formValues['firm_type_id'] = signupData.firm_type_id;
			formValues['name'] = signupData.name;
			formValues['designation'] = signupData.designation;
			formValues['mobile'] = signupData.mobile;
			formValues['email'] = signupData.email;
			formValues['website'] = signupData.website;
			formValues['firm_type_id'] = signupData.firm_type_id;
			formValues['state_id'] = signupData.state_id;
			formValues['city'] = signupData.city;
			formValues['address'] = signupData.address;
			formValues['postal_code'] = signupData.postal_code;
			formValues['oil_quantity'] = signupData.oil_quantity;
			formValues['expected_rate'] = signupData.expected_rate;
			formValues['remarks_option'] = signupData.remarks_option;
			formValues['remarks'] = signupData.remarks;
			formValues['category'] = signupData.category;

			setRemarksOption(parseInt(signupData.remarks_option));

		}
	}, [signupData]);


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
				console.log(fe + ' - ' + formErrors[fe]);
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
		formValues['is_lead_entry'] = 1;
		if (parseInt(loginData.UserType) != 1) {
			formValues['entry_by'] = loginData.UserId;
		}

		if(remarksOption <= 4) {
			formValues['remarks'] = Variables.FollowupRemarksOptions.filter(x => x.id == remarksOption)[0].name;
		} 
		
		if(remarksOption != 4) {
			formValues['next_followup_date'] = '';
		}

		console.log(formValues);

		try {
			await dispatch(signupAction.postData(formValues, '0'));
			setIsSubmitting(false);
			setShowButtonLoader(false);
			props.navigation.navigate('Leads1', { token: 'refresh' });
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
					<Text style={styles.heading}>Add/Edit Lead</Text>
				</View>

				<MyTextInput name="firm_name" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['firm_name']}
					label="Firm Name" keyboardType={KeyboardType.Default} autoCapitalize={CapitalizeType.Words}
					maxLength={100} refs={formRefs} returnKeyType="next" nextCtl="name" validationType={ValidationType.Required} />

				<MyPickerInput name="firm_type_id" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['firm_type_id']} label="Firm Type" pickerData={firmtypesData} pickerId="id" pickerValue="name"
					validationType={ValidationType.Required} refs={formRefs} />

				<MyTextInput name="name" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['name']} label="Contact Person Name" validationType={ValidationType.Required}
					autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} nextCtl="designation" />

				<MyTextInput name="designation" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['designation']} label="Designation"
					autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} nextCtl="mobile" />

				<MyTextInput name="mobile" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['mobile']}
					label="Mobile" validationType={ValidationType.MobileRequired} keyboardType={KeyboardType.Number}
					autoCapitalize={CapitalizeType.None} maxLength={10} refs={formRefs} nextCtl="email" />

				<MyTextInput name="email" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['email']}
					label="Email" keyboardType={KeyboardType.Email} autoCapitalize={CapitalizeType.None} nextCtl="website"
					maxLength={50} refs={formRefs} validationType={ValidationType.Email} />

				<MyTextInput name="website" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['website']}
					label="Website" keyboardType={KeyboardType.Email} autoCapitalize={CapitalizeType.None} returnKeyType="done"
					maxLength={50} refs={formRefs} />

				<MyPickerInput name="state_id" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['state_id']} label="State" pickerData={statesData} pickerId="id" pickerValue="name"
					validationType={ValidationType.Required} refs={formRefs} />

				<MyTextInput name="city" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['city']}
					label="City" keyboardType={KeyboardType.Default} returnKeyType="next" refs={formRefs} nextCtl="address"
					autoCapitalize={CapitalizeType.Words} maxLength={100} validationType={ValidationType.Required} />

				<MyTextInput name="address" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['address']}
					label="Address" keyboardType={KeyboardType.Default} returnKeyType="next" nextCtl="postal_code"
					autoCapitalize={CapitalizeType.Words} maxLength={200} validationType={ValidationType.Required} refs={formRefs} />

				<MyTextInput name="postal_code" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['postal_code']} keyboardType={KeyboardType.Number} label="Postal Code"
					validationType={ValidationType.NumberRequired} maxLength={6} refs={formRefs} nextCtl="oil_quantity" />

				<MyTextInput name="oil_quantity" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['oil_quantity']} label="Oil Quantity" validationType={ValidationType.DecimalRequired}
					keyboardType={KeyboardType.Number} maxLength={10} refs={formRefs}
					nextCtl="expected_rate" />

				<MyTextInput name="expected_rate" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['expected_rate']} label="Expected Rate" validationType={ValidationType.DecimalRequired}
					keyboardType={KeyboardType.Number} maxLength={10} refs={formRefs} returnKeyType="done" />

				<MyPickerInput name="remarks_option" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['remarks_option']} label="Remarks" pickerData={Variables.FollowupRemarksOptions}
					validationType={ValidationType.Required} pickerId="id" pickerValue="name" refs={formRefs} 
					onValueChange={(val) => setRemarksOption(parseInt(val))} />

				{
					remarksOption == 4 &&
					<MyDateTimePickerDialog mode="datetime" name="next_followup_date" value={formValues} minimumDate={nextDate}
						error={formErrors} submitting={isSubmitting} initialValue={formValues['next_followup_date']}
						label="Followup Date Time" refs={formRefs} returnKeyType="done" validationType={ValidationType.Required} />
				}

				{
					remarksOption == 5 &&
					<MyTextInput name="remarks" value={formValues} error={formErrors} submitting={isSubmitting}
						initialValue={formValues['remarks']} label="Enter Remarks" keyboardType={KeyboardType.Default}
						multiline={true} numberOfLines={4} autoCapitalize={CapitalizeType.Sentences} maxLength={200}
						refs={formRefs} returnKeyType="done" validationType={ValidationType.Required} />
				}


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


export default LeadsEntryScreen;
