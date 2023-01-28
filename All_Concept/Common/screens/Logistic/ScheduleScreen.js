import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderRight from '../../navigation/HeaderRight';
import Colors from '../../constants/Colors';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';

import MyTextInput from '../../components/form/MyTextInput';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';
import { ValidationType, KeyboardType, CapitalizeType, RequestStatus } from '../../constants/Enums';

import * as collectionrequestAction from '../../store/actions/collectionrequest';

import DetailsViewer from '../../components/DetailsViewer';
import * as GlobalFunctions from '../../common/GlobalFunctions';

const ScheduleScreen = props => {

    const { params } = props.route;
    const [isLoading, setIsLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [id, setId] = useState(0);
    const [logs, setLogs] = useState('');

    const collectionrequestData = useSelector(state => state.collectionrequests.record);
    const loggedInUser = useSelector(state => state.login);

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

        props.navigation.setOptions({ title: 'Reschedule Request' });

        if (params && params.id) {
            fetchAllData(params.id);
        }
    }, [dispatch]);


    useEffect(() => {
        if (collectionrequestData != null) {
            setLogs(collectionrequestData.reschedule_logs);
            formValues['max_completion_datetime']  = collectionrequestData.max_completion_datetime;
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
        formValues['rescheduled'] = 1;
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

    const _renderLog = () => {
        let items = [];
        let arrLogs = logs.split(';');

        for (let i = 0; i < arrLogs.length; i++) {
            const dataParts = arrLogs[i].split(',');
            if (dataParts.length < 2) continue;

            let logData = [];
            logData['completion_time'] = dataParts[0].split(':')[1] + ':' + dataParts[0].split(':')[2];
            logData['rescheduled_to'] = dataParts[1].split(':')[1] + ':' + dataParts[1].split(':')[2];
            logData['remarks'] = dataParts[2].split(':')[1];

            items.push(<DetailsViewer
                style={{ marginVertical: 15 }}
                data={logData}
                key={i.toString()}
                captions="Estimated Pickup Time,Rescheduled To,Remarks"
                keys="completion_time,rescheduled_to,remarks" />);
        }

        return items;
    }

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            <View>

                <View style={styles.container}>

                    <MyDateTimePickerDialog mode="datetime" name="max_completion_datetime" value={formValues}
                        error={formErrors} submitting={isSubmitting} initialValue={formValues['max_completion_datetime']}
                        label="Approx Completion Time" refs={formRefs} returnKeyType="done" validationType={ValidationType.Required} />

                    <MyTextInput name="reschedule_remarks" value={formValues} error={formErrors} submitting={isSubmitting}
                        initialValue={formValues['reschedule_remarks']} label="Remarks" keyboardType={KeyboardType.Default}
                        multiline={true} numberOfLines={4} autoCapitalize={CapitalizeType.Sentences} maxLength={200}
                        refs={formRefs} returnKeyType="done" validationType={ValidationType.Required} />

                    <View style={styles.formFooter}>
                        <SubmitButton title="Save" onPress={submitClickHandler} IsLoading={showButtonLoader} />
                        <CancelButton title="Cancel" onPress={cancelClickHandler} />
                    </View>

                </View>

                {
                    logs.trim() != '' &&
                    <View style={styles.formHeader}>
                        <Text style={styles.heading}>Previous Reschedules</Text>
                    </View>
                }

                {_renderLog()}

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


export default ScheduleScreen;
