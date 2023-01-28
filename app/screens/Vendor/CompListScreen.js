import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Menu, { MenuTrigger, MenuOptions, MenuOption, renderers } from 'react-native-popup-menu';
import moment from 'moment';

import { MaterialIcons } from '@expo/vector-icons';

import CardView from '../../components/CardView';
import SubmitButton from '../../components/form/SubmitButton';

import Colors from '../../constants/Colors';
import { CertificateOrLicense } from '../../constants/Enums';

import GS from '../../common/GlobalStyles';

import * as siteAction from '../../store/actions/site';

const { ContextMenu, SlideInMenu, Popover } = renderers;

const CompListScreen = props => {

	const { params } = props.route;

	const [isLoading, setIsLoading] = useState(true);
	const [showButtonLoader, setShowButtonLoader] = useState(false);

	const [certOrLics, setCertOrLics] = useState([]);
	const [clType, setCLType] = useState();
	const [vendorSiteId, setVendorSiteId] = useState(0);

	const dispatch = useDispatch();

	const getData = async (vendor_site_id, clType) => {
		setIsLoading(true);
		try {

			if (clType == CertificateOrLicense.Certificate) {
				const apiData = await dispatch(siteAction.getCertificates(vendor_site_id, 0));
				setCertOrLics(apiData);
			} else {
				const apiData = await dispatch(siteAction.getLicenses(vendor_site_id, 0));
				setCertOrLics(apiData);
			}

			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	useEffect(() => {
		setVendorSiteId(params.vendor_site_id);
		setCLType(params.type);
		if (params.type == CertificateOrLicense.Certificate) {
			props.navigation.setOptions({ title: 'Certificates' });
		} else {
			props.navigation.setOptions({ title: 'Licenses' });
		}
		getData(params.vendor_site_id, params.type);
	}, [dispatch, props]);


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

	if (certOrLics.length === 0) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Image source={require('../../assets/no_record_found.png')} />
			</View>
		);
	}

	const manageExpiryClickHandler = CorL => {
		props.navigation.navigate('CompDates', { 'CorL': CorL, 'vendor_site_id': vendorSiteId, 'type': clType });
	}

	const manageDocumentsClickHandler = CorL => {
		props.navigation.navigate('CompDocs', { 'CorL': CorL, 'vendor_site_id': vendorSiteId, 'type': clType });
	}

	const modeInfoClickHandler = CorL => {
		props.navigation.navigate('CompInfo', { 'CorL': CorL, 'vendor_site_id': vendorSiteId, 'type': clType });
	}

	const renderCertOrLics = ({ item, index }) => (
		<CardView>
			<View style={{ ...GS.row100, ...GS.acenter, ...GS.jspaceb, ...GS.p5 }}>
				<View style={GS.f1}>
					<Text style={{ ...GS.bold, ...GS.fs16, ...GS.pb4 }}>
						{
							clType == CertificateOrLicense.Certificate ? item.certificate_name : item.license_name
						}
					</Text>

					{
						parseInt(item.it_expires) == 0 ?
							<Text style={{ ...GS.textSuccess }}>Validity: Not Applicable</Text> :
							parseInt(item.id) == 0 ?
								<Text style={{ ...GS.textDanger }}>Validity: No Information Available</Text> :
								<Text style={{ color: parseInt(item.expire_in_days) > 30 ? Colors.success : parseInt(item.expire_in_days) > 15 ? Colors.warning : Colors.danger }}>
									{'Valid From : ' + item.start_date + "\n" + 'Valid Upto  : ' + item.expiry_date}
								</Text>
					}

					{/* <Text style={{ ...GS.textSuccess }}>
						{
							parseInt(item.it_expires) == 1 ? 'Validity: Not Applicable'
							parseInt(item.id) == 0 ? 'No Information Available' :
								item.expiry_date == '' ? 'Validity: Not Applicable' :
									'Valid From : ' + item.start_date + "\n" + 'Valid Upto  : ' + item.expiry_date
						}
					</Text> */}

					{
						parseInt(item.documents_count) > 0 &&
						<Text style={{ ...GS.pv5, ...GS.textPrimaryDark }}>
							Documents : {item.documents_count} Attached
						</Text>
					}

					{
						parseInt(item.documents_count) == 0 &&
						<Text style={{ ...GS.pv5, ...GS.textDanger }}>
							Documents : Missing
						</Text>
					}

				</View>
				{/* <MaterialIcons name="keyboard-arrow-right" size={24} color={Colors.darkGray} /> */}
				<View style={{ ...GS.w40 }}>
					<Menu renderer={ContextMenu}>
						<MenuTrigger>
							<View style={{ ...GS.h30, ...GS.pl10, ...GS.pr5, ...GS.jcenter, ...GS.aright }}>
								<MaterialIcons name="more-vert" size={25} color={Colors.black2} />
							</View>
						</MenuTrigger>
						<MenuOptions customStyles={optionsStyles}>
							{
								parseInt(item.it_expires) == 1 &&
								<MenuOption text="Manage Expiry" onSelect={() => manageExpiryClickHandler(item)} />
							}
							<MenuOption text="Manage Documents" onSelect={() => manageDocumentsClickHandler(item)} />
							<MenuOption text="More Information" onSelect={() => modeInfoClickHandler(item)} />
						</MenuOptions>
					</Menu>
				</View>
			</View>
		</CardView>
	)


	return (
		<View style={styles.container}>
			<FlatList
				keyboardShouldPersistTaps="handled"
				data={certOrLics}
				keyExtractor={item => clType == CertificateOrLicense.Certificate ? item.certificate_id : item.license_id}
				renderItem={renderCertOrLics}
			/>

			<View style={GS.formFooter}>
				<SubmitButton title="Let us help you" onPress={emailClickHandler} IsLoading={showButtonLoader} style={{ ...GS.w150 }} />
			</View>
		</View>
	);
}

const optionsStyles = {
	optionsContainer: {
		/*backgroundColor: Colors.red*/
	},
	optionsWrapper: {
		backgroundColor: Colors.white1,
		borderLeftColor: Colors.offWhite,
		borderLeftWidth: 1,
		borderRightColor: Colors.offWhite,
		borderRightWidth: 1,
		borderBottomColor: Colors.offWhite,
		borderBottomWidth: 1,
	},
	optionWrapper: {
		paddingVertical: 15,
		borderTopColor: Colors.offWhite,
		borderTopWidth: 1,
	},
	optionTouchable: {
		/*underlayColor: Colors.darkGreen,
		activeOpacity: 70,*/
	},
	optionText: {
		color: Colors.black,
		fontWeight: 'bold'
	},
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1,
		padding: 5,
		marginTop: 5
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

export default CompListScreen;
