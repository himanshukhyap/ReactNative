import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const CardView = props => {
	return (
		<View style={{ ...styles.container, ...props.style }}>
			{props.children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		marginVertical: 5,
		marginHorizontal: 5,
		alignItems: "center",
		backgroundColor: Colors.white1,
		borderRadius: 5,
		elevation: 5,

		/* for ios */
		shadowOffset: {
			width: 5,
			height: 5
		},
		borderWidth: 1,
		borderColor: Colors.offWhite,
		shadowColor: Colors.lightBlack,
		shadowOpacity: 0.5,
		shadowRadius: 5,
	}
})

export default CardView;