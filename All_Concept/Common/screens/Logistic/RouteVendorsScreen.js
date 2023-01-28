import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AutoDragSortableView } from 'react-native-drag-sort';

import SubmitButton from '../../components/form/SubmitButton';
import TableHeader from '../../components/TableHeader';
import TableData from '../../components/TableData';
import HeaderRight from '../../navigation/HeaderRight';

import { ActionIcons, ActionIconColors, UserType } from '../../constants/Enums';

import Colors from '../../constants/Colors';
import * as GlobalFunctions from '../../common/GlobalFunctions';
import GS from '../../common/GlobalStyles';

import * as userAction from '../../store/actions/user';

const screenWidth = Dimensions.get('window').width;
const RouteVendorsScreen = props => {

	const { params } = props.route;
	const [isLoading, setIsLoading] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);

	const [seqChanged, setSeqChanged] = useState(false);
	const [vendorsData, setVendorsData] = useState([]);

	const [routeId, setRouteId] = useState(0);
	const [routeName, setRouteName] = useState('');

	const loggedInUser = useSelector(state => state.login);

	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				setRouteId(params.id);
				setRouteName(params.name);
				const apiData = await dispatch(userAction.getVendorsByRoute(params.id));
				setVendorsData(apiData);
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

	const deleteClickHandler = id => {
		Alert.alert(
			'Deleting Record ?',
			'Are you sure you want to remove this vendor from this route ?',
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
			const apiData = await dispatch(userAction.deleteRouteInfo(id, routeId));
			setVendorsData(apiData);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
		setIsLoading(false);
	}

	const updateClickHandler = async () => {
		setShowButtonLoader(true);
		try {
			const vendorIds = vendorsData.map(x => x.id);
			const apiData = await dispatch(userAction.updateRouteSequence(vendorIds.join(','), routeId));
			setVendorsData(apiData);
			GlobalFunctions.showMessage("Updated", "Sequence Updated Successfully !");
			setSeqChanged(false);
		} catch (err) {
			setShowButtonLoader(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
		setShowButtonLoader(false);
	}

	const renderItem = (item, index) => {
		return (
			<View style={{ width: screenWidth - 4, marginLeft: 2, backgroundColor: '#e1e1e1' }}>
				<TableData data={item} fields={['firm_name~store_code']}
					alignments={['left']} index={index} sizes={[5, 1.2]}
					actions={[deleteClickHandler]}
					actionIcons={[ActionIcons.Delete]}
					actionIconColors={[ActionIconColors.Delete]} />
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<View style={{ ...GS.w100p, ...GS.bgSuccessLight, ...GS.acenter }}>
				<Text style={{ ...GS.bold, ...GS.pv5, ...GS.ph5, ...GS.fs17 }}>Route : {routeName}</Text>
			</View>

			{
				vendorsData.length == 0 &&
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Image source={require('../../assets/no_record_found.png')} />
				</View>
			}

			{
				vendorsData.length > 0 &&
				<>
					<View style={{ ...GS.row100, ...GS.p5 }}>
						<View style={{ ...GS.f1, ...GS.pr5 }}>
							<Text style={{ ...GS.textDanger, ...GS.fs15, ...GS.bold }}>
								Press & hold any route then Drag-Drop it Up or Down to change its sequence
							</Text>
						</View>
						{
							seqChanged &&
							<SubmitButton title="Update Sequence" onPress={updateClickHandler} IsLoading={showButtonLoader} style={GS.w125} />
						}
					</View>

					<TableHeader titles={['name']} alignments={['left']} hasOptions={true} sizes={[5, 1.2]} />

					<AutoDragSortableView
						dataSource={vendorsData}
						parentWidth={screenWidth - 10}
						childrenWidth={screenWidth - 10}
						childrenHeight={48}
						marginChildrenBottom={3}
						keyExtractor={(item, index) => item.id}
						renderItem={(item, index) => {
							return renderItem(item, index)
						}}
						maxScale={1.05}
						onDataChange={(data) => {
							setVendorsData(data);
							setSeqChanged(true);
						}}
					/>
				</>
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
});

export default RouteVendorsScreen;