import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors';
import { ValidationType } from '../../constants/Enums';

const MyTextInput = props => {

	const [inputValue, setInputValue] = useState(props.initialValue);
	const [inputError, setInputError] = useState('');
	const [inputRef, setInputRef] = useState();

	const setControlRef = ref => {
		setInputRef(ref);
		if (props.refs) {
			props.refs[props.name] = ref;
		}
	}

	useEffect(() => {
		if (props.initialValue != undefined && props.initialValue != '') {
			setInputValue(props.initialValue);
			props.value[props.name] = props.initialValue;
		}
		if (props.submitting) {
			validateInput(inputValue);
		}
		if (props.resetting) {
			setInputValue('');
			props.value[props.name] = '';
		}
	}, [props])

	const validateInput = enteredText => {
		if (props.validationType == ValidationType.Required) {
			if (enteredText == '' || enteredText == undefined) {
				setInputError('This field is required');
				props.error[props.name] = 'This field is required';
			} else {
				setInputError('');
				props.error[props.name] = '';
			}
		}
		else if (enteredText != '' && enteredText != undefined && (props.validationType == ValidationType.Email || props.validationType == ValidationType.EmailRequired)) {
			const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!emailRegex.test(enteredText.toLowerCase())) {
				setInputError('Enter valid email');
				props.error[props.name] = 'Enter valid email';
			} else {
				setInputError('');
				props.error[props.name] = '';
			}
		}
		else if (props.validationType == ValidationType.EmailRequired) {
			if (enteredText == '' || enteredText == undefined) {
				setInputError('This field is required');
				props.error[props.name] = 'This field is required';
			} else {
				setInputError('');
				props.error[props.name] = '';
			}
		}
		else if (enteredText != '' && enteredText != undefined && (props.validationType == ValidationType.Mobile || props.validationType == ValidationType.MobileRequired)) {
			const mobileRegex = /^[0-9]{10}$/g;
			if (!mobileRegex.test(enteredText.toLowerCase())) {
				setInputError('Enter valid mobile');
				props.error[props.name] = 'Enter valid mobile';
			} else {
				setInputError('');
				props.error[props.name] = '';
			}
		}
		else if (props.validationType == ValidationType.MobileRequired) {
			if (enteredText == '' || enteredText == undefined) {
				setInputError('This field is required');
				props.error[props.name] = 'This field is required';
			} else {
				setInputError('');
				props.error[props.name] = '';
			}
		}
		else if (enteredText != '' && enteredText != '0' && enteredText != undefined && (props.validationType == ValidationType.Number || props.validationType == ValidationType.NumberRequired)) {
			const numberRegex = /^\d+$/;
			if (!numberRegex.test(enteredText.toLowerCase())) {
				setInputError('Enter valid input');
				props.error[props.name] = 'Enter valid input';
			} else {
				setInputError('');
				props.error[props.name] = '';
			}
		}
		else if (props.validationType == ValidationType.NumberRequired) {
			if (enteredText == '' || enteredText == '0' || enteredText == undefined) {
				setInputError('This field is required');
				props.error[props.name] = 'This field is required';
			} else {
				setInputError('');
				props.error[props.name] = '';
			}
		}
		else if (enteredText != '' && enteredText != '0' && enteredText != undefined && (props.validationType == ValidationType.Decimal || props.validationType == ValidationType.DecimalRequired)) {
			const decimalRegex = /^\d+(\.\d{1,2})?$/;
			if (!decimalRegex.test(enteredText.toLowerCase())) {
				setInputError('Enter valid input');
				props.error[props.name] = 'Enter valid input';
			} else {
				setInputError('');
				props.error[props.name] = '';
			}
		}
		else if (props.validationType == ValidationType.DecimalRequired) {
			if (enteredText == '' || enteredText == undefined) {
				setInputError('This field is required');
				props.error[props.name] = 'This field is required';
			} else {
				setInputError('');
				props.error[props.name] = '';
			}
		}
		else if (enteredText != '' && enteredText != undefined && (props.validationType == ValidationType.MinLength || props.validationType == ValidationType.MinLengthRequired)
			&& enteredText.trim().length < props.minLength) {
			setInputError('Enter valid input');
			props.error[props.name] = 'Enter valid input';
		}
		else if (props.validationType == ValidationType.MinLengthRequired) {
			if (enteredText == '' || enteredText == undefined) {
				setInputError('This field is required');
				props.error[props.name] = 'This field is required';
			} else {
				setInputError('');
				props.error[props.name] = '';
			}
		}
		else {
			setInputError('');
			props.error[props.name] = '';
		}
	}

	const textChangeHandler = text => {
		setInputValue(text);
		props.value[props.name] = text;
		validateInput(text);
		if (props.OnTextChanged) {
			props.OnTextChanged(text);
		}
	}

	const moveToNextCtl = () => {
		if (props.nextCtl && props.refs) {
			props.refs[props.nextCtl].focus();
		}
	}

	return (
		<View style={styles.container}>
			<View style={{ ...styles.title_and_error, ...props.labelContainerStyle }}>
				<Text style={{ ...styles.label, ...(inputError == undefined || inputError == '' ? styles.labelValid : styles.labelInvalid) }}>
					{props.label}
				</Text>
				<Text style={styles.errorMessage}>
					{props.showError == undefined || props.showError === true ? inputError : ''}
				</Text>
			</View>
			<TextInput
				{...props}
				style={{
					...(props.multiline ? styles.multiline : styles.input),
					...(inputError == undefined || inputError == '' ? styles.inputValid : styles.inputInvalid),
					minHeight: (props.multiline && props.numberOfLines ? 27 * props.numberOfLines : 35),
				}}
				placeholder={props.placeholder}
				onChangeText={textChangeHandler}
				secureTextEntry={props.name.indexOf('password', 0) > -1}
				value={inputValue}
				editable={!props.submitting}
				returnKeyType={props.returnKeyType != undefined ? props.returnKeyType : "next"}
				ref={ref => setControlRef(ref)}
				onSubmitEditing={moveToNextCtl}
				blurOnSubmit={!props.multiline && props.nextCtl == undefined}
			/>
		</View>
	)

}

const styles = StyleSheet.create({
	container: {
		width: '100%',
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
	input: {
		paddingHorizontal: 10,
		paddingVertical: Platform.OS === 'ios' ? 7 : 2,
		fontFamily: 'Roboto',
		fontSize: 15.5
	},
	multiline: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		textAlignVertical: 'top',
		fontFamily: 'Roboto',
		fontSize: 15.5,
		lineHeight: 25
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
	}
})

export default MyTextInput;