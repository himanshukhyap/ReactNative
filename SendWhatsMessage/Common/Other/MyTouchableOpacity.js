//React Native Touchable – 4 Different Type of Touchables
//https://aboutreact.com/react-native-touchable/

//import React in our code
import React from 'react';

//import all the components we are going to use
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const MyTouchableOpacity = () => {
  const onPress = (msg) => {
    //For generating alert on buttton click
    alert('Alert for: ' + msg);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>

        {/*Only for android remove TouchableNativeFeedback for iOS*/}
        <TouchableNativeFeedback
          onPress={
            () => onPress('TouchableNativeFeedback Pressed')
          }
          background={
            TouchableNativeFeedback.SelectableBackground()
          }>
          <View style={styles.button}>
            <Text>
              Touchable Native Feedback(Only Android)
            </Text>
          </View>
        </TouchableNativeFeedback>

        <TouchableHighlight
          style={styles.button}
          onPress={
            () => onPress('TouchableHighlight Pressed')
          }>
          <Text>
            Touchable Highlight
          </Text>
        </TouchableHighlight>

        <TouchableOpacity
          style={styles.button}
          onPress={
            () => onPress('TouchableOpacity Pressed')
          }>
          <Text>
            Touchable Opacity
          </Text>
        </TouchableOpacity>

        <TouchableWithoutFeedback
          style={styles.button}
          onPress={
            () => onPress('TouchableWithoutFeedback Pressed')
          }>
          <View style={styles.button}>
            <Text>Touchable Without Feedback</Text>
          </View>
        </TouchableWithoutFeedback>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});

export default MyTouchableOpacity;