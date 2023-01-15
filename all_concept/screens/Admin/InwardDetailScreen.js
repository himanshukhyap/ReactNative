import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderRight from '../../navigation/HeaderRight';
import Colors from '../../constants/Colors';
import DetailsViewer from '../../components/DetailsViewer';

import * as transactionAction from '../../store/actions/inwardtransaction';

const InwardDetailScreen = props => {

    const { params } = props.route;
    const [isLoading, setIsLoading] = useState(false);

    const transactions = useSelector(state => state.inwardtransactions.record);

    const dispatch = useDispatch();

    const fetchAllData = async (pkid) => {
        try {
            setIsLoading(true);
            await dispatch(transactionAction.getData(pkid));
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    useEffect(() => {

        props.navigation.setOptions({ title: 'Transaction Details' });

        if (params && params.id) {
            fetchAllData(params.id);
        } else {
            props.navigation.navigate('Inwards1', { token: 'refresh' });
        }
    }, [dispatch]);


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
                    data={transactions} hideNA={true}
                    captions="Entry Date,Warehouse,Vendor,Address,Total Drums,Total Quantity (kg),Sample Taken,Vehicle No,Driver Name,
                                Driver Mobile,Remarks"
                    keys="entry_date,warehouse_name,firm_name,address,total_drums,total_volume,sample_taken_string,vehicle_no,driver_name,
                            driver_mobile,remarks" />
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
    }
})


export default InwardDetailScreen;
