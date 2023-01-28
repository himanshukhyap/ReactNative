import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


import CardData from '../../components/CardData';
import HeaderRight from '../../navigation/HeaderRight';

import * as userAction from '../../store/actions/user';
import Colors from '../../constants/Colors';
import { ActionIcons, ActionIconColors, UserType } from '../../constants/Enums';

let vendorId = 0;
let firmName = '';

const CountersScreen = props => {

    const { params } = props.route;
    const [isLoading, setIsLoading] = useState(true);

    const users = useSelector(state => state.users.list);
    const [searchedText, setSearchedText] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                vendorId = params.vendorId;
                firmName = params.firmName;

                props.navigation.setOptions({ title: 'Counters of ' + params.firmName });

                await dispatch(userAction.getCounters(params.vendorId));
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

    if (users.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/no_record_found.png')} />
            </View>
        );
    }

    const editClickHandler = id => {
        let data = users.filter((x) => x.id == id);
        if (data.length > 0) {
            props.navigation.navigate('CounterEntry', { 'id': data[0].id, 'vendorId': vendorId });
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
            await dispatch(userAction.deleteData(id));
            await dispatch(userAction.getCounters(vendorId));
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>

            <View style={styles.filterMain}>
                <View style={styles.filterChild}>
                    <Text style={styles.label}>Filter Counters By Address</Text>
                    <TextInput style={styles.input} value={searchedText} placeholder="start typing address" onChangeText={(text) => setSearchedText(text)} />
                </View>
            </View>

            <FlatList
                keyboardShouldPersistTaps="handled"
                data={users.filter(x => x.address.toLowerCase().indexOf(searchedText.toLowerCase(), 0) > -1)}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <CardData
                        index={index}
                        data={item}
                        titles={['city', 'state', 'address', 'postal code']}
                        fields={['city', 'state_name', 'address', 'postal_code']}
                        hasActions={true}
                        actions={[deleteClickHandler]}
                        actionIcons={[ActionIcons.Delete]}
                        actionIconColors={[ActionIconColors.Delete]}
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
    label: {
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
        fontSize: 15,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontFamily: 'Roboto',
        fontSize: 15.5,
        borderColor: Colors.gray,
        borderWidth: 1
    },
    filterMain: {
        overflow: 'hidden',
        paddingBottom: 5,
    },
    filterChild: {
        backgroundColor: Colors.white1,
        height: 65,
        padding: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 1, height: 1, },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
})

export default CountersScreen;
