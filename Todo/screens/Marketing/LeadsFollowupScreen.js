import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderRight from '../../navigation/HeaderRight';
import Colors from '../../constants/Colors';
import Variables from '../../constants/Variables';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';

import MyRadioInput from '../../components/form/MyRadioInput';
import MyTextInput from '../../components/form/MyTextInput';
import MyPickerInput from '../../components/form/MyPickerInput';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';
import { ValidationType, KeyboardType, CapitalizeType, ActionIcons, ActionIconColors } from '../../constants/Enums';

import DetailsViewer from '../../components/DetailsViewer';
import CardData from '../../components/CardData';

import * as GlobalFunctions from '../../common/GlobalFunctions';

import * as signupAction from '../../store/actions/signup';

const LeadsFollowupScreen = props => {

	const { params } = props.route;

	const [isLoading, setIsLoading] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [leadId, setLeadId] = useState(0);
	const [id, setId] = useState(0);
	const [remarksOption, setRemarksOption] = useState(0);

	const [followps, setFollowups] = useState([]);
	const [leadData, setLeadData] = useState(0);
	const [followupRequire, setFollowupRequire] = useState(-1);

	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [formRefs, setFormRefs] = useState({});

	const [nextDate, setNextDate] = useState();

	const dispatch = useDispatch();

	const fetchAllData = async (lead_id) => {
		try {
			setIsLoading(true);
			if (lead_id > 0) {
				setLeadId(lead_id);
				const apiData = await dispatch(signupAction.getFollowupDetails(lead_id));
				setFollowups(apiData.followups);
				setLeadData(apiData.leadData);

				const dt = new Date();
				dt.setDate(dt.getDate() + 1);
				setNextDate(dt);

			}
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	useEffect(() => {
		props.navigation.setOptions({ title: 'Lead Followup' });
		if (params && params.lead_id) {
			fetchAllData(params.lead_id);
		}
	}, [dispatch, props]);

	const cancelClickHandler = navData => {
		if (id > 0) {
			setId(0);
			formValues['next_date'] = '';
			formValues['remarks'] = '';
		} else {
			props.navigation.goBack();
		}
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

		formValues['lead_id'] = leadId;
		formValues['followup_require'] = followupRequire;
		if (remarksOption <= 3) {
			formValues['remarks'] = Variables.FollowupRemarksOptions.filter(x => x.id == remarksOption)[0].name;
		}
		try {
			await dispatch(signupAction.saveFollowupDetails(formValues));
			setIsSubmitting(false);
			setShowButtonLoader(false);
			if (followupRequire == 0) {
				GlobalFunctions.showMessage('Saved Successfully', 'No more followup information can be saved now for this lead', redirectToLeads);
			} else {
				GlobalFunctions.showMessage('Saved Successfully', 'Followup information saved successfully, you will be reminded on the saved date', redirectToLeads);
			}
		} catch (err) {
			setShowButtonLoader(false);
			setIsSubmitting(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}

	}

	const redirectToLeads = () => {
		props.navigation.navigate('Leads1', { token: 'refresh' });
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	const editClickHandler = id => {
		let data = followps.filter((x) => x.id == id);
		if (data.length > 0) {
			setIsLoading(true);

			formValues['next_date'] = data[0].next_date;
			formValues['remarks'] = data[0].remarks;

			setId(id);

			setTimeout(() => {
				setIsLoading(false);
			}, 100);
		}
	}

	const deleteClickHandler = id => {

	}

	const renderFollowups = () => {
		let items = [];

		followps.map((item, index) => {
			let fData = [];
			fData['id'] = item.id;
			fData['next_date'] = item.next_date == '' || item.next_date == null ? '-NA-' : item.next_date;
			fData['remarks'] = item.remarks;
			fData['entry_date'] = item.entry_date;
			fData['followup_remarks'] = item.followup_remarks;

			items.push(
				<CardData
					key={fData.id}
					index={index}
					data={fData}
					fullWidth={true}
					titles={['followup date', 'entry date', 'remarks']}
					fields={['next_date', 'entry_date', 'remarks']}
					hasActions={false}
					actions={[editClickHandler, deleteClickHandler]}
					actionIcons={[ActionIcons.Edit, ActionIcons.Delete]}
					actionIconColors={[ActionIconColors.Edit, ActionIconColors.Delete]}
				/>
			);
		})

		return items;
	}

	return (
		<ScrollView keyboardShouldPersistTaps="handled">
			<View>

				{
					leadData.followup_require == "1" && followps.length > 0 &&
					<View style={styles.container}>

						<MyRadioInput name="followup_require" value={formValues} error={formErrors} initialValue={undefined}
							validationType={ValidationType.Required} submitting={isSubmitting} label="Require Followup Again ?" refs={formRefs}
							onPress={(status) => { setFollowupRequire(parseInt(status)) }} />

						{
							followupRequire != -1 &&
							<MyPickerInput name="remarks_option" value={formValues} error={formErrors} submitting={isSubmitting}
								initialValue={formValues['remarks_option']} label="Remarks" validationType={ValidationType.Required}
								pickerData={Variables.FollowupRemarksOptions.filter(x => (followupRequire == 1 && x.id == 4) || (followupRequire != '1' && x.id != 4))}
								pickerId="id" pickerValue="name" refs={formRefs} onValueChange={(val) => setRemarksOption(parseInt(val))} />
						}

						{
							remarksOption == 4 &&
							<MyDateTimePickerDialog mode="datetime" name="next_date" value={formValues} minimumDate={nextDate}
								error={formErrors} submitting={isSubmitting} initialValue={formValues['next_date']}
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
				}

				{/* {
					(followupRequire == 1 || followps.length == 0) &&
					<View style={styles.container}>

						<MyPickerInput name="remarks_option" value={formValues} error={formErrors} submitting={isSubmitting}
							initialValue={formValues['remarks_option']} label="Remarks" pickerData={Variables.FollowupRemarksOptions}
							pickerId="id" pickerValue="name" refs={formRefs} onValueChange={(val) => setRemarksOption(parseInt(val))} />

						{
							remarksOption == 3 &&
							<MyDateTimePickerDialog mode="datetime" name="next_date" value={formValues} minimumDate={nextDate}
								error={formErrors} submitting={isSubmitting} initialValue={formValues['next_date']}
								label="Followup Date Time" refs={formRefs} returnKeyType="done" validationType={ValidationType.Required} />
						}

						{
							remarksOption == 4 &&
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
				} */}

				{
					followps.length > 0 &&
					<>
						<View style={styles.formHeader}>
							<Text style={styles.heading}>Followup History</Text>
						</View>
						{renderFollowups()}
					</>
				}

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


export default LeadsFollowupScreen;
