import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import SubmitButton from '../components/form/SubmitButton';
import CancelButton from '../components/form/CancelButton';

import MyTextInput from '../components/form/MyTextInput';
import MyPickerInput from '../components/form/MyPickerInput';
import { ValidationType, KeyboardType, CapitalizeType, UserType } from '../constants/Enums';
import * as GlobalFunctions from '../common/GlobalFunctions';

import * as signupAction from '../store/actions/signup';


const PriceDiscoveryScreen = props => {

	const { params } = props.route;

	const [isLoading, setIsLoading] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [locationFactors, setLocationFactors] = useState([]);
	const [quantityFactors, setQuantityFactors] = useState([]);
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [showRecalculate, setShowRecalculate] = useState(false);
	const [bestPrice, setBestPrice] = useState(0);

	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [formRefs, setFormRefs] = useState({});

	const animatedValue = useRef(new Animated.Value(0)).current;

	const dispatch = useDispatch();

	const fetchFactors = async () => {
		try {
			setIsLoading(true);

			const apiData = await dispatch(signupAction.getPriceFactors());
			setLocationFactors(apiData.LocationFactors);
			setQuantityFactors(apiData.QuantityFactors);
			setBestPrice(apiData.BestPrice);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	useEffect(() => {
		fetchFactors();
	}, [dispatch, props]);


	const submitClickHandler = () => {
		setIsSubmitting(true);
		setTimeout(() => {
			submitDetails();
		}, 50);
	}

	const submitDetails = async () => {
		let formValidated = true;

		for (let fe in formErrors) {
			if (formErrors[fe] != '') {
				console.log(fe + ' - ' + formErrors[fe]);
				formValidated = false;
				break;
			}
		}

		if (!formValidated) {
			GlobalFunctions.showErrorToast(() => setIsSubmitting(false));
			return;
		}

		setShowButtonLoader(true);

		setTimeout(() => {
			showPrice();
		}, 1000);

	}

	const showPrice = () => {

		const cityId = parseInt(formValues['city_id']);
		const enteredQty = parseFloat(formValues['quantity']);
		let qty = parseFloat(formValues['quantity']);

		if (qty % 5 != 0) {
			qty = parseInt(qty / 10) * 10;
		}

		const locData = locationFactors.find(x => parseInt(x.id) == cityId);
		const qtyData = quantityFactors.find(x => parseFloat(x.quantity) >= qty);

		if (locData != undefined && qtyData != undefined) {

			const locFactor = parseFloat(locData.factor);
			const qtyFactor = parseFloat(qtyData.factor);

			const price = (bestPrice - locFactor) * qtyFactor;

			setPrice(price.toFixed(2));
			setQuantity(enteredQty);

			Animated.spring(
				animatedValue,
				{
					toValue: 1,
					friction: 1,
					duration: 500,
					useNativeDriver: true,
					easing: Easing.ease
				}
			).start();

			showRecalcButton();
		} else {
			GlobalFunctions.showMessage('Unable To Fetch Price', 'Please try again later or contact to our support team.');
		}

		setShowButtonLoader(false);
		setIsSubmitting(false);

	}

	const showRecalcButton = () => {
		setTimeout(() => {
			setShowRecalculate(true);
		}, 3000);
	}

	const cancelClickHandler = () => {
		props.navigation.navigate('Login', { token: 'refresh' });
	}

	const recalculateClickHandler = () => {
		setShowRecalculate(false);
		setPrice(0);
	}

	const requestBookingClickHandler = () => {
		Alert.alert(
			'Submit Request ?',
			'Are you sure you want to submit a pickup request ?\nOur team will be informed for the same and you will be contacted soon',
			[
				{ text: 'No', onPress: () => { } },
				{ text: 'Yes', onPress: () => { requestBooking(); } },
			],
			{
				cancelable: true
			}
		);
	}

	const requestBooking = () => {
		try {
			GlobalFunctions.showToast("Sent");
			dispatch(signupAction.sendPickupRequest(params.id, formValues['city_id'], formValues['quantity']));
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}


	return (
		<View style={styles.container}>
			{
				parseFloat(price) == 0 &&
				<>
					<Image style={styles.logo} source={require('../assets/logo.png')} />

					<View style={styles.formHeader}>
						<Text style={styles.heading}>Price Calculator</Text>
					</View>

					<MyPickerInput name="city_id" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['city_id']}
						label="City/Nearest City" pickerData={locationFactors} pickerId="id" pickerValue="city" validationType={ValidationType.Required}
						refs={formRefs} returnKeyType="done" firstItemTitle="Select One" />


					<MyTextInput name="quantity" value={formValues} error={formErrors} submitting={isSubmitting} initialValue={formValues['quantity']}
						label="Oil Quantity (Kg)" keyboardType={KeyboardType.Number} autoCapitalize={CapitalizeType.None}
						refs={formRefs} returnKeyType="done" maxLength={6} validationType={ValidationType.NumberRequired} />


					<View style={styles.formFooter}>
						<SubmitButton title="Calculate" onPress={submitClickHandler} IsLoading={showButtonLoader} />
						<CancelButton title="Cancel" onPress={cancelClickHandler} />
					</View>
				</>
			}
			{
				parseFloat(price) > 0 &&
				<>
					<View style={styles.price}>
						<Animated.View
							style={{
								transform: [{ scale: animatedValue }],
								justifyContent: 'center',
								alignItems: 'center',
								borderWidth: 10,
								borderColor: '#ffb210',
								height: 220,
								width: 220,
								borderRadius: 220,
								backgroundColor: '#169514'
							}}>
							<Text style={styles.priceText}>Price Would Be {"\n"}Rs. {price}/-{"\n"} for {quantity} kg</Text>
						</Animated.View>


					</View>
					<View style={styles.recalc}>
						{
							showRecalculate &&
							<>
								<TouchableWithoutFeedback onPress={recalculateClickHandler}>
									<Text style={styles.signupText}>Re-Calculate</Text>
								</TouchableWithoutFeedback>

								<TouchableWithoutFeedback onPress={requestBookingClickHandler}>
									<Text style={styles.signupText}>Request Booking</Text>
								</TouchableWithoutFeedback>

								<TouchableWithoutFeedback onPress={cancelClickHandler}>
									<Text style={{ ...styles.signupText, color: Colors.danger }}>Close</Text>
								</TouchableWithoutFeedback>
							</>
						}
					</View>
				</>


			}
		</View>
	);

}


const styles = StyleSheet.create({
	recalc: {
		width: '100%',
		marginVertical: 5,
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'row',
		height: 45
	},
	price: {
		marginTop: 20,
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	priceText: {
		fontFamily: 'Roboto_bold',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 20,
		lineHeight: 40,
		color: Colors.white
	},
	signupText: {
		paddingVertical: 5,
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
		fontSize: 16,
		color: Colors.darkGreen,
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1,
		paddingLeft: 10,
		paddingRight: 10,
		alignItems: "center"
	},
	logo: {
		width: 90,
		height: 90,
		marginTop: 20,
		marginBottom: 20
	},
	formHeader: {
		width: '100%',
		borderBottomColor: Colors.gray,
		borderBottomWidth: 0,
		marginTop: 10,
		alignItems: 'center',
		paddingVertical: 5,
		backgroundColor: Colors.successLight
	},
	heading: {
		fontSize: 20,
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
	},
	formFooter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		borderTopColor: Colors.gray,
		borderTopWidth: 0,
		marginVertical: 10,
		paddingTop: 10
	}
})


export default PriceDiscoveryScreen;