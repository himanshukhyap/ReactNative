import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

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
				await dispatch(dashboardAction.getData(loginData.UserId, loginData.UserType, loginData.VendorId));
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
		<ScrollView stickyHeaderIndices={[1]}>

			{
				loginData.VendorId > 0 &&
				<View>
					<View style={styles.dataRow}>
						<DataThumbnail title="This Month Collected Quantity" unit="kg" value={counters.MonthPickedQty} style={{ backgroundColor: Colors.thumbnailColor1 }} />
						<DataThumbnail title="Open Pickup Request Count" value={counters.OpenRequests} style={{ backgroundColor: Colors.thumbnailColor2 }} />
					</View>

					<View style={styles.dataRow}>
						<DataThumbnail title="Today Picked Up Quantity" unit="kg" value={counters.TodayPickedQty} style={{ backgroundColor: Colors.thumbnailColor3 }} />
						<DataThumbnail title="Next Pickup Request Date" value="" unit={counters.NextPickUpDate} style={{ backgroundColor: Colors.thumbnailColor4 }} />
					</View>
				</View>
			}

			{
				loginData.VendorId == 0 &&
				<View>
					<View style={styles.dataRow}>
						<DataThumbnail title="This Month Collected Quantity" unit="kg" value={counters.MonthPickedQty} style={{ backgroundColor: Colors.thumbnailColor1 }} />
						<DataThumbnail title="Total Picked Up Quantity" value={counters.TotalPickedQty} unit="kg" style={{ backgroundColor: Colors.thumbnailColor2 }} />
					</View>

					<View style={styles.dataRow}>
						<DataThumbnail title="Today Picked Up Quantity" unit="kg" value={counters.TodayPickedQty} style={{ backgroundColor: Colors.thumbnailColor3 }} />
						<DataThumbnail title="Pickup TAT" value="15:30" unit="Hrs." style={{ backgroundColor: Colors.thumbnailColor4 }} />
					</View>

					<View style={styles.dataRow}>
						<DataThumbnail title="Number of Active Counters" value={counters.ActiveCounters} style={{ backgroundColor: Colors.thumbnailColor5 }} />
						<DataThumbnail title="Number of Total Counters" value={counters.TotalCounters} style={{ backgroundColor: Colors.thumbnailColor6 }} />
					</View>

					<View style={styles.dataRow}>
						<DataThumbnail title="Carbon Credit This Month" value={counters.CarbonCreditMonth} style={{ backgroundColor: Colors.thumbnailColor7 }} />
						<DataThumbnail title="Carbon Credit Total" value={counters.CarbonCreditTotalPicked} style={{ backgroundColor: Colors.thumbnailColor8 }} />
					</View>
				</View>
			}

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
	headerChild: {
		width: '100%',
		borderBottomColor: Colors.black2,
		borderBottomWidth: 1,
		borderTopColor: Colors.black2,
		borderTopWidth: 1,
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
	zeroNotifications: {
		width: '100%',
		textAlign: 'center'
	}
});

export default DashboardScreen;
