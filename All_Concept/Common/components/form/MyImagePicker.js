import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, PermissionsAndroid, Alert } from 'react-native';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
//import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

import Colors from '../../constants/Colors';

const MyImagePicker = props => {

    const [inputValue, setInputValue] = useState('');
    const [imageUri, setImageUri] = useState();
    const [inputError, setInputError] = useState('');

    const verifyPermissions = async () => {
        const result = await Camera.requestCameraPermissionsAsync();
        if (result.status !== 'granted') {
            Alert.alert('Insufficient Permission', 'You need to allow camera permissions in order to use this app', [{ text: 'Okay' }]);
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({ quality: 0.8 });
        setImageUri(image.uri);
        setInputValue(image.uri);
        props.value[props.name] = image.uri;
        setInputError('');
        props.error[props.name] = '';
    };

    useEffect(() => {
        if (props.submitting) {
            validateInput();
        }
    }, [props]);

    const validateInput = () => {
        if (imageUri == undefined || imageUri == '') {
            setInputError('Image is required');
            props.error[props.name] = 'Image is required';
        } else {
            setInputError('');
            props.error[props.name] = '';
        }
    }

    return (
        <View>
            <View style={styles.title_and_error}>
                <Text style={{ ...styles.label, ...(inputError == undefined || inputError == '' ? styles.labelValid : styles.labelInvalid) }}>
                    {props.label}
                </Text>
                <Text style={styles.errorMessage}>
                    {inputError}
                </Text>
            </View>
            <TouchableWithoutFeedback onPress={takeImageHandler}>
                <View style={styles.imagePicker}>
                    <View style={{ ...styles.imagePreview, ...(inputError == undefined || inputError == '' ? styles.inputValid : styles.inputInvalid) }}>
                        {
                            !imageUri ?
                                <Text style={styles.watermark}>Tap Here To{"\n"}Click Picture</Text> :
                                <Image style={styles.image} source={{ uri: imageUri }} />}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    title_and_error: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-between'
    },
    label: {
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
        fontSize: 15,
    },
    labelValid: {
        color: Colors.black2
    },
    labelInvalid: {
        color: Colors.red
    },
    inputValid: {
        borderColor: Colors.gray,
        borderWidth: 1
    },
    inputInvalid: {
        borderColor: Colors.red,
        borderWidth: 1
    },
    errorMessage: {
        color: Colors.red,
    },
    watermark: {
        fontSize: 18,
        lineHeight: 25,
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
        color: Colors.lightBlack,
        textAlign: 'center'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    }
});

export default MyImagePicker;


//expo install expo-image-picker
//expo install expo-permissions