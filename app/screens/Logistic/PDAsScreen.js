import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


import CardData from '../../components/CardData';
import HeaderRight from '../../navigation/HeaderRight';

import * as userAction from '../../store/actions/user';
import Colors from '../../constants/Colors';
import { ActionIcons, ActionIconColors, UserType } from '../../constants/Enums';

const PDAsScreen = props => {

    const [isLoading, setIsLoading] = useState(false);

    const users = useSelector(state => state.users.list);
    const loggedInUser = useSelector(state => state.login);

    const dispatch = useDispatch();

    useEffect(() => {

        props.navigation.setOptions({ title: 'PDA Users' });

        const getData = async () => {
            setIsLoading(true);
            try {
                await dispatch(userAction.getData(0, UserType.PDA, loggedInUser.UserId));
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
            props.navigation.navigate('PDAEntry', { 'id': data[0].id });
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
            await dispatch(userAction.getData(0, UserType.PDA, loggedInUser.UserId));
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <CardData
                        index={index}
                        data={item}
                        titles={['name', 'mobile', 'email', 'is active']}
                        fields={['name', 'mobile', 'email', 'is_active_name']}
                        hasActions={true}
                        actions={[editClickHandler, deleteClickHandler]}
                        actionIcons={[ActionIcons.Edit, ActionIcons.Delete]}
                        actionIconColors={[ActionIconColors.Edit, ActionIconColors.Delete]}
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

const addNewClickHandler = navData => {
    navData.navigation.navigate('PDAEntry');
}

export default PDAsScreen;
