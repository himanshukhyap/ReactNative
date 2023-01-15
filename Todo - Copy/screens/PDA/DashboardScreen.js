import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as Location from 'expo-location';

import Colors from '../../constants/Colors';
import NotificationTile from '../../components/NotificationTile';
import DataThumbnail from '../../components/DataThumbnail';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';

import * as dashboardAction from '../../store/actions/dashboard';
import * as userActions from '../../store/actions/user';

import Variables from '../../constants/Variables';
import * as GlobalFunctions from '../../common/GlobalFunctions';
import * as locationManager from '../../common/LocationManager';
import GS from '../../common/GlobalStyles';

const DashboardScreen = props => {

	const [isLoading, setIsLoading] = useState(true);
	const [flag, setFlag] = useState(true);
	const [beyondOfficeHours, setBeyondOfficeHours] = useState(false);

	const loginData = useSelector(state => state.login);

	const counters = useSelector(state => state.dashboard.counters);

	const notifications = useSelector(state => state.dashboard.notifications);

	const dispatch = useDispatch();

	const askForAttendanceEntry = () => {
		Alert.alert(
			'Attendance Entry Missing',
			'Do you want to mark your attendance entry for today ?',
			[
				{ text: 'Yes', onPress: () => { props.navigation.navigate('Attendance'); } },
				{ text: 'No', onPress: () => { } },
			],
			{
				cancelable: true
			}
		);
	}

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				await dispatch(dashboardAction.getData(loginData.UserId, loginData.UserType, loginData.VendorId));

				const hms = GlobalFunctions.getHMSTime();

				if (hms >= Variables.OfficeStartHours && hms <= Variables.OfficeEndHours) {
					if (!Variables.LocUpdaterRunning) {

						const foregroundPermissionResult = await Location.getForegroundPermissionsAsync();
						const backgroundPermissionResult = await Location.getBackgroundPermissionsAsync();

						if (!foregroundPermissionResult.granted || !backgroundPermissionResult.granted) {
							GlobalFunctions.showLocationDisclosure(askForPermissionThenLoad);
						} else {
							Variables.LocationTrackingAllowed = true;
							await setupLocationManager();
						}
					}
					else {
						setIsLoading(false);
					}
				}
				else {
					setBeyondOfficeHours(true);
					setIsLoading(false);
				}

			} catch (err) {
				setIsLoading(false);
				Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
			}
		}

		getData();

	}, [dispatch, props, flag]);


	const askForPermissionThenLoad = async () => {
		await GlobalFunctions.verifyLocationPermission();
		await setupLocationManager();
	}

	const setupLocationManager = async () => {
		const attData = await dispatch(userActions.getAttendances());
		setIsLoading(false);
		if (Variables.LocationTrackingAllowed) {
			locationManager.setupLocationManager(dispatch);
			if (attData.entryExists == 0) {
				setTimeout(() => { askForAttendanceEntry(); }, 500);
			}
		}
	}


	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	const refreshClickHandler = () => {
		setFlag(!flag);
	}

	const renderNotifications = () => {
		let lstNotifications = [];
		for (let i = 0; i < notifications.length; i++) {
			lstNotifications.push(
				<NotificationTile
					key={i.toString()}
					type={notifications[i].type}
					title={notifications[i].title}
					date={notifications[i].added_date}
					content={notifications[i].notification} />
			);
		}

		if (notifications.length == 0) {
			lstNotifications.push(
				<View
					key="0">
					<Text style={styles.zeroNotifications}>
						No Notifications Available
					</Text>
				</View>
			);
		}

		return lstNotifications;
	}

	return (

		(Variables.LocationTrackingAllowed || Variables.LocUpdaterRunning || beyondOfficeHours)
			?
			<ScrollView stickyHeaderIndices={[2]}>

				<View style={styles.dataRow}>
					<DataThumbnail title="Today Picked Up Request Count" value={counters.TodayRequests} style={{ backgroundColor: Colors.thumbnailColor1 }} />
					<DataThumbnail title="Open Pickup Request Count" value={counters.OpenRequests} style={{ backgroundColor: Colors.thumbnailColor2 }} />
				</View>

				<View style={styles.dataRow}>
					<DataThumbnail title="Today Picked Up Quantity" unit="kg" value={counters.TodayPickedQty} style={{ backgroundColor: Colors.thumbnailColor3 }} />
					<DataThumbnail title="Stock Available At Field" unit="kg" value={counters.FieldStock} style={{ backgroundColor: Colors.thumbnailColor4 }} />
				</View>

				<View style={styles.notificationHeader}>
					<View style={styles.headerChild}>
						<Text style={styles.title}>Notifications</Text>
					</View>
				</View>

				<View style={styles.notificationArea}>
					{renderNotifications()}
				</View>

			</ScrollView>
			:
			<View style={styles.centered}>
				<Text>Please allow location access permission{"\n"}</Text>
				<View style={{ ...GS.row100, ...GS.jcenter }}>
					<SubmitButton title="Open Settings" onPress={() => GlobalFunctions.openAppSettings()} />
					<CancelButton title="Refresh" onPress={refreshClickHandler} buttonStyle={{ ...GS.ml15 }} />
				</View>
			</View>
	);
}

const styles = StyleSheet.create({
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

export default DashboardScreen;
