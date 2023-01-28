import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import MyImageViewer from '../../components/MyImageViewer';
import Colors from '../../constants/Colors';
import DetailsViewer from '../../components/DetailsViewer';

import * as GlobalFunctions from '../../common/GlobalFunctions';
import Variables from '../../constants/Variables';

import * as collectionrequestAction from '../../store/actions/collectionrequest';

const CollectionRequestDetailScreen = props => {

	const { params } = props.route;
	const [isLoading, setIsLoading] = useState(true);

	const collectionrequestData = useSelector(state => state.collectionrequests.record);

	const dispatch = useDispatch();

	const fetchAllData = async (pkid) => {
		try {
			setIsLoading(true);
			await dispatch(collectionrequestAction.getData(pkid));
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	useEffect(() => {

		props.navigation.setOptions({ title: 'Collection Request Details' });

		if (params && params.id) {
			fetchAllData(params.id);
		} else {
			props.navigation.navigate('CollectionRequests1', { token: 'refresh' });
		}
	}, [dispatch]);


	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	return (
		<ScrollView keyboardShouldPersistTaps="handled">
			<View style={styles.container}>
				<DetailsViewer
					data={collectionrequestData}
					captions="Vendor,Address,Pickup Request Date,Target Response Time,Target Completion Time,Responsed At,Completed At,Request Status,
                            Req. Drums Pickup Qty,Actual Drums Quantity,Requested Quantity (kg),Actual Quantity (kg),Empty Drums Required,
                            Assigned To,Transporter,Driver Name,Driver Mobile,Vehicle No,Warehouse,Security Code"
					keys="firm_name,address,request_date,max_response_datetime,max_completion_datetime,actual_response_datetime,
                            actual_completion_datetime,request_status_name,entered_drums_qty,actual_drums_qty,
                            entered_volume,actual_volume,empty_drums_qty,assigned_to_name,
                            transporter,driver_name,driver_mobile,vehicle_no,warehouse_name,security_code" />

				<MyImageViewer
					imageUri={GlobalFunctions.getGatePassImageUri(collectionrequestData.gate_pass)}
					noImageUri={GlobalFunctions.getImageUri(Variables.NoGatePassAvailableUrl)}
				/>

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
	container: {
		flex: 1,
		/*paddingLeft: 10,
		paddingRight: 10,*/
	},
	gatepass: {
		maxWidth: '100%',
		height: 200,
		maxHeight: 100
	}
})


export default CollectionRequestDetailScreen;
