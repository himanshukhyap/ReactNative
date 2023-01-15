import React from 'react';
import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/SettingScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Task from '../AfterLogin/Task/Task';
import Storage from '../AfterLogin/Storage/Storage';
import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Task">
      <Stack.Screen
        name="Task"
        component={Task}
        options={{
          title: 'Task', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: Colors.black, //Set Header color

          },
          headerTintColor: Colors.white, //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const StorageScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Storage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: Colors.black, //Set Header color

        },
        headerTintColor: Colors.white, //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="Storage"
        component={Storage}
        options={{
          title: 'Storage', //Set Header Title


        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = () => {
  return (

    <Drawer.Navigator
      // drawerContentOptions={{
      //   activeTintColor: '#cee1f2',
      //   color: '#cee1f2',
      //   itemStyle: { marginVertical: 5, color: 'white' },
      //   labelStyle: {
      //     color: Colors.white1,
      //   },
      // }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: Colors.black, //Set Drawer background
          width: 250, //Set Drawer width
        },
        headerStyle: {
          backgroundColor: Colors.white, //Set Header color
        },
        headerTintColor: Colors.white, //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
        drawerActiveBackgroundColor:Colors.black,
        drawerActiveTintColor:Colors.accent,
        drawerInactiveTintColor:Colors.white
      }}
      drawerContent={CustomSidebarMenu}
    >

      <Drawer.Screen
        name="HomeScreenStack"
        options={{
          drawerLabel: 'Task',
          headerShown: false,
          color: Colors.white,
          // drawerActiveTintColor:Colors.accent,
          // drawerInactiveTintColor:Colors.white1,
        }}
        component={HomeScreenStack}

      />
      <Drawer.Screen
        name="StorageScreenStack"
        options={{ 
          drawerLabel: 'Storage',
          headerShown: false,
          color: Colors.white,
          // drawerActiveTintColor:Colors.accent,
          // drawerInactiveTintColor:Colors.white1
         }}
        component={StorageScreenStack}

      />


    </Drawer.Navigator>

  );
};

export default DrawerNavigatorRoutes;
