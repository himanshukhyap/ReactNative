import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CardData from '../../components/CardData';

import * as userAction from '../../store/actions/user';
import Colors from '../../constants/Colors';
import { ActionIcons, ActionIconColors, UserType } from '../../constants/Enums';

const VendorsScreen = props => {

	const [isLoading, setIsLoading] = useState(true);

	const userData = useSelector(state => state.users);
	const users = userData.list;
	const [filteredUsers, setFilteredUsers] = useState(userData.list);
	const loginData = useSelector(state => state.login);
	const [searchedText, setSearchedText] = useState('');

	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				await dispatch(userAction.getData(0, UserType.Vendor, loginData.UserId));
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
			}
		}
		getData();
	}, [dispatch, props]);


	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	if (users.length === 0) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Image source={require('../../assets/no_record_found.png')} />
			</View>
		);
	}

	const editClickHandler = id => {
		let data = users.filter((x) => x.id == id);
		if (data.length > 0) {
			props.navigation.navigate('VendorEntry', { 'id': data[0].id });
		}
	}

	const documentClickHandler = id => {
		let data = users.filter((x) => x.id == id);
		if (data.length > 0) {
			props.navigation.navigate('Documents', { 'userId': data[0].id });
		}
	}

	const counterClickHandler = id => {
		let data = users.filter((x) => x.id == id);
		if (data.length > 0) {
			props.navigation.navigate('Counters', { 'vendorId': data[0].id, 'firmName': data[0].firm_name });
		}
	}

	const deleteClickHandler = id => {
		Alert.alert(
			'Deleting Record ?',
			'Are you sure you want to delete this record ?',
			[
				{ text: 'No', onPress: () => { } },
				{ text: 'Yes', onPress: () => { deleteRecord(id); } },
			],
			{
				cancelable: true
			}
		);
	}

	const deleteRecord = async (id) => {
		setIsLoading(true);
		try {
			await dispatch(userAction.deleteData(id));
			await dispatch(userAction.getData(0, UserType.Vendor, loginData.UserId));
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
		setIsLoading(false);
	}

	return (
		<View style={styles.container}>
			<View style={styles.filterMain}>
				<View style={styles.filterChild}>
					<Text style={styles.label}>Filter Vendors By Firm Name</Text>
					<TextInput style={styles.input} value={searchedText} placeholder="start typing name" onChangeText={(text) => setSearchedText(text)} />
				</View>
			</View>

			<FlatList
				keyboardShouldPersistTaps="handled"
				data={users.filter(x => x.firm_name.toLowerCase().indexOf(searchedText.toLowerCase(), 0) > -1)}
				keyExtractor={item => item.id}
				renderItem={({ item, index }) => (
					<CardData
						index={index}
						data={item}
						titles={['firm name', 'name', 'mobile', 'store code', 'oil rate (Per Kg)', 'agreement status']}
						fields={['firm_name', 'name', 'mobile', 'store_code', 'oil_rate_name', 'agreement_status_name']}
						hasActions={true}
						actions={[editClickHandler, documentClickHandler, counterClickHandler]}
						actionIcons={[ActionIcons.Edit, ActionIcons.Attachment, ActionIcons.Person]}
						actionIconColors={[ActionIconColors.Edit, ActionIconColors.Attachment, ActionIconColors.Person]}
					/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1
	},
	label: {
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
		fontSize: 15,
	},
	input: {
		paddingHorizontal: 10,
		paddingVertical: 2,
		fontFamily: 'Roboto',
		fontSize: 15.5,
		borderColor: Colors.gray,
		borderWidth: 1
	},
	filterMain: {
		overflow: 'hidden',
		paddingBottom: 5,
	},
	filterChild: {
		backgroundColor: Colors.white1,
		height: 65,
		padding: 5,
		shadowColor: Colors.black,
		shadowOffset: { width: 1, height: 1, },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	}
})

export default VendorsScreen;
