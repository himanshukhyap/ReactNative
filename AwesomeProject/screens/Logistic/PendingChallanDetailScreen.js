import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';
import Colors from '../../constants/Colors';
import DetailsViewer from '../../components/DetailsViewer';
import MyImageViewer from '../../components/MyImageViewer';
import MyTextInput from '../../components/form/MyTextInput';
import MyLabelAsInput from '../../components/form/MyLabelAsInput';
import MyPickerInput from '../../components/form/MyPickerInput';

import { ValidationType, KeyboardType } from '../../constants/Enums';

import GS from '../../common/GlobalStyles';
import * as GlobalFunctions from '../../common/GlobalFunctions';
import Variables from '../../constants/Variables';

import * as collectionrequestAction from '../../store/actions/collectionrequest';

const PendingChallanDetailScreen = props => {

	const { params } = props.route;
	const [isLoading, setIsLoading] = useState(true);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [unitChanged, setUnitChanged] = useState(false);

	const [formValues, setFormValues] = useState([]);
	const [formErrors, setFormErrors] = useState([]);
	const [formRefs, setFormRefs] = useState([]);

	const collectionrequestData = useSelector(state => state.collectionrequests.record);

	const dispatch = useDispatch();

	const fetchAllData = async (pkid) => {
		try {
			setIsLoading(true);
			await dispatch(collectionrequestAction.getData(pkid));
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	useEffect(() => {
		props.navigation.setOptions({ title: 'Pending Challan Details' });
		if (params && params.id) {
			fetchAllData(params.id);
		} else {
			props.navigation.navigate('PendingChallans1', { token: 'refresh' });
		}
	}, [dispatch]);

	useEffect(() => {
		if (collectionrequestData != null) {
			formValues['actual_volume'] = collectionrequestData.actual_volume;
			formValues['empty_drums_qty'] = collectionrequestData.empty_drums_qty;
			formValues['inKg'] = collectionrequestData.actual_volume;
			formValues['unit'] = '1';
		}
	}, [collectionrequestData]);


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

	const generateClickHandler = async () => {
		setIsSubmitting(true);
		setTimeout(() => {
			generateChallan();
		}, 50);
	}

	const generateChallan = async () => {
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

		formValues['actual_volume'] = formValues['inKg'];
		formValues['unit'] = 1;
		try {
			await dispatch(collectionrequestAction.generateChallan(params.id, formValues));
			Alert.alert('Challan Generated Successfully!', 'Challan has been generated & sent to email successfully', [{ text: 'Okay' }]);
			props.navigation.navigate('PendingChallans1', { token: 'refresh' });
		} catch (err) {
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
		
		setIsSubmitting(false);
		setShowButtonLoader(false);
	}

	const cancelClickHandler = () => {
		props.navigation.goBack();
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
				<DetailsViewer
					data={collectionrequestData}
					captions="Vendor,Address,Pickup Request Date,Completed At,Drums Quantity,Quantity (kg),Assigned To,Warehouse"
					keys="firm_name,address,request_date,actual_completion_datetime,actual_drums_qty,actual_volume,assigned_to_name,warehouse_name" />

				<MyImageViewer
					imageUri={GlobalFunctions.getGatePassImageUri(collectionrequestData.gate_pass)}
					noImageUri={GlobalFunctions.getImageUri(Variables.NoGatePassAvailableUrl)}
				/>

				<View style={{...GS.p10}}>

					<Text style={{ ...GS.textDanger, ...GS.bold }}>Change quantity if require</Text>

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
						refs={formRefs} returnKeyType="done" />

					<View style={GS.formFooter}>
						<SubmitButton title="Generate" onPress={generateClickHandler} IsLoading={showButtonLoader} />
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
		/*paddingLeft: 10,
		paddingRight: 10,*/
	},
	gatepass: {
		maxWidth: '100%',
		height: 200,
		maxHeight: 100
	}
})


export default PendingChallanDetailScreen;
