import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderRight from '../../navigation/HeaderRight';
import Colors from '../../constants/Colors';
import DetailsViewer from '../../components/DetailsViewer';

import * as transactionAction from '../../store/actions/outwardtransaction';

const OutwardDetailScreen = props => {

    const { params } = props.route;
    const [isLoading, setIsLoading] = useState(false);
    const [dataCaptions, setDataCaptions] = useState('');
    const [dataKeys, setDataKeys] = useState('');

    const transactions = useSelector(state => state.outwardtransactions.record);

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

        props.navigation.setOptions({ title: 'Outward Details' });

        if (params && params.id) {
            fetchAllData(params.id);
        } else {
            props.navigation.navigate('Outwards1', { token: 'refresh' });
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
                    data={transactions} downloadables="gate_pass" sourceFolder="outwarddocs"
                    captions="Entry Date,Item Name,Empty Weight,Gross Weight,Net Weight,Vehicle No,Vehicle In Time,Vehicle Out Time,Driver Name,
                                Driver Mobile,Gate Pass,Remarks"
                    keys="entry_date,item_name,empty_weight,gross_weight,net_weight,vehicle_no,vehicle_in_time,vehicle_out_time,driver_name,
                            driver_mobile,gate_pass,remarks" />
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


export default OutwardDetailScreen;