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

const MySwitch = () => {
  const [switchValue, setSwitchValue] = useState(false);

  const toggleSwitch = (value) => {
    //To handle switch toggle
    setSwitchValue(value);
    //State changes according to switch
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/*To show Switch state*/}
        <Text>
          {switchValue ? 'Switch is ON' : 'Switch is OFF'}
        </Text>
        {/*Setting the default value of state*/}
        {/*On change of switch onValueChange will be triggered*/}
        <Switch
          style={{marginTop: 30}}
          onValueChange={toggleSwitch}
          value={switchValue}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MySwitch;