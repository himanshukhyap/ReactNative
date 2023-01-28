import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CardData from '../../components/CardData';
import HeaderRight from '../../navigation/HeaderRight';

import * as collectionRequestAction from '../../store/actions/collectionrequest';
import Colors from '../../constants/Colors';
import { ActionIcons, ActionIconColors, RequestStatus } from '../../constants/Enums';

const CollectionRequestsScreen = props => {

    const [isLoading, setIsLoading] = useState(false);

    const collectionrequests = useSelector(state => state.collectionrequests.list);
    const loggedInUser = useSelector(state => state.login);

    const dispatch = useDispatch();


    useEffect(() => {

        props.navigation.setOptions({ title: 'Pending Inwards' });

        const getData = async () => {
            setIsLoading(true);
            try {
                await dispatch(collectionRequestAction.getData(0, 0, 0, 0, loggedInUser.UserId));
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

    if (collectionrequests.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/no_record_found.png')} />
            </View>
        );
    }

    const acceptClickHandler = id => {
        let data = collectionrequests.filter((x) => x.id == id);
        props.navigation.navigate('CollectionRequestEntry', { 'id': data[0].id });
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={collectionrequests}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <CardData
                        index={index}
                        data={item}
                        downloadables="gate_pass"
                        titles={['vendor', 'address', 'total drums', 'total quantity (kg)', 'gate pass']}
                        fields={['firm_name', 'address', 'actual_drums_qty', 'actual_volume', 'gate_pass']}
                        hasActions={true}
                        actions={[acceptClickHandler]}
                        actionIcons={[ActionIcons.Accept]}
                        actionIconColors={[ActionIconColors.Accept]}
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

export default CollectionRequestsScreen;
