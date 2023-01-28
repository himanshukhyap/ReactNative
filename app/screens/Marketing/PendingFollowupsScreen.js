import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert, ScrollView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';

import TableHeaderFix from '../../components/TableHeaderFix';
import TableDataFix from '../../components/TableDataFix';

import * as GlobalFunctions from '../../common/GlobalFunctions';

import * as signupAction from '../../store/actions/signup';

const PendingFollowupsScreen = props => {

	const [isLoading, setIsLoading] = useState(false);
	const [followps, setFollowups] = useState([]);
    const [selectedRowNo, setSelectedRowNo] = useState(-1);

	const loginData = useSelector(state => state.login);

	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				props.navigation.setOptions({ title: 'Pending Followups' });
				const apiData = await dispatch(signupAction.getPendingFollowups(loginData.UserId));
				setFollowups(apiData);
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
			}
		}
		getData();
	}, [dispatch, props]);

	const selectDeselectRow = (index) => {
        if (selectedRowNo == index) {
            setSelectedRowNo(-1);
        } else {
            setSelectedRowNo(index);
        }
    }

	const viewClickHandler = id => {
		props.navigation.navigate('LeadsFollowups', { 'lead_id': id });
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	if (followps.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/no_record_found.png')} />
            </View>
        );
    }

	return (
		<ScrollView horizontal={true}>
			<View>
				<TableHeaderFix titles={['followup date', 'name', 'firm name', 'firm type', 'mobile', 'designation', 'email', 'website', 'state', 'city',
					'address', 'postal code', 'oil quantity', 'expected rate', 'created by', 'category', 'view']}
				sizes={[1,1,1,1,0.8,1,1,1,1,0.8,1,0.9,0.8,0.9,1,1,0.5]}
				alignments={['left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'center']} 
				/>

				<FlatList
					data={followps}
					keyExtractor={item => item.id}
					renderItem={({ item, index }) => (
						<TouchableWithoutFeedback onPress={() => { selectDeselectRow(index) }}>
							<View style={index == selectedRowNo ? styles.highlight : index % 2 == 0 ? styles.even : styles.odd}>
								<TableDataFix data={item} fields={['next_followup_date_string', 'name', 'firm_name', 'firm_type', 'mobile', 'designation', 'email', 'website',
									'state', 'city', 'address', 'postal_code', 'oil_quantity', 'expected_rate', 'created_by', 'lead_category', 'VIEWRECORD']}
									alignments={['left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'center']}
									index={index}
									sizes={[1,1,1,1,0.8,1,1,1,1,0.8,1,0.9,0.8,0.9,1,1,0.5]}
									onViewPress={() => { viewClickHandler(item.id) }} />
							</View>
						</TouchableWithoutFeedback>
					)}
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
		paddingLeft: 10,
		paddingRight: 10,
	},
	formHeader: {
		width: '100%',
		borderBottomColor: Colors.gray,
		borderBottomWidth: 0,
		marginTop: 15,
		alignItems: 'center'
	},
	heading: {
		fontSize: 20,
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
	},
	formFooter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		borderTopColor: Colors.gray,
		borderTopWidth: 0,
		marginVertical: 10,
		paddingTop: 10
	},
    highlight: {
        backgroundColor: Colors.gray,
        borderBottomColor: Colors.offWhite,
        borderBottomWidth: 1
    },
    odd: {
        backgroundColor: Colors.white2,
        borderBottomColor: Colors.offWhite,
        borderBottomWidth: 1
    },
    even: {
        backgroundColor: Colors.white1,
        borderBottomColor: Colors.offWhite,
        borderBottomWidth: 1
    },
})


export default PendingFollowupsScreen;
