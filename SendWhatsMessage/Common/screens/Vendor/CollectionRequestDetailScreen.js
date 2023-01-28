import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderRight from '../../navigation/HeaderRight';
import Colors from '../../constants/Colors';
import DetailsViewer from '../../components/DetailsViewer';

import * as collectionrequestAction from '../../store/actions/collectionrequest';

const CollectionRequestDetailScreen = props => {

    const { params } = props.route;
    const [isLoading, setIsLoading] = useState(true);
    const [id, setId] = useState(0);
    const [logs, setLogs] = useState('');

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

        props.navigation.setOptions({ title: 'Collection Request Details' });

        if (params && params.id) {
            fetchAllData(params.id);
        } else {
            props.navigation.navigate('CollectionRequests1', { token: 'refresh' });
        }
    }, [dispatch]);

    const _renderLog = () => {
        let items = [];
        let arrLogs = collectionrequestData.reschedule_logs.split(';');

        for (let i = 0; i < arrLogs.length; i++) {
            const dataParts = arrLogs[i].split(',');
            if (dataParts.length < 2) continue;

            let logData = [];
            logData['completion_time'] = dataParts[0].split(':')[1] + ':' + dataParts[0].split(':')[2];
            logData['rescheduled_to'] = dataParts[1].split(':')[1] + ':' + dataParts[1].split(':')[2];
            logData['remarks'] = dataParts[2].split(':')[1];

            items.push(<DetailsViewer
                style={{ marginVertical: 10 }}
                data={logData}
                key={i.toString()}
                captions="Estimated Pickup Time,Rescheduled To,Remarks"
                keys="completion_time,rescheduled_to,remarks" />);
        }

        return items;
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
                    data={collectionrequestData} downloadables="gate_pass"
                    captions="Pickup Request Date,Estimated Pickup Time,Request Status,Req. Drums Pickup Qty,Actual Drums Quantity,
                                Requested Quantity (kg),Actual Quantity (kg),Empty Drums Required,Vehicle No,Security Code,Gate Pass"
                    keys="request_date,max_completion_datetime,request_status_name,entered_drums_qty,actual_drums_qty,
                                entered_volume,actual_volume,empty_drums_qty,vehicle_no,security_code,gate_pass" />

                {
                    collectionrequestData != null && collectionrequestData.reschedule_logs != null && collectionrequestData.reschedule_logs.trim() != '' &&
                    <View style={styles.formHeader}>
                        <Text style={styles.heading}>Request Rescheduled</Text>
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
        /*paddingLeft: 10,
        paddingRight: 10,*/
    },
    formHeader: {
        width: '100%',
        backgroundColor: Colors.warning,
        marginTop: 15,
        marginBottom: 5,
        paddingVertical: 5,
        alignItems: 'center'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
    }
})


export default CollectionRequestDetailScreen;
