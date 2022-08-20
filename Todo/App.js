
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, Pressable, StatusBar } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { Tab, Text, TabView } from '@rneui/themed';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Task from './AfterLogin/Task/Task';
import Singup from './Component/Singup/Singup';
import LoginComponent from './Component/Login/LoginComponent';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { logout } from './Firebase/Auth/SingOut';
import Storage from './AfterLogin/Storage/Storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

  const Tab = createBottomTabNavigator();
  return (
    <>
      <SafeAreaProvider style={{ flex: 1, justifyContent: 'space-between' }}>
        <NavigationContainer >
          {/* <Stack.Navigator initialRouteName="Login">
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

                      <Icon name="logout" color="white" style={{ backgroundColor: "#413839" }} />
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

                      <Icon name="logout" color="white" style={{ backgroundColor: "#413839" }} />
                    </Button>
                  ),
                }} />

              </>

            )}


          </Stack.Navigator> */}

          <Tab.Navigator initialRouteName="Login" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Login') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Registration') {
                iconName = focused ? 'create-outline' : 'create';
              }
              if (route.name === 'Task') {
                iconName = focused
                  ? 'list'
                  : 'ios-list';
              } else if (route.name === 'Storage') {
                iconName = focused ? 'file-tray-full-outline' : 'file-tray-sharp';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',

          })}>
            {user == null ? (<>
              <Tab.Screen name="Login" component={LoginComponent} />

              <Tab.Screen name="Registration" component={Singup} />
            </>) : (
              <>

                <Tab.Screen name="Task" component={Task} options={{
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

                      <Icon name="logout" color="white" style={{ backgroundColor: "#413839" }} />
                    </Button>
                  ),
                }} />
                <Tab.Screen name="Storage" component={Storage} options={{
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

                      <Icon name="logout" color="white" style={{ backgroundColor: "#413839" }} />
                    </Button>
                  ),
                }} />

              </>

            )}

          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>

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