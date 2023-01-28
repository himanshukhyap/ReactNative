import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CardData from '../../components/CardData';
import HeaderRight from '../../navigation/HeaderRight';

import * as transactionAction from '../../store/actions/inwardtransaction';
import Colors from '../../constants/Colors';
import { ActionIcons, ActionIconColors } from '../../constants/Enums';

const InwardsScreen = props => {

    const [isLoading, setIsLoading] = useState(false);

    const transactions = useSelector(state => state.inwardtransactions.list);

    const dispatch = useDispatch();


    useEffect(() => {
        const getData = async () => {            
            setIsLoading(true);
            try {
                await dispatch(transactionAction.getData(0));
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

    const viewClickHandler = id => {
        let data = transactions.filter((x) => x.id == id);
        if (data.length > 0) {
            props.navigation.navigate('InwardDetail', { 'id': data[0].id });
        }
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
                        titles={['vendor', 'entry_date', 'total drums', 'total quantity (kg)']}
                        fields={['firm_name', 'entry_date', 'total_drums', 'total_volume']}
                        hasActions={true}
                        actions={[viewClickHandler]}
                        actionIcons={[ActionIcons.View]}
                        actionIconColors={[ActionIconColors.View]}
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

export default InwardsScreen;
