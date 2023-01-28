import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const MyCheckBox = props => {

	const [isChecked, setIsChecked] = useState(props.isChecked);

	useEffect(() => {
		setIsChecked(props.isChecked);
	}, [props])

	const changeCheckedStatus = () => {
		if (props.isDisabled) return;

		const newStatus = !isChecked;
		setIsChecked(newStatus);
		if (props.onCheckChanged) {
			props.onCheckChanged(newStatus);
		}
	}

	return (
		<TouchableWithoutFeedback onPress={changeCheckedStatus}>
			<View style={{ ...styles.touchable, ...props.style }}>
				<MaterialCommunityIcons name={isChecked ? "checkbox-outline" : "checkbox-blank-outline"}
					color={props.isDisabled ? Colors.gray : Colors.labelColor} size={20} />
				{
					props.title &&
					<Text style={styles.chkText}>{props.title}</Text>
				}
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	touchable: {
		flexDirection: 'row',
		marginVertical: 2,
		paddingVertical: 4,
		alignItems: 'center'
	},
	border: {
		borderWidth: 1,
		borderColor: Colors.black,
		padding: 0,
		paddingHorizontal: 0,
		paddingLeft: 0,
		paddingRight: 0
	},
	chkText: {
		fontFamily: 'Roboto',
		fontSize: 17,
		paddingHorizontal: 2
	}
})

export default MyCheckBox;