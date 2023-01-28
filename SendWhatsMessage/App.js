// Example to Send WhatsApp Message from React Native App
// https://aboutreact.com/send-whatsapp-message/

// import React in our code
import React, { useState } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import Colors from './Common/Colors';
import { NormalInput, NumberInput } from './Common/TagComponent/InputCom';
import { screen, screen_height, screen_width } from './Common/DimensionCom';
import { ButtonCom } from './Common/TagComponent/ButtonCom';
import { SimpleAlertHandler } from './Common/common/AlertFunction';

const App = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsAppMsg, setWhatsAppMsg] = useState(
    ""
  );
  const [IsLoading, setIsLoading] = useState(false)

  const initiateWhatsApp = () => {
    setIsLoading(true)
    // Check for perfect 10 digit length
    if (mobileNumber.length != 10) {
      setIsLoading(false)
      SimpleAlertHandler('Please insert correct WhatsApp number');
      return;
    }
    // Using 91 for India
    // You can change 91 with your country code
    let url =
      'whatsapp://send?text=' +
      whatsAppMsg +
      '&phone=91' + mobileNumber;
    Linking.openURL(url)
      .then((data) => {
        setIsLoading(false)
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
        setIsLoading(false)
      });
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={{ color: Colors.white, fontSize: screen.fontScale * 20, textAlign: 'center' }}>
        Send WhatsApp Message without saved any number        </Text>
      {/* <Text style={styles.titleTextsmall}>
          Enter WhatsApp Number
        </Text> */}
      <NumberInput
        ViewStyle={{ paddingTop: screen_height * .1 }}
        label="Enter WhatsApp Number"
        style={{ color: Colors.white }}
        value={mobileNumber}
        onChangeText={
          (mobileNumber) => setMobileNumber(mobileNumber)
        }
        maxLength={10}
        // placeholder='Enter WhatsApp Number'
        keyboardType="numeric"
        placeholderTextColor={Colors.white1}

      />

      <NormalInput
        ViewStyle={{ paddingVertical: screen_height * .03 }}
        label="WhatsApp Message"
        value={whatsAppMsg}
        onChangeText={
          (whatsAppMsg) => setWhatsAppMsg(whatsAppMsg)
        }
        // placeholder={'WhatsApp Message'}
        style={{ color: Colors.white, }}
        placeholderTextColor={Colors.white1}
      />
      {/* <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonStyle}
        onPress={initiateWhatsApp}>
        <Text style={styles.buttonTextStyle}>
          Send WhatsApp Message
        </Text>
      </TouchableOpacity> */}
      <ButtonCom
        IsLoading={IsLoading}
        ButtonText="Go To WhatsApp"
        onPress={initiateWhatsApp}


      />

    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.black,
    paddingVertical: screen_height * .03,
    alignItems: 'center'

  },
  // titleText: {
  //   fontSize: screen.fontScale*20,
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  //   color:Colors.white
  // },
  // titleTextsmall: {
  //   marginVertical: 8,
  //   fontSize: 16,
  //   color:Colors.white
  // },
  // buttonStyle: {
  //   justifyContent: 'center',
  //   marginTop: 15,
  //   padding: 10,
  //   backgroundColor: '#8ad24e',
  //   color:Colors.white
  // },
  // buttonTextStyle: {
  //   color: '#fff',
  //   textAlign: 'center',
  //   color:Colors.white
  // },
  // textInput: {
  //   height: 40,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   width: '100%',
  //   paddingHorizontal: 10,
  //   color:Colors.white
  // },
});