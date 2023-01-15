// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FirstPage from './screens/FirstPage';
import SecondPage from './screens/SecondPage';
import ThirdPage from './screens/ThirdPage';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const FirstScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="FirstPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="FirstPage"
        component={FirstPage}
      />
    </Stack.Navigator>
  );
}

const SecondScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="SecondPage"
        component={SecondPage} />
      <Stack.Screen
        name="ThirdPage"
        component={ThirdPage} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="first"
          component={FirstPage}
          initialParams={{ itemId: 42 }}
        /> */}
        <Stack.Screen name="Home">
  {(props) => <FirstPage {...{ itemId: 42 }} extraData={{ itemId: 42 }} />}
</Stack.Screen>
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;