import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstPage from './screens/FirstPage';

const App = () => {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>

      {/* <Stack.Screen name="FirstPage">
        {(props) => <FirstPage {...props} extraData={someData} />}
      </Stack.Screen> */}
      <Stack.Screen
        name="Details"
        component={FirstPage}
        initialParams={{ itemId: 42 }}
        
      />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})