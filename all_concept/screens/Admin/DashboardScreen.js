import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import Colors from '../../constants/Colors';
import NotificationTile from '../../components/NotificationTile';
import DataThumbnail from '../../components/DataThumbnail';

import * as dashboardAction from '../../store/actions/dashboard';

const DashboardScreen = props => {

	const [isLoading, setIsLoading] = useState(true);

	const loginData = useSelector(state => state.login);

	const counters = useSelector(state => state.dashboard.counters);

	const notifications = useSelector(state => state.dashboard.notifications);

	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				const apiData = await dispatch(dashboardAction.getData(loginData.UserId, loginData.UserType, loginData.VendorId));
				setIsLoading(false);

				if (apiData.followupCount > 0) {
					showFolloupMessage(apiData.followupCount, apiData.snoozeHours);
				}

			} catch (err) {
				setIsLoading(false);
				Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
			}
		}
		getData();
	}, [dispatch, props]);

	const showFolloupMessage = async (fpCount, snoozeHours) => {

		const currentTime = new Date();

		let nextTime = await AsyncStorage.getItem('fpNotifyNextTime');
		if (nextTime == undefined || nextTime == null) {
			nextTime = 0;
		}

		if (currentTime > nextTime) {
			const message = fpCount == 1 ? 'is ' + fpCount + ' Followup' : 'are ' + fpCount + 'Followups';
			Alert.alert(
				"Today's Followups",
				'There ' + message + ' scheduled for today',
				[
					{ text: 'Show Now', onPress: () => { props.navigation.navigate('PendingFollowups'); } },
					{ text: 'Check Later', onPress: () => { } },
				],
				{
					cancelable: true
				}
			);
		}

		if (nextTime == 0) {
			nextTime = new Date();
			nextTime = nextTime.setHours(nextTime.getHours() + snoozeHours);
			AsyncStorage.setItem('fpNotifyNextTime', nextTime.toString());
		}
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	const renderNotifications = () => {
		let lstNotifications = [];
		for (let i = 0; i < notifications.length; i++) {
			lstNotifications.push(<NotificationTile
				key={i.toString()}
				type={notifications[i].type}
				title={notifications[i].title}
				date={notifications[i].added_date}
				content={notifications[i].notification} />);
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
		<ScrollView stickyHeaderIndices={[4]}>

			<View style={styles.dataRow}>
				<DataThumbnail title="Oil Collection in This Month" unit="kg" value={counters.MonthPickedQty} style={{ backgroundColor: Colors.thumbnailColor1 }} />
				<DataThumbnail title="Oil Collection in This Year" unit="kg" value={counters.YearPickedQty} style={{ backgroundColor: Colors.thumbnailColor2 }} />
			</View>

			<View style={styles.dataRow}>
				<DataThumbnail title="Vendors On Board" value={parseInt(counters.TotalVendors) + parseInt(counters.TotalLeads)} style={{ backgroundColor: Colors.thumbnailColor3 }} />
				<DataThumbnail title="Vendors Pending For Collection" value={counters.TotalLeads} style={{ backgroundColor: Colors.thumbnailColor4 }} />
			</View>

			<View style={styles.dataRow}>
				<DataThumbnail title="Stock Available At Warehouse" unit="kg" value={counters.WarehouseStock} style={{ backgroundColor: Colors.thumbnailColor5 }} />
				<DataThumbnail title="Stock Available At Field" unit="kg" value={counters.FieldStock} style={{ backgroundColor: Colors.thumbnailColor6 }} />
			</View>

			<View style={styles.dataRow}>
				<DataThumbnail title="Carbon Credit This Month" value={counters.CarbonCreditMonth} style={{ backgroundColor: Colors.thumbnailColor7 }} />
				<DataThumbnail title="Carbon Credit This  Year" value={counters.CarbonCreditYear} style={{ backgroundColor: Colors.thumbnailColor8 }} />
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
	},
	notificationArea: {
		padding: 8
	},
	notificationHeader: {
		marginTop: 10,
		backgroundColor: Colors.white1,
		padding: 3,
		paddingHorizontal: 10
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
