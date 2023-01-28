import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import TableHeader from '../../components/TableHeader';
import TableData from '../../components/TableData';
import { ActionIcons, ActionIconColors } from '../../constants/Enums';

import * as userDocumentAction from '../../store/actions/userdocument';
import Colors from '../../constants/Colors';
import * as GlobalFunctions from '../../common/GlobalFunctions';

const DocumentsScreen = props => {

    const [isLoading, setIsLoading] = useState(false);

    const userdocuments = useSelector(state => state.userdocuments.list);

    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            
            const userData = await AsyncStorage.getItem('userData');
            const objData = JSON.parse(userData);
            const { userId } = objData;

            try {
                await dispatch(userDocumentAction.getData(userId));
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

    const downloadClickHandler = async (id) => {
        let data = userdocuments.filter((x) => x.id == id);
        GlobalFunctions.openLiveFile('userdocs', data[0].file_name);
    }

    if (userdocuments.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/no_record_found.png')} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TableHeader titles={['Document Title', 'Actions']} sizes={[5, 2]}
                alignments={['left', 'center']} style={{ marginHorizontal: 0 }} />

            <FlatList
                data={userdocuments}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <TableData data={item} fields={['document_title']} index={index}
                        style={{ marginHorizontal: 0 }}
                        sizes={[5, 2]}
                        alignments={['left', 'center']}
                        actions={[downloadClickHandler]}
                        actionIcons={[ActionIcons.Download]}
                        actionIconColors={[ActionIconColors.Download]}
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
        paddingLeft: 10,
        paddingRight: 10,
    },
    formFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        borderTopColor: Colors.gray,
        borderTopWidth: 0,
        marginVertical: 20,
    }
})

export default DocumentsScreen;
