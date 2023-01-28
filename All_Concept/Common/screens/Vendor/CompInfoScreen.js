import React, { useState, useEffect } from 'react';
import { View, Text, useWindowDimensions, ActivityIndicator, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import HTML from "react-native-render-html";

import Colors from '../../constants/Colors';
import SubmitButton from '../../components/form/SubmitButton';

import { CertificateOrLicense } from '../../constants/Enums';
import GS from '../../common/GlobalStyles';
import * as GlobalFunctions from '../../common/GlobalFunctions';

import * as siteAction from '../../store/actions/site';

const AgreementScreen = props => {

	const { params } = props.route;

	const [isLoading, setIsLoading] = useState(true);
	const [showButtonLoader, setShowButtonLoader] = useState(false);

	const contentWidth = useWindowDimensions().width;

	const [CorLName, setCorLName] = useState('');
	const [basicInfo, setBasicInfo] = useState('');
	const [vendorSiteId, setVendorSiteId] = useState(0);

	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);

		setVendorSiteId(params.vendor_site_id);
		setBasicInfo(params.CorL.basic_info);

		if (params.type == CertificateOrLicense.Certificate) {
			props.navigation.setOptions({ title: 'Certificate Information' });
			setCorLName(params.CorL.certificate_name);
		} else {
			props.navigation.setOptions({ title: 'License Information' });
			setCorLName(params.CorL.license_name);
		}
		setIsLoading(false);
	}, [props]);


	const emailClickHandler = () => {
		Alert.alert(
			'Need Our Services ?',
			'Do you want to book our services to manage your compliances ?',
			[
				{ text: 'No', onPress: () => { } },
				{ text: 'Yes', onPress: () => { sendBookingEmail(); } },
			],
			{
				cancelable: true
			}
		);
	}

	const sendBookingEmail = async () => {
		setShowButtonLoader(true);
		try {
			const response = await dispatch(siteAction.sendBookingEmail(vendorSiteId));
			setShowButtonLoader(false);
			Alert.alert(response.status, response.message, [{ text: 'Okay' }]);
		} catch (err) {
			setShowButtonLoader(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View>
				<Text style={{ ...GS.bold, ...GS.fs22, ...GS.tcenter, ...GS.pv10 }}>
					{CorLName}
				</Text>
			</View>

			{
				basicInfo == "" ?
					<View style={{ padding: 10 }}>
						<Text style={{ color: Colors.danger, fontWeight: 'bold', fontFamily: 'Roboto_bold', lineHeight: 22, marginBottom: 50 }}>
							No information available for now, will get updated soon
						</Text>
					</View>
					:
					<View style={{ flex: 1 }}>
						<ScrollView style={{ flex: 1, paddingHorizontal: 5 }}>
							<HTML source={{ html: basicInfo }} contentWidth={contentWidth} />
						</ScrollView>
					</View>
			}

			<View style={styles.formFooter}>
				<SubmitButton title="Let us help you" onPress={emailClickHandler} IsLoading={showButtonLoader} style={{ ...GS.w150 }} />
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
	container: {
		flex: 1,
	},
	screen: {
		flex: 1,
		marginTop: 7
	},
	formFooter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		height: 30,
		borderTopColor: Colors.gray,
		borderTopWidth: 0,
		marginVertical: 10
	}
});

export default AgreementScreen;
