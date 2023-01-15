import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import TableHeader from '../../components/TableHeader';
import TableData from '../../components/TableData';
import HeaderRight from '../../navigation/HeaderRight';
import MyTextInput from '../../components/form/MyTextInput';
import MyFilePicker from '../../components/form/MyFilePicker';
import SubmitButton from '../../components/form/SubmitButton';
import CancelButton from '../../components/form/CancelButton';
import { ValidationType, FileType, CapitalizeType } from '../../constants/Enums';
import { ActionIcons, ActionIconColors, CertificateOrLicense } from '../../constants/Enums';

import * as siteAction from '../../store/actions/site';

import Colors from '../../constants/Colors';
import Variables from '../../constants/Variables';
import * as GlobalFunctions from '../../common/GlobalFunctions';

const CompDocsScreen = props => {

	const { params } = props.route;
	const [isLoading, setIsLoading] = useState(true);


	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isResetting, setIsResetting] = useState(false);
	const [showButtonLoader, setShowButtonLoader] = useState(false);

	const [CorLType, setCorLType] = useState();
	const [CorLId, setCorLId] = useState(0);
	const [CorLName, setCorLName] = useState('');
	const [vendorSiteId, setVendorSiteId] = useState(0);

	const [formValues, setFormValues] = useState([]);
	const [formErrors, setFormErrors] = useState([]);
	const [formRefs, setFormRefs] = useState([]);

	const [siteDocs, setSiteDocs] = useState([]);

	const dispatch = useDispatch();

	const fetchAllData = async (vendor_site_id, corLId, corLType) => {
		try {
			setIsLoading(true);

			const apiData = await dispatch(siteAction.getDocs(vendor_site_id, corLId, corLType));
			setSiteDocs(apiData);

			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	useEffect(() => {

		setCorLType(params.type);
		setVendorSiteId(params.vendor_site_id);

		if (params.type == CertificateOrLicense.Certificate) {
			setCorLId(params.CorL.certificate_id);
			setCorLName(params.CorL.certificate_name);
			props.navigation.setOptions({ title: 'Certificate Documents' });
			fetchAllData(params.vendor_site_id, params.CorL.certificate_id, params.type);
		} else {
			setCorLId(params.CorL.license_id);
			setCorLName(params.CorL.license_name);
			props.navigation.setOptions({ title: 'License Documents' });
			fetchAllData(params.vendor_site_id, params.CorL.license_id, params.type);
		}

	}, [dispatch, props]);


	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	const cancelClickHandler = () => {
		//props.navigation.goBack();
		console.log('going back');
		props.navigation.navigate('CompList', { 'vendor_site_id': vendorSiteId, 'type': CorLType, token: 'refresh' });
	}

	const submitClickHandler = async () => {
		setIsSubmitting(true);
		setTimeout(() => {
			submitDetails();
		}, 50);
	}

	const submitDetails = async () => {
		let formValidated = true;

		for (let fe in formErrors) {
			if (formErrors[fe] != '') {
				formValidated = false;
				break;
			}
		}

		if (!formValidated) {
			GlobalFunctions.showErrorToast(() => setIsSubmitting(false));
			return;
		}

		setShowButtonLoader(true);

		formValues['vendor_site_id'] = vendorSiteId;
		formValues['CorLType'] = CorLType;
		if (CorLType == CertificateOrLicense.Certificate) {
			formValues['certificate_id'] = CorLId;
		} else {
			formValues['license_id'] = CorLId;
		}
		try {
			await dispatch(siteAction.submiDocs(formValues));

			setIsSubmitting(false);
			setShowButtonLoader(false);
			setIsResetting(true);

			const apiData = await dispatch(siteAction.getDocs(vendorSiteId, CorLId, CorLType));
			setSiteDocs(apiData);

			setIsResetting(false);
		} catch (err) {
			setShowButtonLoader(false);
			setIsSubmitting(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	const downloadClickHandler = async (id) => {
		let data = siteDocs.filter((x) => x.id == id);
		const folderName = CorLType == CertificateOrLicense.Certificate ? "site_certificates" : "site_licenses";
		GlobalFunctions.openLiveFile(folderName, data[0].file_name);
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

			const apiData = await dispatch(siteAction.deleteDocs(id, vendorSiteId, CorLId, CorLType));
			setSiteDocs(apiData);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
		}
	}

	return (
		<View style={styles.container}>

			<MyTextInput name="document_title" value={formValues} error={formErrors} submitting={isSubmitting} resetting={isResetting}
				initialValue={formValues['document_title']} label="Document Title" validationType={ValidationType.Required}
				autoCapitalize={CapitalizeType.Words} maxLength={100} refs={formRefs} returnKeyType="done" />

			<MyFilePicker name="file_name" value={formValues} error={formErrors} submitting={isSubmitting} label="Select Document"
				fileType={FileType.Any} allowedMimeTypes={Variables.DocumentTypes1} validationType={ValidationType.Required}
				resetting={isResetting} />

			<View style={styles.formFooter}>
				<SubmitButton title="Upload" onPress={submitClickHandler} IsLoading={showButtonLoader} />
				<CancelButton title="Back" onPress={cancelClickHandler} />
			</View>

			<View>
				{
					siteDocs.length == 0 &&
					<View style={{ alignItems: 'center' }}>
						<Image source={require('../../assets/no_record_found.png')} />
					</View>
				}

				{
					siteDocs.length > 0 &&
					<View>
						<TableHeader titles={['Document Title', 'Type', 'Actions']} sizes={[5, 2, 3]}
							alignments={['left', 'center', 'center']} style={{ marginHorizontal: 0 }} />

						<FlatList
							data={siteDocs}
							keyExtractor={item => item.id}
							renderItem={({ item, index }) => (
								<TableData data={item} fields={['document_title', 'document_type']} index={index}
									style={{ marginHorizontal: 0 }}
									sizes={[5, 2, 3]}
									alignments={['left', 'center']}
									actions={[downloadClickHandler, deleteClickHandler]}
									actionIcons={[ActionIcons.Download, ActionIcons.Delete]}
									actionIconColors={[ActionIconColors.Download, ActionIconColors.Delete]}
								/>
							)}
						/>
					</View>
				}

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
		paddingLeft: 10,
		paddingRight: 10,
	},
	formFooter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		borderTopColor: Colors.gray,
		borderTopWidth: 0,
		marginVertical: 20,
	}
})

export default CompDocsScreen;
