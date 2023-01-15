import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderRight from '../../navigation/HeaderRight';
import Colors from '../../constants/Colors';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';

import MyTextInput from '../../components/form/MyTextInput';
import MyPickerInput from '../../components/form/MyPickerInput';
import { ValidationType, KeyboardType, CapitalizeType } from '../../constants/Enums';
import Variables from '../../constants/Variables';
import * as GlobalFunctions from '../../common/GlobalFunctions';

import * as collectionrequestAction from '../../store/actions/collectionrequest';

const CollectionRequestEntryScreen = props => {

	const { params } = props.route;
	const [isLoading, setIsLoading] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [id, setId] = useState(0);

	const collectionrequestData = useSelector(state => state.collectionrequests.record);

	const [formValues, setFormValues] = useState([]);
	const [formErrors, setFormErrors] = useState([]);
	const [formRefs, setFormRefs] = useState([]);

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
			formValues['entered_drums_qty'] = collectionrequestData.entered_drums_qty;
			formValues['entered_volume'] = collectionrequestData.entered_volume;
			formValues['empty_drums_qty'] = collectionrequestData.empty_drums_qty;
			formValues['notes_for_team'] = collectionrequestData.notes_for_team;
		}
	}, [collectionrequestData]);


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
			<View style={styles.container}>
				<View style={styles.formHeader}>
					<Text style={styles.heading}>Add/Edit Collection Request</Text>
				</View>

				<MyTextInput name="entered_drums_qty" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['entered_drums_qty']} label="Filled Drums Quantity"
					keyboardType={KeyboardType.Number} validationType={ValidationType.NumberRequired}
					maxLength={3} refs={formRefs} nextCtl="entered_volume" />

				<MyTextInput name="entered_volume" value={formValues} error={formErrors} submitting={isSubmitting}
					initialValue={formValues['entered_volume']} label="Total Quantity (kg)" validationType={ValidationType.DecimalRequired}
					keyboardType={KeyboardType.Number} maxLength={8} refs={formRefs}
					nextCtl="empty_drums_qty" />

				<MyTextInput name="empty_drums_qty" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['empty_drums_qty']}
					label="Empty Drums Required" validationType={ValidationType.Number} keyboardType={KeyboardType.Number}
					maxLength={3} refs={formRefs} nextCtl="notes_for_team" />

				<MyTextInput name="notes_for_team" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['notes_for_team']}
					label="Additional Info" keyboardType={KeyboardType.Default} multiline={true} numberOfLines={4}
					autoCapitalize={CapitalizeType.Sentences} maxLength={200} refs={formRefs} returnKeyType="done" />


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


export default CollectionRequestEntryScreen;
