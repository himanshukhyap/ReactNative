import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, PermissionsAndroid, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import Colors from '../../constants/Colors';
import * as GlobalFunctions from '../../common/GlobalFunctions'
import GS from '../../common/GlobalStyles';
import { ValidationType } from '../../constants/Enums';

const MyImageSelector = props => {

    const [inputValue, setInputValue] = useState(props.initialValue);
    const [inputError, setInputError] = useState('');
    let [askedPermissionOnLoad, setAskedPermissionOnLoad] = useState(false);

    useEffect(() => {
        if (!askedPermissionOnLoad && Platform.OS === 'android') {
            setAskedPermissionOnLoad(true);
            setTimeout(() => {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            }, 500);
        }
        if (props.resetting) {
            setInputValue('');
        }
        if (props.submitting) {
            validateInput();
        }
    }, [props]);

    const validateInput = () => {
        if (props.validationType == ValidationType.Required) {
            if (inputValue == '') {
                setInputError('This field is required');
                props.error[props.name] = 'This field is required';
            } else {
                setInputError('');
                props.error[props.name] = '';
            }
        }
    }

    const verifyAndroidPermissions = async () => {
        if (Platform.OS === 'android') {
            const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            if (result !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Insufficient Permission', 'You need to allow storage permissions in order to use this app', [{ text: 'Okay' }]);
            }
        }
        return true;
    };

    const imagePickerHandler = async () => {
        if (props.submitting) return;

        const hasPermissions = await verifyAndroidPermissions();
        if (!hasPermissions) {
            GlobalFunctions.showMessage('Insufficient Permission', 'You need to allow storage permissions in order to use this app');
            return;
        }

        try {
            const image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                //allowsEditing: true,
                //aspect: [1, 1],
                //quality: 1,
            });

            if (!image.cancelled) {
                const fileInfo = await FileSystem.getInfoAsync(image.uri);

                if (fileInfo.size > 10000000) {
                    GlobalFunctions.showMessage('Image Size Exceeded', 'File only upto 10 MB allowed');
                    return;
                }

				console.log	(image.uri);

                const imageName = image.uri.substr(image.uri.lastIndexOf('/') + 1);
                setInputValue(imageName);
                props.value[props.name] = image.uri;
                setInputError('');
                props.error[props.name] = '';
            } else {
				console.log('image selection cancelled');
			}
        } catch (err) {
            if (err.message.indexOf('Can not save result to the file', 0) > -1) {
                GlobalFunctions.showMessage(
                    'Image Not Exists',
                    'The image you have selected does not exists on your phone & showing its reference only\n\n' +
                    'Select image from specific storage instead from Downloads App / Recent Files');
            } else {
                GlobalFunctions.showMessage("Invalid Image", "This image can't be selected, There seems some issue with this image.");
            }
            return;
        }

        /*const doc = await DocumentPicker.getDocumentAsync({ type: props.fileType, copyToCacheDirectory: false });
        if (doc.size > 10000000) {
            GlobalFunctions.showMessage('File Size Exceeded', 'File only upto 10 MB allowed');
            return;
        }

        if (doc.uri && doc.type === 'success') {

            const ft = GlobalFunctions.getFileType(doc.name);
            if (ft.mime == undefined) {
                return;
            }

            const fileInfo = await FileSystem.getInfoAsync(doc.uri);
            if (!fileInfo.exists) {
                GlobalFunctions.showMessage(
                    'File Not Exists',
                    'The file you have selected does not exists on your phone & showing its reference only\n\n' +
                    'Select file from specific storage instead of from Downloads App / Recent Files');
                return;
            }


            let localUri = doc.uri;
            //let filename = localUri.toString().replace(/%3a/ig, '/').replace(/%2f/ig, '/').split('/').pop();
            setInputValue(doc.name);
            props.value[props.name] = localUri;
            setInputError('');
            props.error[props.name] = '';
        }*/
    };

    return (
        <TouchableWithoutFeedback onPress={imagePickerHandler}>
            <View style={styles.container} >
                <View style={GS.title_and_error}>
                    <Text style={{ ...GS.label, ...(inputError == undefined || inputError == '' ? GS.labelValid : GS.labelInvalid) }}>
                        {props.label}
                    </Text>
                    <Text style={GS.errorMessage}>
                        {inputError}
                    </Text>
                </View>
                <View style={{ ...styles.addon_container, ...(inputError == undefined || inputError == '' ? styles.inputValid : styles.inputInvalid) }}>
                    <View style={{ ...styles.column, flex: 3 }}>
                        <Text style={styles.labelInput} numberOfLines={1}>
                            {inputValue}
                        </Text>
                    </View>
                    <View style={{ ...styles.column, flex: 1 }}>
                        <View style={styles.button} >
                            <Text style={{ ...styles.buttonText, ...props.textStyle }}>Browse</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 68,
    },
    addon_container: {
        height: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: Colors.gray,
        borderWidth: 1,
    },
    column: {
        height: '100%',
    },
    labelInput: {
        height: 34,
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontFamily: 'Roboto',
        fontSize: 15.5,
        textAlignVertical: 'center'
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.lightGray,
        height: '100%',
        fontSize: 15,
        fontWeight: "bold",
        borderLeftColor: Colors.gray,
        borderLeftWidth: 1,
    },
    buttonText: {
        color: Colors.black2,
        fontSize: 15,
        fontWeight: "bold"
    },
});

export default MyImageSelector;

//expo install expo-document-picker