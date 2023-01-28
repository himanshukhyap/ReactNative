import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Modal, Dimensions, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import GS from '../common/GlobalStyles';
import * as GlobalFunctions from '../common/GlobalFunctions';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height - 60;

const MyImageViewer = props => {

	const [isLoading, setIsLoading] = useState(true);
	const [modalImages, setModalImages] = useState([]);
	const [showErrorImage, setShowErrorImage] = useState(false);
	const [imageHeight, setImageHeight] = useState(0);
	const [imgResizeMode, setImgResizeMode] = useState('stretch');
	const [isImageModalVisible, setIsImageModalVisible] = useState(false);
	const [noImageUri, setNoImageUri] = useState('');
	const [parentHeight, setParentHeight] = useState(screenHeight);

	useEffect(() => {

		setIsLoading(true);

		if (props.imageUri != '') {
			const jsonString = '{ "url" : "' + props.imageUri + '" }';
			const arrImage = JSON.parse("[" + jsonString + "]");
			setModalImages(arrImage);
		} else {
			setModalImages([]);
			setShowErrorImage(true);
		}

		setParentHeight(screenHeight);

		if (props.imageHeight) {
			setImageHeight(props.imageHeight);
		} else {
			setImageHeight(screenHeight);			
		}

		if (props.imgResizeMode) {
			setImgResizeMode(props.imgResizeMode);
		}

		if (props.noImageUri) {
			setNoImageUri(props.noImageUri);
		} else {
			setNoImageUri(GlobalFunctions.getNoImageAvailableUri());
		}

		setIsLoading(false);

	}, [props]);

	const displayErrorImage = () => {
		setShowErrorImage(true);
		setParentHeight(screenWidth);
	}

	return (
		<View style={{ width: screenWidth, height: parentHeight }}>
			{
				props.showLoader === true && isLoading ?
					<View style={{ ...GS.centered, ...GS.pt20 }}>
						<ActivityIndicator size="large" color={Colors.primary} />
					</View>
					:
					<View style={GS.f1}>
						{
							showErrorImage ?
								<Image style={{ width: screenWidth, height: screenWidth, resizeMode: 'contain' }} source={{ uri: noImageUri }} />
								:
								<TouchableWithoutFeedback onPress={() => setIsImageModalVisible(true)}>
									<Image style={{ ...GS.w100p, height: imageHeight, resizeMode: imgResizeMode }} source={{ uri: props.imageUri }}
										onError={displayErrorImage} />
								</TouchableWithoutFeedback>
						}

						<Modal visible={isImageModalVisible}>
							<TouchableWithoutFeedback onPress={() => setIsImageModalVisible(false)}>
								<View style={styles.modalCloseIcon}>
									<Ionicons name="ios-close-circle" color={Colors.black} size={30} />
								</View>
							</TouchableWithoutFeedback>
							<ImageViewer style={{ width: screenWidth, height: screenHeight, resizeMode: 'stretch' }} imageUrls={modalImages}
								index={0} renderIndicator={() => { return (<View></View>) }} />
						</Modal>
					</View>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	modalCloseIcon: {
		position: 'absolute',
		width: 32,
		height: 32,
		borderRadius: 30,
		backgroundColor: Colors.white,
		right: 10,
		top: 20,
		zIndex: 2,
		paddingVertical: 0,
		paddingHorizontal: 2
	},
})

export default MyImageViewer;