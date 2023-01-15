import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, PermissionsAndroid, Platform } from 'react-native';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import Colors from '../../constants/Colors';
import * as GlobalFunctions from '../../common/GlobalFunctions'
import GS from '../../common/GlobalStyles';
import { ValidationType, FileType } from '../../constants/Enums';
import { IGNORED_TAGS } from 'react-native-render-html';

const MyFilePicker = props => {

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

	const documentPickerHandler = async () => {
		if (props.submitting) return;

		const hasPermissions = await verifyAndroidPermissions();
		if (!hasPermissions) {
			return;
		}

		const doc = await DocumentPicker.getDocumentAsync({ type: props.fileType, copyToCacheDirectory: false });
		if (doc.size > 10000000) {
			GlobalFunctions.showMessage('File Size Exceeded', 'File only upto 10 MB allowed');
			return;
		}

		if (doc.uri && doc.type === 'success') {

			if (props.fileType == FileType.Any && props.allowedMimeTypes != undefined) {
				const arrAllowedMimeTypes = props.allowedMimeTypes.split(',');
				const fileExtn = doc.name.split('.').pop();
				if (!arrAllowedMimeTypes.includes(fileExtn)) {
					GlobalFunctions.showMessage('Select any of these file types', props.allowedMimeTypes.replace(/,/ig, ", "));
					return;
				}
			}

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

			const extnByUri = GlobalFunctions.getFileType(localUri, false);
			if(extnByUri.extn == undefined) {
				localUri += '^.' + ft.extn;
			}

			//let filename = localUri.toString().replace(/%3a/ig, '/').replace(/%2f/ig, '/').split('/').pop();
			setInputValue(doc.name);
			props.value[props.name] = localUri;
			setInputError('');
			props.error[props.name] = '';
		}
	};

	return (
		<TouchableWithoutFeedback onPress={documentPickerHandler}>
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

export default MyFilePicker;

//expo install expo-document-picker