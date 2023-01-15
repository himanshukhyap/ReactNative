import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, FlatList, Alert, BackHandler, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import HeaderRight from '../../navigation/HeaderRight';

import CardData from '../../components/CardData';
import MyCheckBox from '../../components/form/MyCheckBox';
import MyPickerInput from '../../components/form/MyPickerInput';
import MyDateTimePickerDialog from '../../components/form/MyDateTimePickerDialog';

import Colors from '../../constants/Colors';
import { ActionIcons, ActionIconColors, RequestStatus } from '../../constants/Enums';
import * as GlobalFunctions from '../../common/GlobalFunctions';

import * as collectionRequestAction from '../../store/actions/collectionrequest';
import * as statesAction from '../../store/actions/states';
import Variables from '../../constants/Variables';

const PendingChallansScreen = props => {

	const [isLoading, setIsLoading] = useState(false);

	const statesData = useSelector(state => state.states.list);
	const collectionrequests = useSelector(state => state.collectionrequests.list);
	const loggedInUser = useSelector(state => state.login);

	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [formRefs, setFormRefs] = useState({});

	const dispatch = useDispatch();

	useEffect(() => {
		props.navigation.setOptions({ title: 'Pending Challans' });
	}, [dispatch]);


	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				await dispatch(statesAction.getData());
				await dispatch(collectionRequestAction.getData(0, 0, loggedInUser.UserId, 0, 0, 0, '', '', 3, 1));

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

	const viewClickHandler = id => {
		let data = collectionrequests.filter((x) => x.id == id);
		if (data.length > 0) {
			props.navigation.navigate('PendingChallanDetail', { 'id': data[0].id });
		}
	}

	return (
		<View style={styles.container}>

			{
				collectionrequests.length === 0 &&
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Image source={require('../../assets/no_record_found.png')} />
				</View>
			}

			{
				collectionrequests.length > 0 &&
				<FlatList
					data={collectionrequests}
					keyExtractor={item => item.id}
					renderItem={({ item, index }) => (
						<View>
							<CardData
								index={index}
								data={item}
								titles={['vendor', 'pickup request date', 'address', 'PDA', 'Completed Date', 'Quantity']}
								fields={['firm_name', 'request_date', 'address', 'assigned_to_name', 'actual_completion_datetime', 'actual_volume']}
								hasActions={true}
								actions={[viewClickHandler]}
								actionIcons={[ActionIcons.View]}
								actionIconColors={[ActionIconColors.View]}
							/>
						</View>
					)}
				/>
			}

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
	list: {
		marginHorizontal: 2,
		borderLeftColor: Colors.offWhite,
		borderLeftWidth: 1,
		borderRightColor: Colors.offWhite,
		borderRightWidth: 1
	},
	label: {
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
		fontSize: 15,
	},
	filterMain: {
		overflow: 'hidden',
		paddingBottom: 5,
	},
	filterChild: {
		backgroundColor: Colors.white1,
		height: 135,
		padding: 5,
		shadowColor: Colors.black,
		shadowOffset: { width: 1, height: 1, },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	}
})

export default PendingChallansScreen;
