//React Native Switch
//https://aboutreact.com/react-native-switch/

//import React in our code
import React, {useState} from 'react';

//import all the components we are going to use
import {
  Switch,
  View,
  Text,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { screen_width } from './DimensionCom';
import Colors from './Colors';

const SwitchCom = (props) => {
  const [switchValue, setSwitchValue] = useState(false);
  const toggleSwitch = (value) =>setSwitchValue(value);
  
// console.warn(switchValue)

  return (
    // <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>

        <Switch
          trackColor={{false: Colors.dangerLight, true: '#81b0ff'}}
          thumbColor={switchValue ? Colors.black : '#f4f3f4'}
          style={{marginTop: 30}}
          onValueChange={toggleSwitch}
          value={switchValue}
          disabled={false}
        />
      </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  //  backgroundColor:Colors.blue
  },
});

export default SwitchCom;