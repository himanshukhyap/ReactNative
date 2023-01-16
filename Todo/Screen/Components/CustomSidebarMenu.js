// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-community/async-storage';
import { logout } from '../../Firebase/Auth/SingOut';
import Variables from '../../constants/Variables';
import Colors from '../../constants/Colors';
import { screen, screen_width } from '../../constants/DimensionCom';

const CustomSidebarMenu = (props) => {
  const user = firebase.auth().currentUser;
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{fontSize: screen.fontScale*18, color: Colors.black,}}>
            {user.displayName==null?"To Do":user.displayName.toLocaleUpperCase().charAt(0)}
            {/* {user?.displayName==null?"TODO":user?.displayName?.toLocaleUpperCase().charAt(0)} */}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>{user.displayName==null?"TO DO":user.displayName.toLocaleUpperCase()}</Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({color}) => <Text style={{color: Colors.lightGreen}}>Logout</Text>}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    logout()
                    Variables.isuser==null;
                    props.navigation.navigate("DrawerNavigationRoutes")
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.black,
    paddingTop: 40,
    color: Colors.white,
    
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.black,
    padding: 15,
    textAlign: 'center',
    width:screen_width*.40
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: Colors.white,
    backgroundColor: Colors.white,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: Colors.white,
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: Colors.black,
    marginTop: 15,
  },
});
