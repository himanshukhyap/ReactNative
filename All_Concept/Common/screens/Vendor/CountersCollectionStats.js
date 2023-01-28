import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import TableHeader from '../../components/TableHeader';
import TableData from '../../components/TableData';
import MyTextInput from '../../components/form/MyTextInput';
import { ValidationType, KeyboardType, CapitalizeType } from '../../constants/Enums';

import Colors from '../../constants/Colors';
import Variables from '../../constants/Variables';
import * as Enums from '../../constants/Enums';
import * as reportActions from '../../store/actions/report';

import SubmitButton from '../../components/form/SubmitButton';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';

const CountersCollectionStats = props => {

	const [isLoading, setIsLoading] = useState(true);
	const [isDataLoading, setIsDataLoading] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [formRefs, setFormRefs] = useState({});

	const [reportData, setReportData] = useState([]);
	const [address, setAddress] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				formValues['date_from'] = moment().clone().startOf('month').format('DD-MMM-YYYY');
				formValues['date_upto'] = moment().clone().format('DD-MMM-YYYY');
				formValues['address'] = '';

				const apiData = await dispatch(reportActions.getReportData('CollectionByCounters', formValues));
				setReportData(apiData);

				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
			}
		}
		getData();
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
		setShowButtonLoader(true);
		setIsDataLoading(true);

		try {
			const apiData = await dispatch(reportActions.getReportData('CollectionByCounters', formValues));
			setReportData(apiData);
		} catch (err) {
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}

		setIsDataLoading(false);
		setIsSubmitting(false);
		setShowButtonLoader(false);
	}

	return (
		<View style={styles.container}>

			<View style={{ flexDirection: 'row' }}>
				<View style={{ flex: 1, paddingHorizontal: 5 }}>
					<MyDateTimePickerDialog mode="date" name="date_from" value={formValues} error={formErrors} submitting={isSubmitting}
						initialValue={formValues['date_from']} label="Date From" refs={formRefs} returnKeyType="done" noTopMargin={true} />
				</View>
				<View style={{ flex: 1, paddingHorizontal: 5 }}>
					<MyDateTimePickerDialog mode="date" name="date_upto" value={formValues} error={formErrors} submitting={isSubmitting}
						initialValue={formValues['date_upto']} label="Date Upto" refs={formRefs} returnKeyType="done" noTopMargin={true} />
				</View>
			</View>

			<SubmitButton title="Show Data" style={{ alignSelf: 'center', marginTop: 8 }} onPress={submitClickHandler}
				IsLoading={showButtonLoader} />

			{
				reportData.length > 0 &&
				<View style={{ paddingHorizontal: 5 }}>
					<MyTextInput name="address" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['address']}
						label="Filter By Address" keyboardType={KeyboardType.Default} returnKeyType="done" OnTextChanged={(val) => setAddress(val)}
						autoCapitalize={CapitalizeType.Words} maxLength={200} refs={formRefs} />
				</View>
			}

			{
				isDataLoading &&
				<View style={styles.centered}>
					<ActivityIndicator size="large" color={Colors.primary} />
				</View>
			}
			{
				!isDataLoading && reportData.length == 0 &&
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Image source={require('../../assets/no_record_found.png')} />
				</View>
			}
			{
				!isDataLoading && reportData.length > 0 &&
				<>
					<TableHeader titles={['Date', 'Address', 'Weight (kg)']} alignments={['left', 'left', 'right']} sizes={[1, 2, 0.9]} />

					<FlatList
						data={reportData.filter(x => x.address.toLowerCase().indexOf(address.toLowerCase(), 0) > -1)}
						keyExtractor={item => item.id}
						renderItem={({ item, index }) => (
							<TableData data={item} fields={['pickup_date', 'address', 'weight']} alignments={['left', 'left', 'right']} index={index} sizes={[1, 2, 0.9]} />
						)}
					/>
				</>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1
	},
})


export default CountersCollectionStats;
