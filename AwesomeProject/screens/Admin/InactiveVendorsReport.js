import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Alert, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-tiny-toast';

import { Ionicons } from '@expo/vector-icons';

import TableHeader from '../../components/TableHeader';
import TableData from '../../components/TableData';
import MyPickerInput from '../../components/form/MyPickerInput';

import Colors from '../../constants/Colors';
import Variables from '../../constants/Variables';
import * as Enums from '../../constants/Enums';

import SubmitButton from '../../components/form/SubmitButton';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';

import * as GlobalFunctions from '../../common/GlobalFunctions';

import * as statesAction from '../../store/actions/states';
import * as reportActions from '../../store/actions/report';
import * as downloadAction from '../../store/actions/download';

const InactiveVendorsReport = props => {

    const [isLoading, setIsLoading] = useState(true);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reportData, setReportData] = useState([]);

    const statesData = useSelector(state => state.states.list);

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const dispatch = useDispatch();

    const downloadClickHandler = async () => {
        try {
            Toast.show('Downloading, wait...');
            const serverFileName = await dispatch(downloadAction.generateInactiveVendorsExcel(formValues['date_since'], formValues['state_id']));
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
                formValues['date_since'] = moment().clone().startOf('month').format('DD-MMM-YYYY');
                formValues['state_id'] = "0";
                await dispatch(statesAction.getData());
                const apiData = await dispatch(reportActions.getReportData('InactiveVendors', formValues));
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
            const apiData = await dispatch(reportActions.getReportData('InactiveVendors', formValues));
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
                    <MyDateTimePickerDialog mode="date" name="date_since" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['date_since']} label="Date Since" refs={formRefs} returnKeyType="done" noTopMargin={true} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 5 }}>
                    <MyPickerInput name="state_id" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['state_id']} label="State" refs={formRefs}
                        pickerData={statesData} pickerId="id" pickerValue="name" labelContainerStyle={{ marginTop: 2 }} />
                </View>
            </View>

            <View style={{ width: '100%', paddingHorizontal: 5, paddingTop: 5 }}>
                <SubmitButton title="Show Data" style={{ alignSelf: 'center', marginVertical: 8 }} onPress={submitClickHandler}
                    IsLoading={showButtonLoader} />
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
                    <TableHeader titles={['firm name', 'address', 'last date']}
                        alignments={['left', 'left', 'center']} sizes={[1, 1, 0.8]} />

                    <FlatList
                        data={reportData}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => (
                            <TableData index={index} data={item} fields={['firm_name', 'address', 'last_req_date']}
                                alignments={['left', 'left', 'center']} sizes={[1, 1, 0.8]} />
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


export default InactiveVendorsReport;
