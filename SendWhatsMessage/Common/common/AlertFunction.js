//React Native Alert
//https://aboutreact.com/react-native-alert/

//import React in our code
import React from 'react';

//import all the components we are going to use
import {
  Alert,
  Button,
  View,
  SafeAreaView,
  StyleSheet
} from 'react-native';


export const SimpleAlertHandler = (props) => {
  //function to make simple alert
  Alert.alert(props);
};

export const TwoOptionAlertHandler = () => {
  //function to make two option alert
  Alert.alert(
    //title
    'Hello',
    //body
    'I am two option alert. Do you want to cancel me ?',
    [
      {
        text: 'Yes',
        onPress: () => console.log('Yes Pressed')
      },
      {
        text: 'No',
        onPress: () => console.log('No Pressed'), style: 'cancel'
      },
    ],
    { cancelable: false },
    //clicking out side of alert will not cancel
  );
};

export const ThreeOptionAlertHandler = () => {
  //function to make three option alert
  Alert.alert(
    //title
    'Hello',
    //body
    'I am three option alert. Do you want to cancel me ?',
    [
      {
        text: 'May be',
        onPress: () => console.log('May be Pressed')
      },
      {
        text: 'Yes', onPress: () => console.log('Yes Pressed')
      },
      {
        text: 'OK', onPress: () => console.log('OK Pressed')
      },

    ],
    { cancelable: true },
  );
};





