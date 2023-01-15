import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import DetailsViewer from '../../components/DetailsViewer';
import MyImageViewer from '../../components/MyImageViewer';

import * as GlobalFunctions from '../../common/GlobalFunctions';
import Variables from '../../constants/Variables';

import * as collectionrequestAction from '../../store/actions/collectionrequest';

const CollectionRequestDetailScreen = props => {

	const { params } = props.route;
	const [isLoading, setIsLoading] = useState(true);
	const [id, setId] = useState(0);

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
					data={collectionrequestData} downloadables="gate_pass"
					captions="Vendor,Address,Request Date,Target Completion Time,Completed At,Request Status,Filled Drums Quantity,Total Quantity (kg),
                                Empty Drums Required,Transporter,Driver Name,Driver Mobile,Vehicle No,Gate Pass,Warehouse,Security Code"
					keys="firm_name,address,request_date,max_completion_datetime,actual_completion_datetime,request_status_name,actual_drums_qty_temp,
                            actual_volume_temp,empty_drums_qty,transporter,driver_name,driver_mobile,vehicle_no,gate_pass,warehouse_name,security_code" />

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
	}
})


export default CollectionRequestDetailScreen;
