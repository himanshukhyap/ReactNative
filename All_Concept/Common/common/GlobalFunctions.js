import { Alert, Linking, Platform } from 'react-native';
import Toast from 'react-native-tiny-toast';

import Variables from '../constants/Variables';
import Colors from '../constants/Colors';

import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as IntentLauncher from 'expo-intent-launcher';

import * as FileSystem from 'expo-file-system';

export const isEmpty = input => {
	if (input.trim() == '') {
		return true;
	}
	return false;
}

export const navigate = (props, routeName) => {
	props.navigation.reset({
		index: 0,
		routes: [{ name: routeName, params: { token: 'refresh' } }]
	});
}

export const isEmptyOrZero = input => {
	if (input.trim() == '') {
		return true;
	}

	if (parseInt(input) == 0) {
		return true;
	}

	return false;
}

export const showMessage = (title, message, callbackFunction = undefined, okparams = undefined) => {
	if (Platform.OS === 'ios') {
		message = '\n' + message;
	}
	Alert.alert(title, message,
		[
			{ text: 'Okay', onPress: () => { if (callbackFunction != undefined) { callbackFunction(okparams); } } },
		],
		{
			cancelable: false
		}
	);
}

export const getFileType = (fileName, showError = true) => {

	const mimes = [
		{ 'extn': 'gif', 'mime': 'image/gif' },
		{ 'extn': 'jpg', 'mime': 'image/jpeg' },
		{ 'extn': 'jpeg', 'mime': 'image/jpeg' },
		{ 'extn': 'png', 'mime': 'image/png' },
		{ 'extn': 'doc', 'mime': 'application/msword' },
		{ 'extn': 'docx', 'mime': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
		{ 'extn': 'xls', 'mime': 'application/excel' },
		{ 'extn': 'xlsx', 'mime': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
		{ 'extn': 'ppt', 'mime': 'application/vnd.ms-powerpoint' },
		{ 'extn': 'pptx', 'mime': 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
		{ 'extn': 'pps', 'mime': 'application/vnd.ms-powerpoint' },
		{ 'extn': 'ppsx', 'mime': 'application/vnd.openxmlformats-officedocument.presentationml.slideshow' },
		{ 'extn': 'pdf', 'mime': 'application/pdf' },
		{ 'extn': 'txt', 'mime': 'text/plain' },
		{ 'extn': 'rtf', 'mime': 'application/rtf' },
		{ 'extn': 'zip', 'mime': 'application/zip' },
		{ 'extn': 'rar', 'mime': 'application/vnd.rar' },
		{ 'extn': 'mov', 'mime': 'video/quicktime' },
		{ 'extn': 'mp4', 'mime': 'video/mp4' }
	];

	const fileExtn = fileName.split('.').pop();
	const result = mimes.filter(x => x.extn == fileExtn);

	if (result.length > 0) {
		return result[0];
	} else {
		if (showError) {
			showMessage('Invalid File', 'Allowed files types are: \n\njpg, jpeg, png, gif, doc, docx, xls, xlsx, ppt, pptx, pps, ppsx, pdf, txt, zip, rar, mov, mp4\n');
		}
		return {};
	}

}

export const getFileInfo = async (fileUri, showError = true) => {

	let result = getFileType(fileUri, showError);

	if (result.extn != undefined) {

		if (fileUri.indexOf('^', 0) > -1) {
			result['uri'] = fileUri.substring(0, fileUri.indexOf('^', 0));
		} else {
			result['uri'] = fileUri;
		}

		const fileInfo = await FileSystem.getInfoAsync(result['uri']);
		result['size'] = fileInfo.size;
		result['isDirectory'] = fileInfo.isDirectory;
		result['exists'] = fileInfo.exists;

		return result;
	} else {
		if (showError) {
			showMessage('Invalid File', 'Allowed files types are: \n\njpg, jpeg, png, gif, doc, docx, xls, xlsx, ppt, pptx, pps, ppsx, pdf, txt, zip, rar, mov, mp4\n');
		}
		return {};
	}

}

export const getGatePassImageUri = (image_name) => {
	const baseUrl = Variables.IsLive ? Variables.LiveApiBaseUrl : Variables.LocalApiBaseUrl;
	if (image_name == '') {
		return baseUrl + Variables.NoImageAvailableUrl;
	} else {
		return baseUrl + Variables.GatePassImageUrl + image_name;
	}
}

export const getImageUri = (uri) => {
	const baseUrl = Variables.IsLive ? Variables.LiveApiBaseUrl : Variables.LocalApiBaseUrl;
	return baseUrl + uri;
}

export const getNoImageAvailableUri = (image_name) => {
	const baseUrl = Variables.IsLive ? Variables.LiveApiBaseUrl : Variables.LocalApiBaseUrl;
	return baseUrl + Variables.NoImageAvailableUrl;
}


export const openLiveFile = (source_folder_name, source_file_name) => {
	const baseUrl = Variables.IsLive ? Variables.LiveApiBaseUrl : Variables.LocalApiBaseUrl;
	const liveFileUri = baseUrl + 'assets/uploads/' + source_folder_name + '/' + source_file_name;
	Linking.canOpenURL(liveFileUri).then(supported => {
		if (supported) {
			Linking.openURL(liveFileUri);
		}
		else {
			Toast.show('Unable to open file, may be the file was removed', {
				position: Toast.position.BOTTOM,
				duration: 800,
				containerStyle: {
					backgroundColor: Colors.danger,
					paddingHorizontal: 25
				}
			});
		}
	});
}

export const downloadReport = (fileName) => {
	const baseUrl = Variables.IsLive ? Variables.LiveApiBaseUrl : Variables.LocalApiBaseUrl;
	const liveFileUri = baseUrl + 'downloads/' + fileName;
	Linking.canOpenURL(liveFileUri).then(supported => {
		if (supported) {
			Linking.openURL(liveFileUri);
		}
		else {
			Toast.show('Unable to open file, may be the file was removed', {
				position: Toast.position.BOTTOM,
				duration: 800,
				containerStyle: {
					backgroundColor: Colors.danger,
					paddingHorizontal: 25
				}
			});
		}
	});
}

export const showErrorToast = (callbackFunction, errorText = Variables.ValidationErrorText) => {
	Toast.show(errorText, {
		position: Toast.position.BOTTOM,
		duration: 800,
		containerStyle: {
			backgroundColor: Colors.danger,
			paddingHorizontal: 25
		},
		onHidden: () => {
			if (callbackFunction != undefined) {
				callbackFunction();
			}
		}
	});
}

export const showToast = (message, showDuration = 800) => {
	Toast.show(message, {
		position: Toast.position.BOTTOM,
		duration: showDuration,
		containerStyle: {
			backgroundColor: Colors.black,
			paddingHorizontal: 25
		}
	});
}

export const showDeleteConfirmation = callbackFunction => {
	Alert.alert(
		'Deleting Record ?',
		'Are you sure you want to delete this record ?',
		[
			{ text: 'No', onPress: () => { } },
			{ text: 'Yes', onPress: () => { callbackFunction(); } },
		],
		{
			cancelable: true
		}
	);
}

export const showAndroidUpdateMessage = callbackFunction => {
	Alert.alert(
		'New Version Available',
		'Please update your app from Play Store to get the new version of this app',
		[
			{ text: 'Okay', onPress: () => { openUrl('https://play.google.com/store/apps/details?id=' + Constants.manifest.android.package + '&v=' + Constants.manifest.android.versionCode, 'Play Store'); } },
		],
		{
			cancelable: false
		}
	);
}

export const showIosUpdateMessage = callbackFunction => {
	Alert.alert(
		'New Version Available',
		'Please update your app from App Store to get the new version of this app',
		[
			{ text: 'Okay', onPress: () => { openUrl('https://apps.apple.com/app/id1599833626?v=' + Constants.manifest.ios.buildNumber, 'App Store'); } },
		],
		{
			cancelable: false
		}
	);
}

export const openUrl = (liveUri, urlName) => {
	Linking.canOpenURL(liveUri).then(supported => {
		if (supported) {
			Linking.openURL(liveUri);
		}
		else {
			Toast.show('Unable to open ' + urlName, {
				position: Toast.position.BOTTOM,
				duration: 800,
				containerStyle: {
					backgroundColor: Colors.danger,
					paddingHorizontal: 25
				},
				onHidden: () => {
					console.log('ooo');
				}
			});
		}
	});
}

export const openWhatsApp = (mobile, message) => {
	let waUrl = 'whatsapp://send?text=' + message + '&phone=91' + mobile;
	Linking.canOpenURL(waUrl).then(supported => {
		if (supported) {
			Linking.openURL(waUrl);
		}
		else {
			Toast.show('Unable to open WhatsApp, Please message manually on ' + mobile, {
				position: Toast.position.BOTTOM,
				duration: 2000,
				containerStyle: {
					backgroundColor: Colors.danger,
					paddingHorizontal: 25
				}
			});
		}
	});
}

export const dialPhone = number => {
	let phoneNumber = '';

	if (Platform.OS === 'android') {
		phoneNumber = 'tel:${' + number + '}';
	}
	else {
		phoneNumber = 'telprompt:${' + number + '}';
	}
	Linking.openURL(phoneNumber);
}

export const showLocationDisclosure = callbackFunction => {
	Alert.alert(
		'Require Location Access',
		'We need to track your location while you are using the app and also in the background even when the app is closed and not in use. ' + '\n\n' +
		'App collects location data to enable your attendance & working area so that leads & collection process can be optimized.',
		[
			{ text: 'Okay', onPress: () => { callbackFunction(); } }
		],
		{
			cancelable: false
		}
	);
}

export const verifyLocationPermission = async () => {
	const foreground = await Location.requestForegroundPermissionsAsync()
	if (foreground.granted) {
		await Location.requestBackgroundPermissionsAsync()
	}

	foregroundPermissionResult = await Location.getForegroundPermissionsAsync();
	backgroundPermissionResult = await Location.getBackgroundPermissionsAsync();

	if (foregroundPermissionResult.granted && backgroundPermissionResult.granted) {
		console.log('loc perm granted');
		Variables.LocationTrackingAllowed = true;
	} else {
		console.log('loc perm missing');
		Variables.LocationTrackingAllowed = false;
	}

	if (!Variables.LocationTrackingAllowed) {
		showLocationPermissionMessage();
	}
}

export const getHMSTime = () => {
	const currentTime = new Date();
	const hrs = currentTime.getHours().toString();
	const min = currentTime.getMinutes() < 10 ? '0' + currentTime.getMinutes().toString() : currentTime.getMinutes().toString();
	const sec = currentTime.getSeconds() < 10 ? '0' + currentTime.getSeconds().toString() : currentTime.getSeconds().toString();
	return parseInt(hrs + min + sec);
}

export const showLocationPermissionMessage = () => {
	Alert.alert(
		'Location Permission',
		'Location permission is required for you in order to use this application',
		[
			{ text: 'Okay', onPress: () => { openAppSettings(); } },
		],
		{
			cancelable: false
		}
	);
}

export const openAppSettings = () => {
	if (Platform.OS === 'ios') {
		Linking.openURL('app-settings:')
	} else {
		const pkg = 'com.arises.knp';
		IntentLauncher.startActivityAsync(
			IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
			{ data: 'package:' + pkg },
		)
	}
}