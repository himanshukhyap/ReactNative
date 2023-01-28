// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import Variables from '../constants/Variables';
import { screen, screen_height, screen_width } from '../constants/DimensionCom';
import Colors from '../constants/Colors';

const SplashScreen = ({ navigation, route }) => {
 
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen 
       navigation.replace(Variables.isuser == null ||undefined? 'AuthScreen' : 'DrawerNavigationRoutes')

    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/todo.png')}
        style={{ width: screen_width*.50,height:screen_height*.50, resizeMode: 'contain', margin: 30 }}
      />
      <ActivityIndicator
        animating={animating}
        color={Colors.white}
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
  },
  activityIndicator: {
    alignItems: 'center',
    height: screen_height*.3,
  },
});
