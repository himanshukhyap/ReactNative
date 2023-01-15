import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, Alert, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import SubmitButton from '../components/form/SubmitButton';
import CancelButton from '../components/form/CancelButton';

import TableHeader from '../components/TableHeader';
import TableData from '../components/TableData';

import * as userActions from '../store/actions/user';

import GS from '../common/GlobalStyles';

const AttendanceScreen = props => {

	const [isLoading, setIsLoading] = useState(true);
	const [isDataLoading, setIsDataLoading] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [attendances, setAttendances] = useState([]);
	const [entryExists, setEntryExists] = useState(false);
	const [exitExists, setExitExists] = useState(false);
	const [flag, setFlag] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				const attData = await dispatch(userActions.getAttendances());
				setAttendances(attData.attendances);
				setEntryExists(attData.entryExists == 1 ? true : false);
				setExitExists(attData.exitExists == 1 ? true : false);
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
			}
		}
		getData();
	}, [dispatch, props, flag]);


	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	const attendanceClickHandler = () => {
		if (entryExists) {
			Alert.alert(
				'Leaving today ?',
				'Are you sure you want to mark exit entry for today ?',
				[
					{ text: 'Yes', onPress: () => { submitAttendance(); } },
					{ text: 'No', onPress: () => { } },
				],
				{
					cancelable: true
				}
			);
		} else {
			submitAttendance();
		}
	}

	const submitAttendance = async () => {
		try {
			const attData = await dispatch(userActions.submitAttendance(entryExists ? 'Exit' : 'Entry'));
			setAttendances(attData.attendances);
			setEntryExists(attData.entryExists == 1 ? true : false);
			setExitExists(attData.exitExists == 1 ? true : false);
		} catch (err) {
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
		setIsDataLoading(false);
		setShowButtonLoader(false);
	}

	return (
		<View style={styles.container}>
			{
				!exitExists &&
				<View style={{ ...GS.w100p, ...GS.jcenter, ...GS.mt15, ...GS.ph10 }}>
					<SubmitButton title={entryExists ? "Mark Today's Exit Attendance" : "Mark Today's Entry Attendance"}
						onPress={attendanceClickHandler} style={{ ...GS.w100p, backgroundColor: entryExists ? Colors.red : Colors.darkGreen }}
						IsLoading={showButtonLoader} />
				</View>
			}

			{
				isDataLoading &&
				<View style={styles.centered}>
					<ActivityIndicator size="large" color={Colors.primary} />
				</View>
			}
			{
				!isDataLoading && attendances.length == 0 &&
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Image source={require('../assets/no_record_found.png')} />
				</View>
			}
			{
				!isDataLoading && attendances.length > 0 &&
				<>
					<View style={{ ...GS.w100p, ...GS.acenter, ...GS.mt20, ...GS.mb10 }}>
						<Text style={{ ...GS.bold, ...GS.fs20 }}>Previous Attendances</Text>
					</View>

					<TableHeader titles={['Entry Date', 'Entry Time', 'Exit Time', 'Hours Worked']} alignments={['center', 'center', 'center', 'center']}
						sizes={[1, 0.8, 0.8, 1]} />

					<FlatList
						data={attendances}
						keyExtractor={item => item.id}
						renderItem={({ item, index }) => (
							<TableData data={item} fields={['att_date', 'entry_time', 'exit_time', 'hours_worked']}
								alignments={['center', 'center', 'center', 'center']}
								sizes={[1, 0.8, 0.8, 1]}
								index={index} />
						)}
					/>
				</>
			}

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	screen: {
		flex: 1,
		marginTop: 7
	},
	dataRow: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		height: 80,
		marginTop: 7,
	},
	title: {
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
		fontSize: 18,
		paddingVertical: 5,
		textAlign: 'center',
		borderBottomColor: Colors.black2,
		borderBottomWidth: 1,
		borderTopColor: Colors.black2,
		borderTopWidth: 1
	},
	notificationArea: {
		padding: 8
	},
	notificationHeader: {
		marginTop: 10,
		backgroundColor: Colors.white1,
		padding: 8
	},
	headerChild: {
		width: '100%',
		borderBottomColor: Colors.black2,
		borderBottomWidth: 1,
		borderTopColor: Colors.black2,
		borderTopWidth: 1,
	},
	zeroNotifications: {
		width: '100%',
		textAlign: 'center'
	}
});

export default AttendanceScreen;
