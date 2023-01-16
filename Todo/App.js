import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginComponent from './Component/Login/LoginComponent';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import Variables from './constants/Variables';
import PhoneCom from './Component/PhoneCom';
import OTPCom from './Component/OTPCom';
import Colors from './constants/Colors';
const Stack = createNativeStackNavigator();

const AuthScreen = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginComponent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: Colors.black, //Set Header color
          },
          headerTintColor: Colors.white, //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="PhoneScreen"
        component={PhoneCom}
        options={{
          title: 'Sign In with Phone', //Set Header Title
          headerStyle: {
            backgroundColor: Colors.black, //Set Header color
          },
          headerTintColor:Colors.white2, //Set Header text color
          headerTitleStyle: {
            fontWeight: '500', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPCom}
        options={{
          title: 'Sign In with Phone', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
console.log(user)
  // const users = firebase.auth().currentUser;
  function onAuthStateChanged(user) {
    Variables.isuser = user?.uid;
    Variables.username = user?.displayName;
    setUser(user);

  }
  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged)
    Variables.isuser = user?.uid;
    Variables.username = user?.displayName;
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // initialParams={{user}}
          options={{ headerShown: false }}
        />
        {user == null || undefined ? <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{ headerShown: false }}
        /> :
          <Stack.Screen
            name="DrawerNavigationRoutes"
            component={DrawerNavigationRoutes}
            options={{ headerShown: false }}
          />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
