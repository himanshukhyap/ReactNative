import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ActivityIndicator, FlatList, Alert, ScrollView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import { ValidationType, FileType, CapitalizeType, CertificateOrLicense } from '../../constants/Enums';
import MyFilePicker from '../../components/form/MyFilePicker';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';

import Variables from '../../constants/Variables';
import * as GlobalFunctions from '../../common/GlobalFunctions';
import Colors from '../../constants/Colors';
import GS from '../../common/GlobalStyles';

import * as siteAction from '../../store/actions/site';

const CompDatesScreen = props => {

	const { params } = props.route;

	const [isLoading, setIsLoading] = useState(true);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [pkId, setPkId] = useState(0);
	const [CorLType, setCorLType] = useState();
	const [CorLId, setCorLId] = useState(0);
	const [CorLName, setCorLName] = useState('');

	const [vendorSiteId, setVendorSiteId] = useState(0);

	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [formRefs, setFormRefs] = useState({});

	const dispatch = useDispatch();

	/*const getData = async (vendor_site_id) => {
		setIsLoading(true);
		try {
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}*/

	useEffect(() => {
		if (params.type == CertificateOrLicense.Certificate) {
			props.navigation.setOptions({ title: 'Update Certificate Validity' });
			setCorLId(params.CorL.certificate_id);
			setCorLName(params.CorL.certificate_name);
		} else {
			props.navigation.setOptions({ title: 'Update License Validity' });
			setCorLId(params.CorL.license_id);
			setCorLName(params.CorL.license_name);
		}

		setIsLoading(true);
		setCorLType(params.type);
		setVendorSiteId(params.vendor_site_id);
		setPkId(params.CorL.id);
		
		if (params.CorL.start_date != '') {
			formValues['start_date'] = params.CorL.start_date;
			formValues['expiry_date'] = params.CorL.expiry_date;
		}

		setIsLoading(false);
		//getData(params.vendor_site_id);
	}, [dispatch, props]);


	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
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

		formValues['id'] = pkId;
		formValues['vendor_site_id'] = vendorSiteId;
		formValues['CorLType'] = CorLType;
		if (CorLType == CertificateOrLicense.Certificate) {
			formValues['certificate_id'] = CorLId;
		} else {
			formValues['license_id'] = CorLId;
		}

		try {
			await dispatch(siteAction.submitDates(formValues));
			setIsSubmitting(false);
			setShowButtonLoader(false);
			props.navigation.navigate('CompList', { 'vendor_site_id': vendorSiteId, 'type': CorLType });
		} catch (err) {
			setShowButtonLoader(false);
			setIsSubmitting(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	const cancelClickHandler = () => {
		//props.navigation.goBack();
		props.navigation.navigate('CompList', { 'vendor_site_id': vendorSiteId, 'type': CorLType });
	}

	return (
		<ScrollView keyboardShouldPersistTaps="handled">
			<View style={styles.container}>
				<View style={styles.formHeader}>
					<Text style={styles.heading}>{CorLName}</Text>
				</View>

				<MyDateTimePickerDialog mode="date" name="start_date" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['start_date']} label="Valid From" refs={formRefs} returnKeyType="done" validationType={ValidationType.Required} />

				<MyDateTimePickerDialog mode="date" name="expiry_date" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['expiry_date']} label="Valid Upto" refs={formRefs} returnKeyType="done" validationType={ValidationType.Required} />

				<View style={GS.formFooter}>
					<SubmitButton title="Save" onPress={submitClickHandler} IsLoading={showButtonLoader} />
					<CancelButton title="Cancel" onPress={cancelClickHandler} />
				</View>

			</View>
		</ScrollView >
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
		padding: 5,
		marginTop: 5
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
		paddingBottom: 5,
	},
	filterChild: {
		backgroundColor: Colors.white1,
		height: 65,
		padding: 5,
		shadowColor: Colors.black,
		shadowOffset: { width: 1, height: 1, },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
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
})

export default CompDatesScreen;
