import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


import TableHeader from '../components/TableHeader';
import TableData from '../components/TableData';
import HeaderRight from '../navigation/HeaderRight';

import * as warehouseAction from '../store/actions/warehouse';
import Colors from '../constants/Colors';

const ZZWHTableDataScreen = props => {

    const [isLoading, setIsLoading] = useState(false);

    const warehouses = useSelector(state => state.warehouses.list);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(warehouseAction.getData(0)).then(() => {
            setIsLoading(false);
        });
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
                <Text>No warehouses found, maybe start adding some ?</Text>
            </View>
        );
    }

    const editClickHandler = id => {
        let data = warehouses.filter((x) => x.id == id);
        if (data.length > 0) {
            props.navigation.navigate('WarehouseEntry', { 'id': data[0].id });
        }
    }

    const deleteClickHandler = id => {
        Alert.alert(
            'Deleting Record ?',
            'Are you sure you want to delete this record ?',
            [
                {text: 'No', onPress: () => {}},
                {text: 'Yes', onPress: () => { deleteRecord(id);}},
            ],
            {
                cancelable: true
            }
        );
    }

    const deleteRecord = async(id) => {
        setIsLoading(true);
        await dispatch(warehouseAction.deleteData(id));
        await dispatch(warehouseAction.getData(0));
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            <TableHeader titles={['name', 'contact person', 'contact no']} hasOptions={true}
                         alignments={['left', 'left', 'center']} />

            <FlatList
                style={styles.list}
                data={warehouses}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <TableData data={item} fields={['name', 'contact_person', 'contact_no']} index={index}
                        options={['Edit', 'Delete']} actions={[editClickHandler, deleteClickHandler]}
                        alignments={['left', 'left', 'center']} />
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

const addNewClickHandler = navData => {
    navData.navigation.navigate('WarehouseEntry');
}

ZZWHTableDataScreen.navigationOptions = navData => {
    return {
        headerRight: () => (
            <HeaderRight navData={navData} isIcon={true} iconName="md-add-circle" onPress={() => addNewClickHandler(navData)} />
        )
    };
}

export default ZZWHTableDataScreen;
