import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import TableHeader from '../../components/TableHeader';
import TableData from '../../components/TableData';
import SubmitButton from '../../components/form/SubmitButton';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';

import * as transactionAction from '../../store/actions/inwardtransaction';
import Colors from '../../constants/Colors';

const InwardsScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const transactions = useSelector(state => state.inwardtransactions.list);

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
                await dispatch(transactionAction.getData(0, formValues));
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
            await dispatch(transactionAction.getData(0, formValues));
        } catch (err) {
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
        setIsDataLoading(false);
        setIsSubmitting(false);
        setShowButtonLoader(false);
    }

    const editClickHandler = id => {
        let data = transactions.filter((x) => x.id == id);
        if (data.length > 0) {
            props.navigation.navigate('InwardEntry', { 'id': data[0].id });
        }
    }

    const viewClickHandler = id => {
        let data = transactions.filter((x) => x.id == id);
        if (data.length > 0) {
            props.navigation.navigate('InwardDetail', { 'id': data[0].id });
        }
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
                !isDataLoading && transactions.length == 0 &&
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/no_record_found.png')} />
                </View>
            }
            {
                !isDataLoading && transactions.length > 0 &&
                <>
                    <TableHeader titles={['vendor', 'entry date', 'quantity (kg)']} hasOptions={true}
                        alignments={['left', 'center', 'right']}
                        sizes={[1, 1, 1]} />

                    <FlatList
                        data={transactions}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => (
                            <TableData data={item} fields={['firm_name', 'entry_date', 'total_volume']} index={index}
                                sizes={[1, 1, 1]}
                                options={['Edit', 'View Details']}
                                actions={[editClickHandler, viewClickHandler]}
                                alignments={['left', 'center', 'right']} />
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
    list: {
        marginHorizontal: 2,
        borderLeftColor: Colors.offWhite,
        borderLeftWidth: 1,
        borderRightColor: Colors.offWhite,
        borderRightWidth: 1
    }
})

export default InwardsScreen;
