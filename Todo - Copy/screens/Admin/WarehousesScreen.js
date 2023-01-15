import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


import CardData from '../../components/CardData';
import HeaderRight from '../../navigation/HeaderRight';

import * as warehouseAction from '../../store/actions/warehouse';
import Colors from '../../constants/Colors';
import { ActionIcons, ActionIconColors } from '../../constants/Enums';

const WarehousesScreen = props => {

    const [isLoading, setIsLoading] = useState(false);

    const warehouses = useSelector(state => state.warehouses.list);

    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                await dispatch(warehouseAction.getData(0));
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

    if (warehouses.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/no_record_found.png')} />
            </View>
        );
    }

    const editClickHandler = id => {
        let data = warehouses.filter((x) => x.id == id);
        if (data.length > 0) {
            props.navigation.navigate('WarehouseEntry', { 'id': data[0].id });
        }
    }

    const documentClickHandler = id => {
        let data = warehouses.filter((x) => x.id == id);
        if (data.length > 0) {
            props.navigation.navigate('WarehouseDocuments', { 'warehouseId': data[0].id });
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
            await dispatch(warehouseAction.deleteData(id));
            await dispatch(warehouseAction.getData(0));
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={warehouses}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <CardData
                        index={index}
                        data={item}
                        titles={['name', 'manager', 'city', 'address']}
                        fields={['name', 'manager', 'city', 'address']}
                        hasActions={true}
                        actions={[editClickHandler, documentClickHandler, deleteClickHandler]}
                        actionIcons={[ActionIcons.Edit, ActionIcons.Attachment, ActionIcons.Delete]}
                        actionIconColors={[ActionIconColors.Edit, ActionIconColors.Attachment, ActionIconColors.Delete]}
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
})

export default WarehousesScreen;
