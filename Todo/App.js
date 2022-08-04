
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput,  Pressable, StatusBar } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { Tab, Text, TabView } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Task from './AfterLogin/Task/Task';
import Singup from './Component/Singup/Singup';
import LoginComponent from './Component/Login/LoginComponent';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

import { logout } from './Firebase/Auth/SingOut';
import Storage from './AfterLogin/Storage/Storage';
const Stack = createNativeStackNavigator();
const App = () => {
  // const Drawer = createDrawerNavigator();
  const [user, setUser] = useState(null);
  const users = firebase.auth().currentUser;
  function onAuthStateChanged(user) {
    setUser(user);

  }
  useEffect(() => {

    auth().onAuthStateChanged(onAuthStateChanged)

  }, []);

  return (
    <>
      {/* <SafeAreaProvider > */}
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            {user == null ? (<>
              <Stack.Screen name="Login" component={LoginComponent} />

              <Stack.Screen name="Registration" component={Singup} />
            </>) : (
              <>

                <Stack.Screen name="Task" component={Task} options={{
                  title: 'Task',
                  headerStyle: {
                    backgroundColor: "#413839",

                  },
                  headerTintColor: 'white',
                  headerTitleStyle: {
                    fontWeight: 'bold',


                  },
                  headerRight: () => (
                    <Button type="solid" onPress={logout} type="clear">
                      
                      <Icon name="logout" color="white" style={{backgroundColor:"#413839"}}/>
                    </Button>
                  ),
                }} />
                 <Stack.Screen name="Storage" component={Storage} options={{
                  title: 'Storage',
                  headerStyle: {
                    backgroundColor: "#413839",

                  },
                  headerTintColor: 'white',
                  headerTitleStyle: {
                    fontWeight: 'bold',


                  },
                  headerRight: () => (
                    <Button type="solid" onPress={logout} type="clear">
                      
                      <Icon name="logout" color="white" style={{backgroundColor:"#413839"}}/>
                    </Button>
                  ),
                }} />
               
              </>

            )}


          </Stack.Navigator>
        </NavigationContainer>
      {/* </SafeAreaProvider> */}
      {/* < GoogleLogin/> */}
    </>
  );


};


export default App;

const styles = {
  container: {
    flex: 1,
    paddingTop: 5,
    padding: 20,
    backgroundColor: "#eaeaea",
    width: "100%",
  },
}