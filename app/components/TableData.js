import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Menu, { MenuTrigger, MenuOptions, MenuOption, renderers } from 'react-native-popup-menu';

import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import Colors from '../constants/Colors';

const { ContextMenu, SlideInMenu, Popover } = renderers;

const TableData = props => {

	const [clickedId, setClickedId] = useState(0);

	let colSizes = [];
	if (props.sizes != undefined) {
		colSizes = props.sizes;
	}

	const renderMenuOptions = () => {
		let arrOptions = [];
		for (let i = 0; i < props.options.length && i < props.actions.length; i++) {
			arrOptions.push(
				<MenuOption key={i} value={props.options[i]} text={props.options[i]} onSelect={() => props.actions[i](clickedId)} />
			);
		}
		return arrOptions;
	}

	const renderActionIcons = () => {
		let lstActions = [];
		props.actions.map((action, i) => {
			lstActions.push(
				<View key={i} style={styles.actionIcon}>
					<MaterialIcons name={props.actionIcons[i]} size={20}
						color={props.actionIconColors[i]}
						onPress={() => action(props.data['id'])} />
				</View>
			);
		});
		return lstActions;
	}

	const renderDataColumns = () => {
		let arrCols = [];

		props.fields.map((item, index) => {
			arrCols.push(
				<View key={index} style={{
					...styles.dataRow,
					...props.rowStyle,
					...(index > 0 ? styles.leftLine : undefined),
					...styles[props.alignments.length > index ? props.alignments[index] : 'left'],
					flex: colSizes.length > index ? colSizes[index] : 1
				}}>
					{
						item.indexOf('+', 0) > -1 &&
						<Text style={{ ...styles.dataText, ...props.dataTextStyle }}>
							{
								props.data[item.split('+')[0]].toString() + " " + props.data[item.split('+')[1]].toString()
							}
						</Text>
					}
					{
						item.indexOf('~', 0) > -1 &&
						<>
							<Text style={{ ...styles.dataText, ...props.dataTextStyle }} numberOfLines={1}>
								{props.data[item.split('~')[0]].toString()}
							</Text>
							<Text style={{ ...styles.dataText, ...props.dataTextStyle }} numberOfLines={1}>
								{props.data[item.split('~')[1]].toString()}
							</Text>
						</>
					}
					{
						item.indexOf('^', 0) > -1 &&
						<View style={{ width: '100%' }}>
							<Text style={{ ...styles.dataText, ...props.dataTextStyle }}>
								{props.data[item.split('^')[0]].toString()}
							</Text>
							<Text style={styles.txtSmallRight}>
								{props.data[item.split('^')[1]].toString()}
							</Text>
						</View>
					}
					{
						item.indexOf('+', 0) == -1 && item.indexOf('^', 0) == -1 && item.indexOf('~', 0) == -1 &&
						<Text style={{ ...styles.dataText, ...props.dataTextStyle }}>
							{
								Array.isArray(props.data[item]) ?
									props.data[item].join().replace(/,/g, ',\n')
									:
									props.data[item].toString().replace(/,\s*$/, "")
							}
						</Text>
					}
				</View>
			);
		})

		return arrCols;
	}

	return (

		props.triggerOnLongPress && props.options != undefined && props.options.length > 0 ?
			<Menu renderer={SlideInMenu}>
				<MenuTrigger triggerOnLongPress={true} onPress={() => setClickedId(props.data['id'])}>
					<View style={{ ...styles.container, ...props.style }}>
						{renderDataColumns()}
					</View>
				</MenuTrigger>
				<MenuOptions customStyles={optionsStyles}>
					{renderMenuOptions()}
				</MenuOptions>
			</Menu>
			:
			<View style={{ ...styles.container, ...props.style }}>

				{renderDataColumns()}

				{
					(props.options != undefined && props.options.length > 0) &&
					<View style={{ ...styles.dataRow, ...styles.leftLine, flex: colSizes.length > 0 ? colSizes[colSizes.length - 1] : 0.5 }}>
						<Menu renderer={ContextMenu}>
							<MenuTrigger onPress={() => setClickedId(props.data['id'])}>
								<View style={styles.dotsContainer}>
									<MaterialIcons name="more-vert" size={25} color={Colors.black2} />
								</View>
							</MenuTrigger>
							<MenuOptions customStyles={optionsStyles}>
								{renderMenuOptions()}
							</MenuOptions>
						</Menu>
					</View>
				}

				{
					(props.actionIcons != undefined && props.actionIcons.length > 0) &&
					<View style={{ ...styles.dataRow, ...styles.leftLine, flex: colSizes.length > 0 ? colSizes[colSizes.length - 1] : 1 }}>
						<View style={styles.iconContainer}>
							{renderActionIcons()}
						</View>
					</View>
				}

			</View>
	);

}

const optionsStyles = {
	optionsContainer: {
		/*backgroundColor: Colors.red*/
	},
	optionsWrapper: {
		backgroundColor: Colors.white1,
		borderLeftColor: Colors.offWhite,
		borderLeftWidth: 1,
		borderRightColor: Colors.offWhite,
		borderRightWidth: 1,
		borderBottomColor: Colors.offWhite,
		borderBottomWidth: 1,
	},
	optionWrapper: {
		paddingVertical: 15,
		borderTopColor: Colors.offWhite,
		borderTopWidth: 1,
	},
	optionTouchable: {
		/*underlayColor: Colors.darkGreen,
		activeOpacity: 70,*/
	},
	optionText: {
		color: Colors.black,
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
	},
};

const styles = StyleSheet.create({
	container: {
		//flex: 0,
		flexDirection: 'row',
		marginHorizontal: 2,
		borderLeftColor: Colors.offWhite,
		borderLeftWidth: 1,
		borderRightColor: Colors.offWhite,
		borderRightWidth: 1
	},
	dataRow: {
		minHeight: 35,
		justifyContent: 'center',
		paddingHorizontal: 5,
		paddingVertical: 7,
		alignItems: 'center',
		borderBottomColor: Colors.offWhite,
		borderBottomWidth: 1,
	},
	left: {
		alignItems: 'flex-start',
	},
	right: {
		alignItems: 'flex-end',
	},
	center: {
		alignItems: 'center',
	},
	dataText: {
		color: Colors.black1
	},
	leftLine: {
		borderLeftColor: Colors.offWhite,
		borderLeftWidth: 1
	},
	dotsContainer: {
		width: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	actionIcon: {
		marginHorizontal: 10,
		backgroundColor: Colors.gray,
		padding: 3,
		borderRadius: 5
	},
	txtSmallRight: {
		width: '100%',
		textAlign: 'right',
		fontSize: 9,
		color: Colors.maroon,
		marginTop: 3
	}
});

export default TableData;