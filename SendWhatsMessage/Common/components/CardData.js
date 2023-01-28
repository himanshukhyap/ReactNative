import React, { useDebugValue } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { MaterialIcons } from '@expo/vector-icons'

import CardView from './CardView';
import Colors from '../constants/Colors';
import * as GlobalFunctions from '../common/GlobalFunctions';

const { width } = Dimensions.get('window');

const CardData = props => {

	const itemWidth = ((width - 0) / (props.fullWidth ? 1 : 2)) - 20 - (props.showingCheckBox ? 20 : 0);

	const downloadClickHandler = (uri) => {
		let sourceFolder = props.sourceFolder ? props.sourceFolder : 'gatepass';
		GlobalFunctions.openLiveFile(sourceFolder, uri);
	}

	const renderDataItems = () => {
		let arrItems = [];
		const downloadables = props.downloadables ? props.downloadables : '';
		props.fields.map((item, index) => {
			arrItems.push(<View style={{ width: itemWidth, paddingVertical: 4 }} key={index}>
				<Text style={styles.label}>{props.titles[index]}</Text>
				{
					downloadables.indexOf(props.fields[index], 0) > -1 && props.data[props.fields[index]] != '' &&
					<TouchableWithoutFeedback onPress={() => { downloadClickHandler(props.data[props.fields[index]]) }}>
						<Text style={styles.download}>
							View/Download
						</Text>
					</TouchableWithoutFeedback>
				}
				{
					downloadables.indexOf(props.fields[index], 0) == -1 &&
					<Text style={styles.dataText}>
						{
							props.data[props.fields[index]] == '' ? '-NA-' : props.data[props.fields[index]]
						}
					</Text>
				}
			</View>);
		});

		return arrItems;
	}

	const renderActionIcons = () => {
		let lstActions = [];
		props.actions.map((action, i) => {
			lstActions.push(
				<MaterialIcons key={i} name={props.actionIcons[i]} size={22} style={styles.actionIcon}
					color={props.actionIconColors[i]}
					onPress={() => action(props.data['id'])} />
			);
		});
		return lstActions;
	}

	return (
		<CardView style={{ width: props.showingCheckBox ? '94%' : undefined }}>
			<View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
				{renderDataItems()}
			</View>
			{
				props.hasActions &&
				<View style={styles.footer}>
					{renderActionIcons()}
				</View>
			}
		</CardView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	row: {
		width: '100%',
		marginVertical: 3
	},
	dataCell: {
		paddingHorizontal: 3
	},
	label: {
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
		fontSize: 15,
		textTransform: 'capitalize'
	},
	odd: {
		backgroundColor: Colors.white2,
		borderBottomColor: Colors.offWhite,
		borderBottomWidth: 1
	},
	even: {
		backgroundColor: Colors.white1,
		borderBottomColor: Colors.offWhite,
		borderBottomWidth: 1
	},
	left: {
		alignItems: 'flex-start',
		paddingHorizontal: 10
	},
	right: {
		alignItems: 'flex-end',
		paddingHorizontal: 10,
	},
	center: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	dataText: {
		color: Colors.black1
	},
	footer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopColor: Colors.gray,
		borderTopWidth: 1,
		paddingTop: 7,
		marginTop: 5
	},
	actionIcon: {
		marginHorizontal: 10,
		backgroundColor: Colors.offWhite,
		padding: 3,
		borderRadius: 5
	},
	download: {
		fontSize: 15,
		color: Colors.primaryDark,
		lineHeight: 22
	}
});

export default CardData;