import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CardData from '../../components/CardData';
import HeaderRight from '../../navigation/HeaderRight';

import * as outwardAction from '../../store/actions/outwardtransaction';
import Colors from '../../constants/Colors';
import { ActionIcons, ActionIconColors } from '../../constants/Enums';

const OutwardsScreen = props => {

    const [isLoading, setIsLoading] = useState(false);

    const transactions = useSelector(state => state.outwardtransactions.list);

    const dispatch = useDispatch();


    useEffect(() => {
        const getData = async () => {            
            setIsLoading(true);
            try {
                await dispatch(outwardAction.getData(0));
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

    if (transactions.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/no_record_found.png')} />
            </View>
        );
    }

    const editClickHandler = id => {
        let data = transactions.filter((x) => x.id == id);
        if (data.length > 0) {
            props.navigation.navigate('OutwardEntry', { 'id': data[0].id });
        }
    }

    const viewClickHandler = id => {
        let data = transactions.filter((x) => x.id == id);
        if (data.length > 0) {
            props.navigation.navigate('OutwardDetail', { 'id': data[0].id });
        }
    }

    const documentClickHandler = id => {
        let data = transactions.filter((x) => x.id == id);
        if (data.length > 0) {
            props.navigation.navigate('OutwardDocuments', { 'outwardId': data[0].id });
        }
    }

    const deleteClickHandler = id => {
        Alert.alert(
            'Deleting Record ?',
            'Are you sure you want to delete this record ?',
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
        setIsLoading(true);
        try {
            await dispatch(outwardAction.deleteData(id));
            await dispatch(outwardAction.getData(0));
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <CardData
                        index={index}
                        data={item}
                        titles={['item name', 'entry date', 'net weight', 'warehouse']}
                        fields={['item_name', 'entry_date', 'net_weight_name', 'warehouse_name']}
                        hasActions={true}
                        actions={[viewClickHandler, documentClickHandler]}
                        actionIcons={[ActionIcons.View, ActionIcons.Attachment]}
                        actionIconColors={[ActionIconColors.View, ActionIconColors.Attachment]}
                    />
                )}
            />
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

export default OutwardsScreen;
