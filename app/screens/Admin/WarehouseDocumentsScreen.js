import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import TableHeader from '../../components/TableHeader';
import TableData from '../../components/TableData';
import MyTextInput from '../../components/form/MyTextInput';
import MyFilePicker from '../../components/form/MyFilePicker';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';
import { ValidationType, FileType, CapitalizeType } from '../../constants/Enums';
import { ActionIcons, ActionIconColors } from '../../constants/Enums';

import * as warehouseDocumentAction from '../../store/actions/warehousedocument';

import Colors from '../../constants/Colors';
import * as GlobalFunctions from '../../common/GlobalFunctions';

const WarehouseDocumentsScreen = props => {

    const { params } = props.route;
    const [isLoading, setIsLoading] = useState(false);
    const [warehouseId, setWarehouseId] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const warehousedocuments = useSelector(state => state.warehousedocuments.list);

    const dispatch = useDispatch();

    const fetchAllData = async (warehouse_id) => {
        try {
            setIsLoading(true);
            if (warehouse_id > 0) {
                setWarehouseId(warehouse_id);
                await dispatch(warehouseDocumentAction.getData(warehouse_id));
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    useEffect(() => {

        props.navigation.setOptions({ title: 'Warehose Documents' });

        if (params && params.warehouseId) {
            fetchAllData(params.warehouseId);
        } else {
            props.navigation.navigate('Warehouses1', { token: 'refresh' });
        }
    }, [dispatch]);


    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    const cancelClickHandler = navData => {
        props.navigation.goBack();
    }

    const submitClickHandler = async () => {
        setIsSubmitting(true);
        setTimeout(() => {
            submitDetails();
        }, 50);
    }

    const submitDetails = async () => {
        let formValidated = true;

        for (let fe in formErrors) {
            if (formErrors[fe] != '') {
                formValidated = false;
                break;
            }
        }

        if (!formValidated) {
            GlobalFunctions.showErrorToast(() => setIsSubmitting(false));
            return;
        }

        setShowButtonLoader(true);

        console.log('details will be submitted now');

        formValues['warehouse_id'] = warehouseId;
        try {
            await dispatch(warehouseDocumentAction.postData(formValues));
            setIsSubmitting(false);
            setShowButtonLoader(false);
            setIsResetting(true);
            await dispatch(warehouseDocumentAction.getData(warehouseId));
            setIsResetting(false);
        } catch (err) {
            setShowButtonLoader(false);
            setIsSubmitting(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    const downloadClickHandler = async (id) => {
        let data = warehousedocuments.filter((x) => x.id == id);
        GlobalFunctions.openLiveFile('warehousedocs', data[0].file_name);
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
        await dispatch(warehouseDocumentAction.deleteData(id));
        await dispatch(warehouseDocumentAction.getData(warehouseId));
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>

            <MyTextInput name="document_title" value={formValues} error={formErrors} submitting={isSubmitting} resetting={isResetting}
                initialValue={formValues['document_title']} label="Document Title" validationType={ValidationType.Required}
                autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} returnKeyType="done" />

            <MyFilePicker name="file_name" value={formValues} error={formErrors} submitting={isSubmitting} resetting={isResetting}
                label="Select PDF Document" fileType={FileType.Pdf} validationType={ValidationType.Required} />

            <View style={styles.formFooter}>
                <SubmitButton title="Upload" onPress={submitClickHandler} IsLoading={showButtonLoader} />
                <CancelButton title="Back" onPress={cancelClickHandler} />
            </View>

            <View>
                {
                    warehousedocuments.length == 0 &&
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../../assets/no_record_found.png')} />
                    </View>
                }

                {
                    warehousedocuments.length > 0 &&
                    <View>
                        <TableHeader titles={['Document Title', 'Actions']} sizes={[5, 2]}
                            alignments={['left', 'center']} style={{ marginHorizontal: 0 }} />

                        <FlatList
                            data={warehousedocuments}
                            keyExtractor={item => item.id}
                            renderItem={({ item, index }) => (
                                <TableData data={item} fields={['document_title']} index={index}
                                    style={{ marginHorizontal: 0 }}
                                    sizes={[5, 2]}
                                    alignments={['left', 'center']}
                                    actions={[downloadClickHandler, deleteClickHandler]}
                                    actionIcons={[ActionIcons.Download, ActionIcons.Delete]}
                                    actionIconColors={[ActionIconColors.Download, ActionIconColors.Delete]}
                                />
                            )}
                        />
                    </View>
                }

            </View>

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
        flex: 1,
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

export default WarehouseDocumentsScreen;
