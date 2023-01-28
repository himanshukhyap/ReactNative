import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import CardView from '../../components/CardView';

import Colors from '../../constants/Colors';
import { CertificateOrLicense } from '../../constants/Enums';
import GS from '../../common/GlobalStyles';

import * as siteAction from '../../store/actions/site';

const CompDashboardScreen = props => {

	const [isLoading, setIsLoading] = useState(true);

	const [sites, setSites] = useState([]);
	const [stats, setStats] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			try {
				const apiData = await dispatch(siteAction.getData());
				setSites(apiData.sites);
				setStats(apiData.stats);
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

	if (sites.length === 0) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Image source={require('../../assets/no_record_found.png')} />
			</View>
		);
	}

	const manageCertificates = id => {
		let data = sites.filter((x) => x.id == id);
		if (data.length > 0) {
			props.navigation.navigate('CompList', { 'vendor_site_id': data[0].id, 'type': CertificateOrLicense.Certificate });
		}
	}

	const manageLicenses = id => {
		let data = sites.filter((x) => x.id == id);
		if (data.length > 0) {
			props.navigation.navigate('CompList', { 'vendor_site_id': data[0].id, 'type': CertificateOrLicense.License });
		}
	}


	const renderExpiryStatus = (isCertificate, expiryInfoData, totalItems) => {

		let arrItems = [];

		const maxOuterWidth = 12;
		const maxOuterHeight = 30;

		const maxInnerWidth = 10;
		const maxInnerHeight = 28;

		const zone1 = 7;
		const zone2 = 15;

		if (expiryInfoData.length == 0) {
			for (let i = 0; i < totalItems; i++) {
				arrItems.push(<View key={(isCertificate ? "cBar" : "lBar") + i} style={{ ...GS.borderGray, ...GS.jright, ...GS.mv2, width: maxOuterWidth, height: maxOuterHeight, ...(isCertificate ? GS.mr2 : GS.ml2) }}>
					<View style={{ width: maxInnerWidth, height: maxInnerHeight }}>
					</View>
				</View>)
			}
		}
		else {
			expiryInfoData.map((item, index) => {

				const expireInDays = parseInt(item.expire_in_days);
				const totalDays = parseInt(item.total_days);
				const remainingDays = totalDays - expireInDays;

				const dayDiffPercent = parseFloat(remainingDays) / parseFloat(totalDays);
				let innerHeight = parseInt(maxInnerHeight * dayDiffPercent);
				const bgColor = innerHeight >= zone2 ? Colors.success : innerHeight >= zone1 && innerHeight < zone2 ? Colors.orange : Colors.danger;

				if (innerHeight < 0) {
					innerHeight = maxInnerHeight;
				}

				arrItems.push(<View key={index} style={{ ...GS.borderGray, ...GS.jright, ...GS.mv2, width: maxOuterWidth, height: maxOuterHeight, ...(isCertificate ? GS.mr2 : GS.ml2) }}>
					<View style={{ width: maxInnerWidth, height: innerHeight, backgroundColor: bgColor }}>
					</View>
				</View>)
			});

			/*for (let i = 0; i < totalItems - expiryInfoData.length; i++) {
				arrItems.push(<View key={(isCertificate ? "cBar" : "lBar") + i} style={{ ...GS.borderGray, ...GS.jright, ...GS.mv2, width: maxOuterWidth, height: maxOuterHeight, ...(isCertificate ? GS.mr2 : GS.ml2) }}>
					<View style={{ width: maxInnerWidth, height: maxInnerHeight }}>
					</View>
				</View>)
			}*/
		}

		return arrItems;
	}


	const renderThumbnails = ({ item, index }) => (
		<CardView>
			<Text style={{ ...GS.bold, ...GS.fs17 }}>Site : {item.site_name}</Text>
			<View style={{ ...GS.row100, ...GS.jspaceb, ...GS.mt10 }}>
				<Text style={{ ...GS.bold }}>Total Certificates : {item.certificates.length}/{stats.TotalCertificates}</Text>
				<Text style={{ ...GS.bold }}>Total Licenses : {item.licenses.length}/{stats.TotalLicenses}</Text>
			</View>
			<View style={{ ...GS.row100, ...GS.jspaceb, ...GS.mb5 }}>
				<Text style={{ ...GS.bold }}>Expirable : {item.certificates.length}/{stats.ExpirableCertificates}</Text>
				<Text style={{ ...GS.bold }}>Expirable : {item.licenses.length}/{stats.ExpirableLicenses}</Text>
			</View>
			<View style={{ ...GS.row100, ...GS.jspaceb }}>
				<View style={{ ...GS.f1, ...GS.mr5 }}>
					<View style={{ ...GS.row, ...GS.wrap }}>
						{renderExpiryStatus(true, item.certificates, stats.ExpirableCertificates)}
					</View>
				</View>
				<View style={{ ...GS.f1, ...GS.ml5 }}>
					<View style={{ ...GS.row, ...GS.wrap, ...GS.jright }}>
						{renderExpiryStatus(false, item.licenses, stats.ExpirableLicenses)}
					</View>
				</View>
			</View>
			<View style={{ ...GS.row100, ...GS.jspaceb, ...GS.mt5 }}>
				<TouchableWithoutFeedback onPress={() => manageCertificates(item.id)}>
					<Text style={{ ...GS.bold, ...GS.textPrimaryDark, ...GS.pv5 }}>Manage Certificates</Text>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => manageLicenses(item.id)}>
					<Text style={{ ...GS.bold, ...GS.textPrimaryDark, ...GS.pv5 }}>Manage Licenses</Text>
				</TouchableWithoutFeedback>
			</View>
		</CardView>
	)


	return (
		<View style={styles.container}>
			<FlatList
				keyboardShouldPersistTaps="handled"
				data={sites}
				keyExtractor={item => item.id}
				renderItem={renderThumbnails}
			/>
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
	label: {
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
		fontSize: 15,
	},
	input: {
		paddingHorizontal: 10,
		paddingVertical: 2,
		fontFamily: 'Roboto',
		fontSize: 15.5,
		borderColor: Colors.gray,
		borderWidth: 1
	},
	filterMain: {
		overflow: 'hidden',
		paddingBottom: 5,
	},
	filterChild: {
		backgroundColor: Colors.white1,
		height: 65,
		padding: 5,
		shadowColor: Colors.black,
		shadowOffset: { width: 1, height: 1, },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	}
})

export default CompDashboardScreen;
