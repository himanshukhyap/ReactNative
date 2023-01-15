import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Alert, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-tiny-toast';

import { Ionicons } from '@expo/vector-icons';

import TableHeader from '../../components/TableHeader';
import TableData from '../../components/TableData';

import Colors from '../../constants/Colors';
import * as GlobalFunctions from '../../common/GlobalFunctions';
import Variables from '../../constants/Variables';
import * as Enums from '../../constants/Enums';

import SubmitButton from '../../components/form/SubmitButton';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';

import * as reportActions from '../../store/actions/report';
import * as downloadAction from '../../store/actions/download';

const CollectionByVendorsReport = props => {

    const [isLoading, setIsLoading] = useState(true);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const reportData = useSelector(state => state.report.vendorData);

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const dispatch = useDispatch();

    const downloadClickHandler = async () => {
        try {
            Toast.show('Downloading, wait...');
            const serverFileName = await dispatch(downloadAction.generateCollectionByVendorsExcel(formValues['date_from'], formValues['date_upto']));
            GlobalFunctions.downloadReport(serverFileName);
        } catch (err) {
            Alert.alert('Some Error Occurred !', err.message);
        }
    }

    const showDownloadIcon = () => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableWithoutFeedback onPress={downloadClickHandler}>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 4 }}>
                        <Ionicons name="md-download" size={26} color={Colors.white} />
                    </View>
                </TouchableWithoutFeedback>
            )
        });
    }


    useEffect(() => {
        
        showDownloadIcon();

        const getData = async () => {
            setIsLoading(true);
            try {
                formValues['date_from'] = moment().clone().startOf('month').format('DD-MMM-YYYY');
                formValues['date_upto'] = moment().clone().endOf('month').format('DD-MMM-YYYY');
                await dispatch(reportActions.getReportData('CollByVendor', formValues));
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
            await dispatch(reportActions.getReportData('CollByVendor', formValues));
        } catch (err) {
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
        setIsDataLoading(false);
        setIsSubmitting(false);
        setShowButtonLoader(false);
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
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

            <SubmitButton title="Show Data" style={{ alignSelf: 'center', marginVertical: 8 }} onPress={submitClickHandler}
                IsLoading={showButtonLoader} />

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
                    <TableHeader titles={['firm name', 'address', 'date', 'weight (kg)']}
                        alignments={['left', 'left', 'center', 'right']} />

                    <FlatList
                        data={reportData}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => (
                            <TableData data={item} fields={['firm_name', 'address', 'collection_date', 'actual_volume']}
                                alignments={['left', 'left', 'center', 'right']} index={index} />
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
    }
})


export default CollectionByVendorsReport;
