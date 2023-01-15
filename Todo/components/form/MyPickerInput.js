import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native'
//import { Picker } from '@react-native-picker/picker'
import { Picker } from 'react-native-picker-dropdown';

import Colors from '../../constants/Colors';
import { ValidationType, KeyboardType } from '../../constants/Enums';

const MyPickerInput = props => {

	const [inputValue, setInputValue] = useState(props.initialValue);
	const [inputError, setInputError] = useState('');
	const [inputRef, setInputRef] = useState();
	const [pickerEnabled, setPickerEnabled] = useState(true);

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
		setPickerEnabled(!props.submitting && (props.enabled === undefined || props.enabled === true));
	}, [props])

	const validateInput = value => {
		if ((value == '0' || value == undefined) && props.validationType == ValidationType.Required) {
			setInputError('This field is required');
			props.error[props.name] = 'This field is required';
		}
		else {
			setInputError('');
			props.error[props.name] = '';
		}
	}

	const valueChangeHandler = value => {
		setInputValue(value);
		props.value[props.name] = value;
		validateInput(value);
		if (props.onValueChange) {
			props.onValueChange(value);
		}
	}

	const renderPickerItems = () => {
		let items = [];
		let i = 0;

		if (props.firstItemTitle) {
			items.push(
				<Picker.Item
					key="0"
					label={props.firstItemTitle}
					value="0" />
			);
		} else if (props.showSelectOption == undefined || props.showSelectOption === true) {
			items.push(
				<Picker.Item
					key="0"
					label={"Select " + props.label}
					value="0" />
			);
		}

		for (i = 0; i < props.pickerData.length; i++) {
			items.push(
				<Picker.Item
					key={props.pickerData[i][props.pickerId]}
					label={props.pickerData[i][props.pickerValue]}
					value={props.pickerData[i][props.pickerId].toString()} />
			);
		}

		return items;
	}

	return (
		<View style={styles.container}>
			{
				props.hideLabel == undefined &&
				<View style={{ ...styles.title_and_error, ...props.labelContainerStyle }}>
					<Text style={{ ...styles.label, ...(inputError == undefined || inputError == '' ? styles.labelValid : styles.labelInvalid) }}>
						{props.label}
					</Text>
					<Text style={styles.errorMessage}>
						{props.showError == undefined || props.showError === true ? inputError : ''}
					</Text>
				</View>
			}
			<Picker
				{...props}
				style={{ ...styles.pickerContainer, ...(inputError == undefined || inputError == '' ? styles.inputValid : styles.inputInvalid) }}
				mode="dropdown"
				selectedValue={inputValue}
				onValueChange={(value) => valueChangeHandler(value)}
				textStyle={Platform.OS == 'ios' ? styles.pickerTextiOS : styles.pickerTextAndroid}
				arrowColor={Colors.black}
				enabled={pickerEnabled}
				ref={ref => setControlRef(ref)}
			>
				{renderPickerItems()}
			</Picker>
		</View>
	)

}

const styles = StyleSheet.create({
	container: {
		width: '100%'
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
	pickerTextAndroid: {
		flex: 1,
		fontFamily: 'Roboto',
		fontSize: 15,
		marginTop: -9
		//transform: [{ scaleX: 1 }, { scaleY: 1 }]
	},
	pickerTextiOS: {
		fontFamily: 'Roboto',
		fontSize: 15,
		//transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
	},
	pickerContainer: {
		height: 35,
		borderWidth: 1,
		borderColor: Colors.gray,
		fontFamily: 'Roboto',
		fontSize: 24,
		paddingLeft: Platform.OS === 'android' ? 0 : 8,
		paddingRight: Platform.OS === 'android' ? 0 : 8,
	}
})

export default MyPickerInput;