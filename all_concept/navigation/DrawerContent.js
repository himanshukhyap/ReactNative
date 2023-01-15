import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform, Image, SafeAreaView, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import { useSelector } from "react-redux";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { UserType } from '../constants/Enums';

import Colors from '../constants/Colors';
import Variables from '../constants/Variables';
import * as GlobalFunctions from '../common/GlobalFunctions';
import GS from '../common/GlobalStyles';

const DrawerContent = (props) => {

	const stateData = useSelector(state => state);

	const { state, descriptors, ...rest } = props;
	const newState = { ...state }

	//console.log(stateData.login);

	newState.routes = newState.routes.filter(item => item.name !== 'Profile' &&
		(item.name !== "Documents" || (item.name === "Documents" && stateData.login.VendorId == 0)) &&
		(item.name !== "Agreement" || (item.name === "Agreement" && stateData.login.VendorId == 0)) &&
		(item.name !== "CountersCollection" || (item.name === "CountersCollection" && stateData.login.VendorId == 0)) &&
		(item.name !== "Sites" || (item.name === "Sites" && stateData.login.VendorId == 0)) &&
		(item.name !== "Compliances" || (item.name === "Compliances" && stateData.login.VendorId == 0)) 
		//(stateData.login.VendorId == 0 || (stateData.login.VendorId != 0 && item.name !== "Documents")) &&
		//(item.name !== 'Leads' || (item.name === 'Leads' && stateData.login.SeeSignups == 1))
	);

	const updateProfile = () => {
		props.navigation.closeDrawer();
		props.navigation.navigate('Profile');
	}

	const backAction = () => {
		console.log(Variables.ActiveRouteName);
		if (Variables.ActiveRouteName == 'Dashboard') {
			Alert.alert('Hold on!', 'Are you sure you want to exit ?', [
				{
					text: 'Cancel',
					onPress: () => null,
					style: 'cancel',
				},
				{ text: 'YES', onPress: () => BackHandler.exitApp() },
			]);
			return true;
		} else {
			if (props.navigation.canGoBack()) {
				props.navigation.goBack();
				return true;
			} else {
				props.navigation.reset({
					index: 0,
					routes: [{ name: 'Dashboard', params: { token: 'refresh' } }]
				});
				return true;
			}
		}
	};

	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
		return () => backHandler.remove();
	}, []);


	const menuClickHandler = (menuName) => {
		if (menuName == 'Logout') {
			props.navigation.closeDrawer();
			Alert.alert(
				'Logging out?',
				'Do you really want to logout?',
				[
					{
						text: 'No', onPress: () => {
							console.log('Logout Cancelled');
						}
					},
					{
						text: 'Yes', onPress: async () => {
							//Variables.LocationTrackingAllowed = false;
							AsyncStorage.clear();
							props.navigation.reset({ index: 0, routes: [{ name: 'Login', params: { token: 'refresh' } }] });
						}
					},
				],
				{
					cancelable: false
				}
			)
		} else {
			const hms = GlobalFunctions.getHMSTime();
			if (stateData.login.UserType == UserType.PDA || stateData.login.UserType == UserType.Marketing) {
				if (hms >= Variables.OfficeStartHours && hms <= Variables.OfficeEndHours && !Variables.LocationTrackingAllowed) {
					GlobalFunctions.showLocationPermissionMessage();
				} else {
					GlobalFunctions.navigate(props, menuName);
				}
			}
			else {
				//props.navigation.navigate(menuName);
				GlobalFunctions.navigate(props, menuName);
			}
		}
	}

	const renderMenus = () => {
		let arrMenus = [];

		newState.routes.map((item, index) => {
			const routeName = getFocusedRouteNameFromRoute(props) ?? '';
			if (routeName != Variables.ActiveRouteName) {
				Variables.ActiveRouteName = routeName;
			}

			if (item.name.indexOf('Separator', 0) > -1) {
				arrMenus.push(
					<View key={item.key} style={{ backgroundColor: Colors.gray, width: '100%', height: 1 }}></View>
				)
			} else {
				arrMenus.push(
					<DrawerItem
						key={item.key}
						label={descriptors[item.key].options.drawerLabel ?? item.name}
						focused={routeName == item.name}
						inactiveTintColor={Colors.black3}
						activeTintColor={Colors.primaryDark}
						//activeBackgroundColor={Colors.primary}
						labelStyle={styles.drawerMenuText}
						onPress={() => menuClickHandler(item.name)}
					/>
				)
			}
		})

		return arrMenus;
	}

	return (
		<View style={styles.navMain}>
			<View style={{ flex: 1 }}>
				<View style={styles.headerSpace}>
					<View style={GS.row100}>
						<View style={{ flex: 1 }}>
							<Image source={require('../assets/profile_pic.png')} style={styles.userImage} />
						</View>
						<View style={{ flex: 2 }}>
							<Text style={styles.profileName}>{stateData.login.Name}</Text>
							<Text style={styles.profileText} onPress={updateProfile}>View/Change Profile</Text>
						</View>
					</View>
				</View>

				<SafeAreaView style={{ flex: 1 }}>
					<DrawerContentScrollView {...props}
						contentContainerStyle={{
							paddingTop: 5,
						}}>
						{/* <DrawerItemList {...props} onPress={() => { console.log('ok') }} /> */}

						{/* <DrawerItemList state={newState} {...rest} navigation={onDrawetItemPress} /> */}

						{renderMenus()}

						<DrawerItem
							label="Logout"
							inactiveTintColor={Colors.lightBlack}
							activeTintColor={Colors.primaryDark}
							activeBackgroundColor={Colors.primary}
							labelStyle={styles.logoutMenuText}
							onPress={() => menuClickHandler('Logout')}
						/>
					</DrawerContentScrollView>
				</SafeAreaView>

				{/* {<DrawerItems
                    {...props}
                    items={items.filter((item) =>
                        item.routeName !== 'Profile' &&
                        (item.routeName !== "Documents" || (item.routeName === "Documents" && stateData.login.VendorId == 0)) &&
                        (item.routeName !== "Agreement" || (item.routeName === "Agreement" && stateData.login.VendorId == 0)) &&
                        //(stateData.login.VendorId == 0 || (stateData.login.VendorId != 0 && item.routeName !== "Documents")) &&
                        (item.routeName !== 'NewSignups' || (item.routeName === 'NewSignups' && stateData.login.SeeSignups == 1))
                    )}
                    onItemPress={(route) => drawerItemPressed(route)}                
                />} */}

				{/* <View style={{marginTop: -4}}>
                    <DrawerMenu ClickHandler={onLogoutClicked} Title="Logout" style={styles.logout} />
                </View> */}
			</View>

			<View style={styles.versionSection}>
				<View style={styles.versionText}>
					<Text>Version {Constants.manifest.version}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	navMain: {
		flex: 1,
		//marginTop: Platform.OS == 'ios' ? 0 : Constants.statusBarHeight
	},
	headerSpace: {
		backgroundColor: Colors.primary,
		justifyContent: 'center',
		height: 90,
		padding: 10
	},
	logoutMenuText: {
		fontSize: 15,
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
		color: Colors.red
	},
	userImage: {
		width: 70,
		height: 70,
		borderRadius: 35,
		marginLeft: 5
	},
	drawerMenuText: {
		fontSize: 15,
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
	},
	headerText: {
		color: Colors.black,
		fontSize: 30
	},
	logout: {
		color: Colors.red
	},
	profileName: {
		fontWeight: 'bold',
		fontFamily: 'Roboto_bold',
		fontSize: 20,
		marginTop: 10,
		marginBottom: 3
	},
	profileText: {
		paddingTop: 3,
		paddingBottom: 5
	},
	versionSection: {
		width: '100%',
		justifyContent: 'flex-end'
	},
	versionText: {
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.offWhite,
		textAlignVertical: 'bottom'
	},
});


export default DrawerContent;