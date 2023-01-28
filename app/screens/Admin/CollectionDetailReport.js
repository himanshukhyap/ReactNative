import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Alert, ScrollView } from 'react-native';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import TableHeaderFix from '../../components/TableHeaderFix';
import TableDataFix from '../../components/TableDataFix';
import TableData from '../../components/TableData';
import MyPickerInput from '../../components/form/MyPickerInput';
import MyTextInput from '../../components/form/MyTextInput';

import Colors from '../../constants/Colors';
import Variables from '../../constants/Variables';
import * as reportActions from '../../store/actions/report';
import * as collectionRequestAction from '../../store/actions/collectionrequest';
import { ValidationType, KeyboardType, CapitalizeType, UserType, RequestStatus, FileType } from '../../constants/Enums';

import SubmitButton from '../../components/form/SubmitButton';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';

const CollectionDetailReport = props => {

    const [isLoading, setIsLoading] = useState(true);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [selectedRowNo, setSelectedRowNo] = useState(-1);

    const reportData = useSelector(state => state.report.collData);

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
                formValues['request_status'] = '0';
                formValues['firm_or_address'] = '';
                await dispatch(reportActions.getReportData('CollDetail', formValues));
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
        setSelectedRowNo(-1);
        try {
            await dispatch(reportActions.getReportData('CollDetail', formValues));
        } catch (err) {
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
        setIsDataLoading(false);
        setIsSubmitting(false);
        setShowButtonLoader(false);
    }

    const selectDeselectRow = (index) => {
        if (selectedRowNo == index) {
            setSelectedRowNo(-1);
        } else {
            setSelectedRowNo(index);
        }
    }

	const viewGatePassClickHandler = gate_pass => {
		props.navigation.navigate('GatePassViewer', { 'gate_pass': gate_pass });
	}

    const editClickHandler = id => {
        props.navigation.navigate('CollectionEntry', { 'id': id });
    }

    const deleteClickHandler = id => {
        Alert.alert(
            'Deleting This Request ?',
            'Are you sure you want to delete this request ?\n\nDeleting this will delete related Inward entry also (if any)..',
            [
                { text: 'No', onPress: () => { } },
                { text: 'Yes', onPress: () => { deleteRecord(id); } },
            ],
            {
                cancelable: true
            }
        );
    }

    const deleteRecord = async (id) => {
        setShowButtonLoader(true);
        setIsDataLoading(true);
        setSelectedRowNo(-1);
        try {
            await dispatch(collectionRequestAction.deleteData(id));
            await dispatch(reportActions.getReportData('CollDetail', formValues));
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
                        initialValue={formValues['date_from']} label="Req/Comp Date From" refs={formRefs} returnKeyType="done" noTopMargin={true} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 5 }}>
                    <MyDateTimePickerDialog mode="date" name="date_upto" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['date_upto']} label="Req/Comp Date Upto" refs={formRefs} returnKeyType="done" noTopMargin={true} />
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingHorizontal: 5 }}>
                    <MyPickerInput name="request_status" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['request_status']} label="Request Status" pickerData={Variables.RequestStatusOptions}
                        pickerId="id" pickerValue="name" refs={formRefs} showSelectOption={false} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 5 }}>
                    <MyTextInput name="firm_or_address" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['firm_or_address']} label="Firm Name/Address" keyboardType={KeyboardType.Default} 
                        refs={formRefs} placeholder="Can enter 2-3 characters" />
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
                <ScrollView horizontal={true}>
                    <View>
                        <TableHeaderFix titles={['req. date', 'comp. date', 'firm name', 'address', 'assigned to', 'logistic manager', 'transporter',
                            'warehouse', 'drum qty', 'weight', 'status', 'gate pass', 'edit', 'delete']}
                            sizes={[0.9, 0.9, 2, 2, 1, 1.3, 1, 1, 0.8, 0.8, 1, 0.8, 0.5, 0.5]}
                            alignments={['center', 'center', 'left', 'left', 'left', 'left', 'left', 'left', 'right', 'right', 
                                        'center', 'center', 'center', 'center']} />

                        <FlatList
                            data={reportData}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => (
                                <TouchableWithoutFeedback onPress={() => { selectDeselectRow(index) }}>
                                    <View style={index == selectedRowNo ? styles.highlight : index % 2 == 0 ? styles.even : styles.odd}>
                                        <TableDataFix data={item} fields={['request_date', 'completion_date', 'firm_name', 'address', 'assigned_to',
                                            'logistic_manager', 'transporter', 'warehouse_name', 'actual_drums_qty', 'actual_volume', 'request_status',
                                            'gate_pass', 'EDITRECORD', 'DELETERECORD']}
                                            alignments={['center', 'center', 'left', 'left', 'left', 'left', 'left', 'left', 'right', 'right', 'center',
                                                        'center', 'center', 'center']}
                                            index={index} sizes={[0.9, 0.9, 2, 2, 1, 1.3, 1, 1, 0.8, 0.8, 1, 0.8, 0.5, 0.5]}
                                            onViewGatePass={() => { viewGatePassClickHandler(item.gate_pass) }} 
											onEditPress={() => { editClickHandler(item.id) }}
                                            onDeletePress={() => { deleteClickHandler(item.id) }} />
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                        />
                    </View>
                </ScrollView>
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
    highlight: {
        backgroundColor: Colors.gray,
        borderBottomColor: Colors.offWhite,
        borderBottomWidth: 1
    },
    odd: {
        backgroundColor: Colors.white2,
        borderBottomColor: Colors.offWhite,
        borderBottomWidth: 1
    },
    even: {
        backgroundColor: Colors.white1,
        borderBottomColor: Colors.offWhite,
        borderBottomWidth: 1
    },
})


export default CollectionDetailReport;
