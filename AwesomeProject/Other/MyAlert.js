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

const MyAlert = () => {
  const simpleAlertHandler = () => {
   
    alert('Hello I am Simple Alert');
  };

  const twoOptionAlertHandler = () => {
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
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  const threeOptionAlertHandler = () => {
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
      {cancelable: true},
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/*To generate simple alert*/}
        <Button
          title="Simple Alert"
          onPress={simpleAlertHandler} />
        {/*To generate two option alert*/}
        <Button
          title="Alert with Two Options"
          onPress={twoOptionAlertHandler}
        />
        {/*To generate three option alert*/}
        <Button
          title="Alert with Three Options"
          onPress={threeOptionAlertHandler}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});

export default MyAlert;