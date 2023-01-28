import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, StatusBar, Platform, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getStatusBarHeight } from 'react-native-status-bar-height';

import { enableScreens } from 'react-native-screens';
import { MenuProvider } from 'react-native-popup-menu';

import { applyMiddleware } from 'redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import Constants from 'expo-constants';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
//import AppLoading from 'expo-app-loading';

import { UserType } from './constants/Enums';
import AppNavigator from './navigation/AppNavigator';
import Variables from './constants/Variables';

import dashboardReducer from './store/reducers/dashboard';
import collectionRequestReducer from './store/reducers/collectionrequest';
import factoryReducer from './store/reducers/factory';
import firmtypesReducer from './store/reducers/firmtypes';
import loginReducer from './store/reducers/login';
import stateReducer from './store/reducers/states';
import transporterReducer from './store/reducers/transporter';
import userReducer from './store/reducers/user';
import userAddressReducer from './store/reducers/useraddress';
import userDocumentReducer from './store/reducers/userdocument';
import warehouseReducer from './store/reducers/warehouse';
import outwardTransactionReducer from './store/reducers/outwardtransaction';
import inwardTransactionReducer from './store/reducers/inwardtransaction';
import warehouseDocumentReducer from './store/reducers/warehousedocument';
import outwardDocumentReducer from './store/reducers/outwarddocument';
import reportReducer from './store/reducers/report';
import signupReducer from './store/reducers/signup';

import Colors from './constants/Colors';
import * as loginActions from './store/actions/login';
import * as versionAction from './store/actions/version';
import * as notificationManager from './common/NotificationManager';
import * as globalFunctions from './common/GlobalFunctions';

enableScreens();

const rootReducer = combineReducers({
	dashboard: dashboardReducer,
	collectionrequests: collectionRequestReducer,
	factories: factoryReducer,
	firmtypes: firmtypesReducer,
	login: loginReducer,
	states: stateReducer,
	transporters: transporterReducer,
	users: userReducer,
	useraddresses: userAddressReducer,
	userdocuments: userDocumentReducer,
	warehouses: warehouseReducer,
	outwardtransactions: outwardTransactionReducer,
	inwardtransactions: inwardTransactionReducer,
	warehousedocuments: warehouseDocumentReducer,
	outwarddocuments: outwardDocumentReducer,
	report: reportReducer,
	signups: signupReducer
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		immutableCheck: false,
		serializableCheck: false,
	})
});

export default function App() {

	const [isReady, setIsReady] = useState(false);

	let localAndroVersion = 0;
	let serverAndroVersion = 0;
	let localIosVersion = 0;
	let serverIosVersion = 0;

	const loginUserData = store.getState().login;

	const MyStatusBar = ({ backgroundColor, ...props }) => (
		<View style={[styles.statusBar, { backgroundColor }]}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	);

	const fetchFonts = async () => {
		return Font.loadAsync({
			'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
			'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
			'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
			'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
			'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
			'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
			'Roboto': require('./assets/fonts/Roboto.ttf'),
			'Roboto_medium': require('./assets/fonts/Roboto_medium.ttf'),
			'Roboto_bold': require('./assets/fonts/Roboto_bold.ttf')
		});
	};

	notificationManager.setupPushNotification();

	const promptForUpdate = () => {
		setTimeout(() => {
			if (Platform.OS === 'android' && localAndroVersion < serverAndroVersion) {
				globalFunctions.showAndroidUpdateMessage();
			} else if (Platform.OS === 'ios' && localIosVersion < serverIosVersion) {
				globalFunctions.showIosUpdateMessage();
			}
		}, 1000);
	}

	const tryLogin = async () => {

		try {
			const objVersion = await store.dispatch(versionAction.getVersion());
			localAndroVersion = parseInt(Constants.manifest.android.versionCode);
			serverAndroVersion = parseInt(objVersion.android);
			localIosVersion = parseInt(parseFloat(Constants.manifest.ios.buildNumber) * 100);
			serverIosVersion = parseInt(parseFloat(objVersion.ios) * 100);

			const userData = await AsyncStorage.getItem('userData');
			if (!userData) {
				setTimeout(() => {
					setIsReady(true);
					SplashScreen.hideAsync();
					promptForUpdate();
				}, 3000);
			}
			else {
				const objData = JSON.parse(userData);
				const { mobile, password } = objData;
				let action = loginActions.login(mobile, password);
				try {
					const userData = await store.dispatch(action);
					setIsReady(true);
					SplashScreen.hideAsync();
					promptForUpdate();
					const userType = parseInt(userData.type);
					Variables.LoginUserId = parseInt(userData.id);
					Variables.LoginUserType = parseInt(userData.type);
				} catch (err) {
					//Alert.alert('An Error Occurred!', err.toString(), [{ text: 'Okay' }]);
					console.log(err);
					setIsReady(true);
					SplashScreen.hideAsync();
					promptForUpdate();
				}
			}
		} catch (err1) {
			//Alert.alert('An Error Occurred!', err1.toString(), [{ text: 'Okay' }]);
			console.log(err1);
		}

	};

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();
				await fetchFonts();
				await tryLogin();
			} catch (e) {
				console.log('error in prepare - ' + e);
			}
		}
		prepare();
	}, [isReady]);

	if (!isReady) {
		return null;
	}

	return (
		<Provider store={store}>
			<MenuProvider style={styles.menuProvider}>
				<MyStatusBar backgroundColor={Colors.primaryDark} style="light" />
				<AppNavigator userType={loginUserData.UserType} />
			</MenuProvider>
		</Provider>
	);

}



const STATUSBAR_HEIGHT = getStatusBarHeight();

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: 225,
		height: 225
	},
	statusBar: {
		height: STATUSBAR_HEIGHT,
	},
});

//set REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.3
//set REACT_NATIVE_PACKAGER_HOSTNAME=192.168.43.29