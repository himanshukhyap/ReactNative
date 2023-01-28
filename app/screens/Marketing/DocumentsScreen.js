import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import TableHeader from '../../components/TableHeader';
import TableData from '../../components/TableData';
import HeaderRight from '../../navigation/HeaderRight';
import MyTextInput from '../../components/form/MyTextInput';
import MyFilePicker from '../../components/form/MyFilePicker';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';
import { ValidationType, FileType, CapitalizeType } from '../../constants/Enums';
import { ActionIcons, ActionIconColors } from '../../constants/Enums';

import * as userDocumentAction from '../../store/actions/userdocument';

import Colors from '../../constants/Colors';
import * as GlobalFunctions from '../../common/GlobalFunctions';

const DocumentsScreen = props => {

    const { params } = props.route;
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [showButtonLoader, setShowButtonLoader] = useState(false);

    const [formValues, setFormValues] = useState([]);
    const [formErrors, setFormErrors] = useState([]);
    const [formRefs, setFormRefs] = useState([]);

    const userdocuments = useSelector(state => state.userdocuments.list);

    const dispatch = useDispatch();

    const fetchAllData = async (user_id) => {
        try {
            setIsLoading(true);
            if (user_id > 0) {
                setUserId(user_id);
                await dispatch(userDocumentAction.getData(user_id));
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    useEffect(() => {

        props.navigation.setOptions({ title: 'Vendor Documents' });

        if (params && params.userId) {
            fetchAllData(params.userId);
        } else {
            props.navigation.navigate('Vendors1', { token: 'refresh' });
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

        formValues['user_id'] = userId;
        try {
            await dispatch(userDocumentAction.postData(formValues));
            setIsSubmitting(false);
            setShowButtonLoader(false);
            setIsResetting(true);
            await dispatch(userDocumentAction.getData(userId));
            setIsResetting(false);
        } catch (err) {
            setShowButtonLoader(false);
            setIsSubmitting(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    const downloadClickHandler = async(id) => {
        let data = userdocuments.filter((x) => x.id == id);
        GlobalFunctions.openLiveFile('userdocs', data[0].file_name);
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
        await dispatch(userDocumentAction.deleteData(id));
        await dispatch(userDocumentAction.getData(userId));
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
                    userdocuments.length == 0 &&
                    <View style={{ alignItems: 'center' }}>
                        <Image source={require('../../assets/no_record_found.png')} />
                    </View>
                }

                {
                    userdocuments.length > 0 &&
                    <View>
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

export default DocumentsScreen;
