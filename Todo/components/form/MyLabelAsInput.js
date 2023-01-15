import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors';

const MyLabelAsInput = props => {

	const [inputValue, setInputValue] = useState(props.initialValue);

	useEffect(() => {
		setInputValue(props.initialValue);
	}, [props])

	return (
		<View style={styles.container}>
			<View style={styles.title}>
				<Text style={styles.label}>
					{props.label}
				</Text>
			</View>
			<Text style={styles.input}>
				{inputValue}
			</Text>
		</View>
	)

}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	title: {
		flexDirection: 'row',
		marginTop: 15,
		justifyContent: 'space-between'
	},
	label: {
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
		fontSize: 15,
		color: Colors.black2
	},
	input: {
		paddingHorizontal: 10,
		paddingVertical: 8,
		fontFamily: 'Roboto',
		fontSize: 15.5,
		borderColor: Colors.gray,
		borderWidth: 1,
		backgroundColor: Colors.offWhite
	},
})

export default MyLabelAsInput;