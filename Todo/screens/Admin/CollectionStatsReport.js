import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import TableHeader from '../../components/TableHeader';
import TableData from '../../components/TableData';
import MyPickerInput from '../../components/form/MyPickerInput';

import Colors from '../../constants/Colors';
import Variables from '../../constants/Variables';
import * as Enums from '../../constants/Enums';
import * as reportActions from '../../store/actions/report';

import SubmitButton from '../../components/form/SubmitButton';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';

const CollectionStatsReport = props => {

    const [isLoading, setIsLoading] = useState(true);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const reportData = useSelector(state => state.report.statsData);

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                formValues['date_from'] = moment().clone().startOf('month').format('DD-MMM-YYYY');
                formValues['date_upto'] = moment().clone().endOf('month').format('DD-MMM-YYYY');
                formValues['stats_type'] = Variables.CollectionStatsOptions[0].id.toString();

                await dispatch(reportActions.getReportData('stats', formValues));
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
            await dispatch(reportActions.getReportData('stats', formValues));
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
                    <MyPickerInput name="stats_type" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['stats_type']} label="Report By" pickerData={Variables.CollectionStatsOptions}
                        pickerId="id" pickerValue="name" refs={formRefs} showSelectOption={false} />
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
                    <TableHeader titles={[Enums.CollectionStatsTitles[formValues['stats_type']], 'weight (kg)']} alignments={['left', 'right']} />

                    <FlatList
                        data={reportData}
                        keyExtractor={item => item.group_by}
                        renderItem={({ item, index }) => (
                            <TableData data={item} fields={['group_by', 'weight']} alignments={['left', 'right']} index={index} />
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


export default CollectionStatsReport;
