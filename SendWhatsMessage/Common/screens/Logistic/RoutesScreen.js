import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AutoDragSortableView } from 'react-native-drag-sort';

import { Ionicons } from '@expo/vector-icons';

import { ActionIcons, ActionIconColors, UserType } from '../../constants/Enums';

import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';
import MyTextInput from '../../components/form/MyTextInput';
import TableHeader from '../../components/TableHeader';
import TableData from '../../components/TableData';
import HeaderRight from '../../navigation/HeaderRight';

import Colors from '../../constants/Colors';
import * as GlobalFunctions from '../../common/GlobalFunctions';
import GS from '../../common/GlobalStyles';

import * as routeAction from '../../store/actions/routes';

const screenWidth = Dimensions.get('window').width;
const RoutesScreen = props => {

	const [isLoading, setIsLoading] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);
	const [showFilters, setShowFilters] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isFiltering, setIsFiltering] = useState(false);

	const [seqChanged, setSeqChanged] = useState(false);
	const [routesData, setRoutesData] = useState([]);

	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [formRefs, setFormRefs] = useState({});

	const loggedInUser = useSelector(state => state.login);

	const dispatch = useDispatch();

	useEffect(() => {
		props.navigation.setOptions({
			title: 'Routes Entry', headerRight: () => (
				<View style={{ flexDirection: 'row' }}>
					{
						!seqChanged &&
						<HeaderRight
							isIcon={true}
							iconComp={Ionicons}
							iconName="search"
							onPress={() => setShowFilters(!showFilters)}
						/>
					}
					<HeaderRight
						isIcon={true}
						iconName="md-add-circle"
						onPress={() => props.navigation.navigate('RoutesEntry')}
					/>
				</View>
			)
		});
	}, [showFilters, seqChanged]);

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				const apiData = await dispatch(routeAction.getAll());
				setRoutesData(apiData);
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

	if (routesData.length === 0) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Image source={require('../../assets/no_record_found.png')} />
			</View>
		);
	}

	const editClickHandler = id => {
		let data = routesData.filter((x) => x.id == id);
		if (data.length > 0) {
			props.navigation.navigate('RoutesEntry', { 'id': data[0].id });
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
			const apiData = await dispatch(routeAction.deleteData(id));
			setRoutesData(apiData);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
		setIsLoading(false);
	}

	const updateClickHandler = async () => {
		setShowButtonLoader(true);
		try {
			const seqInfo = JSON.stringify(routesData);
			const apiData = await dispatch(routeAction.updateRouteSequence(seqInfo));
			setRoutesData(apiData);
			GlobalFunctions.showMessage("Updated", "Sequence Updated Successfully !");
			setSeqChanged(false);
		} catch (err) {
			setShowButtonLoader(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
		setShowButtonLoader(false);
	}

	const addVendorClickHandler = (id) => {
		let data = routesData.filter(x => x.id == id);
		props.navigation.navigate("RouteVendorSelection", { 'id': id, 'name': data[0].name });
	}

	const viewVendorClickHandler = (id) => {
		let data = routesData.filter(x => x.id == id);
		props.navigation.navigate("RouteVendors", { 'id': id, 'name': data[0].name });
	}

	const renderItem = (item, index) => {
		return (
			<View style={{ width: screenWidth - 4, marginLeft: 2, backgroundColor: '#e1e1e1' }}>
				<TableData data={item} fields={['name']}
					alignments={['left']} index={index} sizes={[5, 1.2]}
					options={["Edit", "Delete", "Add Vendor/Counter", "View Vendors/Counters"]}
					actions={[editClickHandler, deleteClickHandler, addVendorClickHandler, viewVendorClickHandler]} />
			</View>
		)
	}

	const filterClickHandler = async () => {
		setIsSubmitting(true);
		setIsFiltering(true);
		setShowButtonLoader(true);
		setTimeout(() => {
			filterRecords();
		}, 50);
	}

	const filterRecords = async () => {
		console.log(formValues);

		const apiData = await dispatch(routeAction.getAll(formValues["store_code"]));
		setRoutesData(apiData);
		setShowButtonLoader(false);
		setIsSubmitting(false);
		setIsFiltering(false);
		setShowFilters(false);
	}

	return (
		<View style={styles.container}>
			{
				showFilters &&
				<View style={{ ...styles.filterMain }}>
					<View style={styles.filterChild}>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ flex: 1, paddingRight: 1 }}>
								<MyTextInput name="store_code" value={formValues} error={formErrors} submitting={isSubmitting}
									initialValue={formValues['store_code']} label="Search Route By Store Code" maxLength={10}
									refs={formRefs} returnKeyType="done" labelContainerStyle={{ marginTop: 3 }} />
							</View>

							<SubmitButton title="Filter" onPress={() => filterClickHandler(true)} IsLoading={showButtonLoader}
								style={{ ...GS.ml5, ...GS.w70, ...GS.mt20 }} />
						</View>
					</View>
				</View>
			}

			{
				isFiltering &&
				<View style={styles.centered}>
					<ActivityIndicator size="large" color={Colors.primary} />
				</View>
			}


			{
				routesData.length > 0 && !isFiltering &&
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
						dataSource={routesData}
						parentWidth={screenWidth - 10}
						childrenWidth={screenWidth - 10}
						childrenHeight={40}
						marginChildrenBottom={3}
						keyExtractor={(item, index) => item.id}
						renderItem={(item, index) => {
							return renderItem(item, index)
						}}
						maxScale={1.05}
						onDataChange={(data) => {
							setRoutesData(data);
							setSeqChanged(true);
							setShowFilters(false);
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
	filterMain: {
		overflow: 'hidden',
		paddingBottom: 5,
	},
	filterChild: {
		backgroundColor: Colors.white1,
		height: 70,
		padding: 5,
		shadowColor: Colors.black,
		shadowOffset: { width: 1, height: 1, },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	}
});

export default RoutesScreen;