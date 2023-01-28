// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Linking
} from 'react-native';

import { ButtonCom } from './Common/TagComponent/ButtonCom';

const App = () => {
return(
  <View>
   <ButtonCom
          
            onPress={() => {
              Linking.openURL('https://aboutreact.com');
            }}
           ButtonText=" AboutReact"
            >
          </ButtonCom>
  </View>
)
  };


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});

export default App;