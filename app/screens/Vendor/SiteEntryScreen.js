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

import * as siteAction from '../../store/actions/site';
import * as statesAction from '../../store/actions/states';

let vendorId = 0;

const SiteEntryScreen = props => {

	const { params } = props.route;
	const [isLoading, setIsLoading] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [id, setId] = useState(0);

	const statesData = useSelector(state => state.states.list);
	const [siteData, setSiteData] = useState([]);

	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [formRefs, setFormRefs] = useState({});

	const dispatch = useDispatch();

	const getData = async (pkid) => {
		try {
			setIsLoading(true);
			await dispatch(statesAction.getData());

			if (pkid > 0) {
				setId(pkid);
				const apiData = await dispatch(siteAction.getData(pkid));
				setSiteData(apiData);

				if (apiData != null) {
					formValues['site_name'] = apiData.site_name;
					formValues['contact_name'] = apiData.contact_name;
					formValues['contact_mobile'] = apiData.contact_mobile;
					formValues['contact_email'] = apiData.contact_email;
					formValues['state_id'] = apiData.state_id;
					formValues['city'] = apiData.city;
					formValues['address'] = apiData.address;
					formValues['postal_code'] = apiData.postal_code;
					//formValues['is_active'] = siteData.is_active;
				}
			}

			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	useEffect(() => {
		if (params && params.id) {
			getData(params.id);
		} else {
			getData(0);
		}
	}, [dispatch, props]);


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
		try {
			await dispatch(siteAction.postData(formValues));
			setIsSubmitting(false);
			setShowButtonLoader(false);
			props.navigation.navigate('Sites1', { token: 'refresh' });
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
					<Text style={styles.heading}>Add/Edit Site</Text>
				</View>

				<MyTextInput name="site_name" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['site_name']} label="Site Name" validationType={ValidationType.Required}
					autoCapitalize={CapitalizeType.Words} maxLength={200} refs={formRefs} nextCtl="contact_name" />

				<MyTextInput name="contact_name" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['contact_name']} label="Contact Person Name" validationType={ValidationType.Required}
					autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} nextCtl="contact_mobile" />

				<MyTextInput name="contact_mobile" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['contact_mobile']}
					label="Contact Person Mobile" validationType={ValidationType.MobileRequired} keyboardType={KeyboardType.Number}
					autoCapitalize={CapitalizeType.None} maxLength={10} refs={formRefs} nextCtl="contact_email" />

				<MyTextInput name="contact_email" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['contact_email']}
					label="Contact Person Email" keyboardType={KeyboardType.Email} autoCapitalize={CapitalizeType.None} returnKeyType="done"
					maxLength={50} refs={formRefs} validationType={ValidationType.EmailRequired} />

				<MyPickerInput name="state_id" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['state_id']}
					label="State" pickerData={statesData} pickerId="id" pickerValue="name" refs={formRefs} />

				<MyTextInput name="city" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['city']}
					label="City" keyboardType={KeyboardType.Default} returnKeyType="next" refs={formRefs} nextCtl="address"
					autoCapitalize={CapitalizeType.Words} maxLength={100} />

				<MyTextInput name="address" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['address']}
					label="Address" keyboardType={KeyboardType.Default} returnKeyType="next" nextCtl="postal_code"
					autoCapitalize={CapitalizeType.Words} maxLength={200} refs={formRefs} />

				<MyTextInput name="postal_code" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['postal_code']} label="Postal Code" validationType={ValidationType.Number}
					maxLength={6} refs={formRefs} returnKeyType="done" keyboardType={KeyboardType.Number} />

				{/* <MyRadioInput name="is_active" value={formValues} initialValue={formValues['is_active'] == "1" ? "1" : "0"}
					label="Is Active ?" refs={formRefs} /> */}

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


export default SiteEntryScreen;
