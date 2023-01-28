import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, Image, Alert, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getStatusBarHeight } from 'react-native-status-bar-height';

import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import * as GlobalFunctions from '../common/GlobalFunctions';
import * as loginActions from '../store/actions/login';
import { UserType } from '../constants/Enums';
import Variables from '../constants/Variables';

const STATUSBAR_HEIGHT = getStatusBarHeight();
const LoginScreen = props => {

	const [isLoading, setIsLoading] = useState(false);
	const [enteredMobile, setEnteredMobile] = useState('');
	const [enteredPassword, setEnteredPassword] = useState('');
	const [passwordRef, setPasswordRef] = useState();
	const [changedStyle, setChangedStyle] = useState();

	const dispatch = useDispatch();

	const userType = useSelector(state => state.login.UserType);

	const mobileInputHandler = inputText => {
		setEnteredMobile(inputText);
	}

	const passwordInputHandler = inputText => {
		setEnteredPassword(inputText);
	}

	const loginButtonClickHandler = async () => {

		if (enteredMobile == '') {
			Alert.alert('Enter Mobile', 'Please enter your mobile number', [{ text: 'Okay' }]);
			return;
		}

		/*if (enteredMobile.length != 10) {
			Alert.alert('Enter Valid Mobile', 'Please enter valid mobile number', [{ text: 'Okay' }]);
			return;
		}*/

		if (enteredPassword == '') {
			Alert.alert('Enter Password', 'Please enter your password', [{ text: 'Okay' }]);
			return;
		}

		setIsLoading(true);
		try {
			const userData = await dispatch(loginActions.login(enteredMobile, enteredPassword));
			//const userData = await AsyncStorage.getItem('userData');
			setIsLoading(false);
			//const objData = JSON.parse(userData);
			//const { mobile, password, userId, userType, reqAtt, monitorLoc } = objData;

			const userType = parseInt(userData.type);
			Variables.LoginUserId = parseInt(userData.id);
			Variables.LoginUserType = parseInt(userData.type);

			if (userType == UserType.Admin) {
				Variables.LocationTrackingAllowed = false;
				GlobalFunctions.navigate(props, 'Admin');
			}
			else if (userType == UserType.Vendor) {
				Variables.LocationTrackingAllowed = false;
				GlobalFunctions.navigate(props, 'Vendor');
			}
			else if (userType == UserType.LogisticManager) {
				Variables.LocationTrackingAllowed = false;
				GlobalFunctions.navigate(props, 'Logistic');
			}
			else if (userType == UserType.PDA) {
				GlobalFunctions.navigate(props, 'Pda');
			}
			else if (userType == UserType.WarehouseManager) {
				Variables.LocationTrackingAllowed = false;
				GlobalFunctions.navigate(props, 'Warehouse');
			}
			else if (userType == UserType.Marketing) {
				GlobalFunctions.navigate(props, 'Marketing');
			}
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	};

	const forgotPasswordClickHandler = () => {
		props.navigation.navigate('ForgotPassword');
	}

	const signupClickHandler = () => {
		props.navigation.navigate('Otp');
		//props.navigation.navigate('PriceDiscovery', { 'id': 2 });
	}

	const whatspppClickHandler = () => {
		const message = '*Name:*\r\n\r\n' +
			'*Company Name and Address:*\r\n\r\n' +
			'*Oil Quantity for Pickup*\r\n\r\n';
		GlobalFunctions.openWhatsApp(Variables.WhatsAppNo, message);
	}

	const callClickHandler = () => {
		GlobalFunctions.dialPhone('18008903841');
	}

	return (
		 <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1}}>
			<View style={styles.container}>
				{/* <StatusBar backgroundColor={Colors.primaryDark} translucent={true} /> */}

				<Image style={styles.logo} source={require('../assets/logo.png')} />

				<View style={styles.loginSection}>

					<View style={styles.textBoxWithIconContainer}>
						<Ionicons name="md-person" size={24} color={Colors.darkGreen} style={{ width: 25 }} />
						<TextInput style={styles.textBox}
							placeholder="Mobile"
							returnKeyType="next"
							onChangeText={mobileInputHandler}
							onSubmitEditing={() => passwordRef.focus()}
							keyboardType="numeric"
							autoCapitalize="none"
							maxLength={10} />
					</View>

					<View style={styles.textBoxWithIconContainer}>
						<FontAwesome name="lock" size={26} color={Colors.darkGreen} style={{ width: 25, marginLeft: 3 }} />
						<TextInput
							style={styles.textBox}
							placeholder="Password"
							secureTextEntry={true}
							ref={ref => setPasswordRef(ref)}
							onChangeText={passwordInputHandler} />
					</View>

					<View>
						<TouchableWithoutFeedback onPress={forgotPasswordClickHandler}>
							<Text style={{ ...styles.forgotText, ...changedStyle }} >Forgot Password ?</Text>
						</TouchableWithoutFeedback>
					</View>

					<View style={styles.buttonContainer}>
						<TouchableOpacity disabled={isLoading} style={styles.loginButton} onPress={loginButtonClickHandler}>
							{isLoading ?
								<View style={styles.container}>
									<ActivityIndicator size="small" color={Colors.white} />
								</View> :
								<View style={styles.buttonWithIcon}>
									<Text style={styles.loginText}>LOGIN</Text>
									<Ionicons name="md-log-in" size={24} color={Colors.white} />
								</View>
							}
						</TouchableOpacity>

					</View>
					<View style={{ marginTop: 20, alignItems: 'center' }}>
						<TouchableWithoutFeedback onPress={signupClickHandler}>
							<Text style={styles.signupText}>New Vendor ? Register Now</Text>
						</TouchableWithoutFeedback>
					</View>
				</View>

				<View style={styles.bottomStrip}>
					<View style={{ flex: 1 }}>
						<TouchableWithoutFeedback onPress={callClickHandler}>
							<Image style={styles.wa_call} source={require('../assets/call.png')} />
						</TouchableWithoutFeedback>
					</View>
					<View style={{ flex: 1, alignItems: 'flex-end' }}>
						<TouchableWithoutFeedback onPress={whatspppClickHandler}>
							<Image style={styles.wa_call} source={require('../assets/whatsapp.png')} />
						</TouchableWithoutFeedback>
					</View>
				</View>

			</View>
		 </ScrollView>

	);
}


