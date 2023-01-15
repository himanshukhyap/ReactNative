import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CardData from '../../components/CardData';
import HeaderRight from '../../navigation/HeaderRight';

import * as collectionRequestAction from '../../store/actions/collectionrequest';
import Colors from '../../constants/Colors';
import { ActionIcons, ActionIconColors, RequestStatus } from '../../constants/Enums';

import * as GlobalFunctions from '../../common/GlobalFunctions';

const CollectionRequestsScreen = props => {

    const [isLoading, setIsLoading] = useState(false);

    const collectionrequests = useSelector(state => state.collectionrequests.list);
    const loggedInUser = useSelector(state => state.login);

    const dispatch = useDispatch();

    useEffect(() => {

        props.navigation.setOptions({ title: 'Collection Requests' });

        const getData = async () => {
            setIsLoading(true);
            try {
                await dispatch(collectionRequestAction.getData(0, loggedInUser.UserId));
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

    const editClickHandler = id => {
        let data = collectionrequests.filter((x) => x.id == id);
        if (data[0]['request_status'] == RequestStatus.Pending || data[0]['request_status'] == RequestStatus.InProcess) {
            props.navigation.navigate('CollectionRequestEntry', { 'id': data[0].id });
        }
        else {
            Alert.alert('Can\'t be edited', 'Only Pending or InProcess requests can be edited');
        }
    }

    const viewClickHandler = id => {
        let data = collectionrequests.filter((x) => x.id == id);
        if (data.length > 0) {
            props.navigation.navigate('CollectionRequestDetail', { 'id': data[0].id });
        }
    }

    const deleteClickHandler = id => {
        let data = collectionrequests.filter((x) => x.id == id);
        if (data[0]['request_status'] != RequestStatus.Pending) {
            Alert.alert('Can\'t be deleted', 'Only Pending requests can be deleted');
        } else {
            GlobalFunctions.showDeleteConfirmation(() => deleteRecord(id));
        }
    }

    const deleteRecord = async (id) => {
        setIsLoading(true);
        try {
            await dispatch(collectionRequestAction.deleteData(id));
            await dispatch(collectionRequestAction.getData(0, loggedInUser.UserId));
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
        setIsLoading(false);
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
                        titles={['pickup request date', 'Status', 'drums', 'weight (kg)']}
                        fields={['request_date', 'request_status_name', 'actual_drums_qty_temp', 'actual_volume_temp']}
                        hasActions={true}
                        actions={[editClickHandler, viewClickHandler, deleteClickHandler]}
                        actionIcons={[ActionIcons.Edit, ActionIcons.View, ActionIcons.Delete]}
                        actionIconColors={[ActionIconColors.Edit, ActionIconColors.View, ActionIconColors.Delete]}
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
