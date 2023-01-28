//React Native Picker
//https://aboutreact.com/react-native-picker/
// npm install @react-native-picker/picker --save
//import React in our code
import React, {useState} from 'react';

//import all the components we are going to use
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet
} from 'react-native';

import {Picker} from '@react-native-picker/picker';

const MyDropDown = () => {
  const [choosenLabel, setChoosenLabel] = useState('Native');
  const [choosenIndex, setChoosenIndex] = useState('2');

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/*Picker with multiple chose to choose*/}
        {/*selectedValue to set the preselected value if any*/}
        {/*onValueChange will help to handle the changes*/}
        <Picker
          selectedValue={choosenLabel}
          onValueChange={(itemValue, itemIndex) => {
            setChoosenLabel(itemValue);
            setChoosenIndex(itemIndex);
          }}>
          <Picker.Item label="Hello" value="Hello" />
          <Picker.Item label="React" value="React" />
          <Picker.Item label="Native" value="Native" />
          <Picker.Item label="How" value="How" />
          <Picker.Item label="are" value="are" />
          <Picker.Item label="you" value="you" />
        </Picker>
        {/*Text to show selected picker value*/}
        <Text style={styles.text}>
          Selected Value: {choosenLabel}
        </Text>
        {/*Text to show selected index */}
        <Text style={styles.text}>
          Selected Index: {choosenIndex}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default MyDropDown;