const styles = StyleSheet.create({
	wa_call: {
		width: 170,
		height: 40,
		resizeMode: 'contain'
	},
	container: {
		width: '100%',
		flex: 1,
		alignItems: "center",
	},
	loginSection: {
		width: '80%',
		flex: 1,
		flexDirection: 'column',
		marginTop: 10
	},
	bottomStrip: {
		width: '100%',
		height: 40,
		marginTop: 20,
		justifyContent: 'space-between',
		flexDirection: 'row'
	},
	screen: {
		flex: 1
	},
	logo: {
		width: 130,
		height: 130,
		marginTop: 50
	},
	textBoxWithIconContainer: {
		height: 30,
		flexDirection: 'row',
		marginTop: 40,
		borderBottomColor: Colors.darkGreen,
		borderBottomWidth: 2
	},
	textBox: {
		width: '100%',
		paddingLeft: 10,
		paddingRight: 50,
		fontSize: 18
	},
	buttonContainer: {
		width: '100%',
		height: 50,
		alignItems: "center",
		marginTop: 30,
	},
	loginButton: {
		width: 120,
		height: 40,
		alignItems: "flex-start",
		justifyContent: "space-between",
		color: Colors.white,
		backgroundColor: Colors.darkGreen,
		paddingRight: 10,
		paddingLeft: 10,
		paddingTop: 10,
		flexDirection: 'row'
	},
	buttonWithIcon: {
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		justifyContent: "space-between"
	},
	loginText: {
		color: Colors.white,
		fontSize: 18,
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
	},
	forgotText: {
		paddingVertical: 3,
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
		textAlign: 'right',
		color: Colors.red
	},
	signupText: {
		paddingVertical: 3,
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
		color: Colors.darkGreen,
	},
	troubleText: {
		paddingVertical: 3,
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
		color: Colors.danger,
	}
})


export default LoginScreen;
