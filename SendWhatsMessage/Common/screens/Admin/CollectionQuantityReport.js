import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import TableHeader from '../../components/TableHeader';
import TableData from '../../components/TableData';
import MyPickerInput from '../../components/form/MyPickerInput';

import Colors from '../../constants/Colors';
import Variables from '../../constants/Variables';
import { UserType } from '../../constants/Enums';

import SubmitButton from '../../components/form/SubmitButton';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';

import * as reportActions from '../../store/actions/report';
import * as userAction from '../../store/actions/user';

const CollectionQuantityReport = props => {

    const [isLoading, setIsLoading] = useState(true);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

	const [users, setUsers] = useState();
    const [reportData, setReportData] = useState([]);

    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [formRefs, setFormRefs] = useState({});

	const[dataTitles, setDataTitles] = useState(['Name', 'Quantity (Kg)']);
	const[dataFields, setDataFields] = useState(['name', 'quantity']);
	const[alignments, setAlignments] = useState(['left', 'right']);

    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {

            setIsLoading(true);

            try {
                formValues['date_from'] = moment().clone().startOf('month').format('DD-MMM-YYYY');
                formValues['date_upto'] = moment().clone().endOf('month').format('DD-MMM-YYYY');
                formValues['user_id'] = '0';

				const usersData = await dispatch(userAction.getByType(UserType.PDA));
				setUsers(usersData);

                const apiData = await dispatch(reportActions.getReportData('CollectionQuantity', formValues));
				setReportData(apiData.data);

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
			if(formValues['user_id'] == '0') {
				setDataTitles(['Name', 'Quantity (Kg)']);
				setDataFields(['name', 'quantity']);
			} else {
				setDataTitles(['Pickup Date', 'Quantity (Kg)']);
				setDataFields(['pickup_date', 'quantity']);
			}
            const apiData = await dispatch(reportActions.getReportData('CollectionQuantity', formValues));
			setReportData(apiData.data);
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

            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingHorizontal: 5 }}>
                    <MyPickerInput name="user_id" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['user_id']} label="PDA" firstItemTitle="All PDAs" pickerData={users}
                        pickerId="id" pickerValue="name" refs={formRefs} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 5, paddingTop: 25 }}>
                    <SubmitButton title="Show Data" style={{ alignSelf: 'center', marginVertical: 8 }} onPress={submitClickHandler}
                        IsLoading={showButtonLoader} />
                </View>
            </View>

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
                    <TableHeader titles={dataTitles} alignments={['left', 'right']} />

                    <FlatList
                        data={reportData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TableData data={item} fields={dataFields} alignments={['left', 'right']} index={index} />
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


export default CollectionQuantityReport;
