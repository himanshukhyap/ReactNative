import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Alert, Text, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-tiny-toast';

import { Ionicons } from '@expo/vector-icons';

import CardData from '../../components/CardData';
import MyPickerInput from '../../components/form/MyPickerInput';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';

import Colors from '../../constants/Colors';
import { ActionIcons, ActionIconColors, RequestStatus } from '../../constants/Enums';
import * as GlobalFunctions from '../../common/GlobalFunctions';

import * as collectionRequestAction from '../../store/actions/collectionrequest';
import * as statesAction from '../../store/actions/states';
import * as downloadAction from '../../store/actions/download';

const CollectionRequestsScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [loginUserId, setLoginUserId] = useState(0);

    const statesData = useSelector(state => state.states.list);
    const collectionrequests = useSelector(state => state.collectionrequests.list);
    const loggedInUser = useSelector(state => state.login);

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const dispatch = useDispatch();

    const downloadClickHandler = async () => {
        try {
            Toast.show('Downloading, wait...');
            const serverFileName = await dispatch(downloadAction.generatePendingCollectionsExcel());
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

        props.navigation.setOptions({ title: 'Pending Collections' });

        const getData = async () => {
            setIsLoading(true);
            try {
                const today = moment().format('DD-MMM-YYYY');
                await dispatch(statesAction.getData());
                await dispatch(collectionRequestAction.getData(0, 0, -1)); //0, 0, loggedInUser.UserId, 0, 0, 0, today, today));

                formValues['state_id'] = "0";
                formValues['date_from'] = today;
                formValues['date_upto'] = today;

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

    /*if (collectionrequests.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/no_record_found.png')} />
            </View>
        );
    }*/

    const editClickHandler = id => {
        let data = collectionrequests.filter((x) => x.id == id);
        if (data[0]['request_status'] == RequestStatus.Pending || data[0]['request_status'] == RequestStatus.InProcess) {
            props.navigation.navigate('CollectionRequestEntry', { 'id': data[0].id });
        }
        else {
            Alert.alert('Can\'t be edited', 'Only Pending or InProcess requests can be edited');
        }
    }

    const viewClickHandler = id => {
        let data = collectionrequests.filter((x) => x.id == id);
        if (data.length > 0) {
            props.navigation.navigate('CollectionRequestDetail', { 'id': data[0].id });
        }
    }

    const scheduleClickHandler = id => {
        let data = collectionrequests.filter((x) => x.id == id);
        if (data.length > 0) {
            props.navigation.navigate('Schedule', { 'id': data[0].id });
        }
    }

    const getFilteredData = async () => {
        setIsLoading(true);
        try {
            await dispatch(collectionRequestAction.getData(0, 0, loggedInUser.UserId, 0, 0, formValues['state_id'], formValues['date_from'], formValues['date_upto']));
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    return (
        <View style={styles.container}>

            {/* <View style={styles.filterMain}>
                <View style={styles.filterChild}>

                    <Text style={styles.label}>Filter By State</Text>
                    <MyPickerInput name="state_id" label="State" firstItemTitle="Show For All States" hideLabel={true} pickerData={statesData}
                        pickerId="id" pickerValue="name" onValueChange={getFilteredData} value={formValues} error={formErrors} refs={formRefs}
                        initialValue={formValues['state_id']} />

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, paddingRight: 1 }}>
                            <MyDateTimePickerDialog mode="date" name="date_from" value={formValues} error={formErrors} onDateChange={getFilteredData}
                                initialValue={formValues['date_from']} label="Date From" refs={formRefs} returnKeyType="done" />
                        </View>
                        <View style={{ flex: 1, paddingLeft: 1 }}>
                            <MyDateTimePickerDialog mode="date" name="date_upto" value={formValues} error={formErrors} onDateChange={getFilteredData}
                                initialValue={formValues['date_upto']} label="Date Upto" refs={formRefs} returnKeyType="done" />
                        </View>
                    </View>

                </View>
            </View> */}

            {
                collectionrequests.length === 0 &&
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/no_record_found.png')} />
                </View>
            }

            {
                collectionrequests.length > 0 &&
                <FlatList
                    data={collectionrequests}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => (
                        <CardData
                            index={index}
                            data={item}
                            titles={['vendor', 'contact person', 'address', 'city', 'mobile', 'pickup request date', 'security code', 'Status']}
                            fields={['firm_name', 'vendor', 'address', 'city_only', 'vendor_mobile', 'request_date', 'security_code', 'request_status_name']}
                            hasActions={false}
                            actions={[editClickHandler, viewClickHandler, scheduleClickHandler]}
                            actionIcons={[ActionIcons.Assignment, ActionIcons.View, ActionIcons.Schedule]}
                            actionIconColors={[ActionIconColors.Assignment, ActionIconColors.View, ActionIconColors.Schedule]}
                        />
                    )}
                />
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
    list: {
        marginHorizontal: 2,
        borderLeftColor: Colors.offWhite,
        borderLeftWidth: 1,
        borderRightColor: Colors.offWhite,
        borderRightWidth: 1
    },
    label: {
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
        fontSize: 15,
    },
    filterMain: {
        overflow: 'hidden',
        paddingBottom: 5,
    },
    filterChild: {
        backgroundColor: Colors.white1,
        height: 135,
        padding: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 1, height: 1, },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
})

export default CollectionRequestsScreen;
