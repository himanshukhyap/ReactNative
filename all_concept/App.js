// Example of Popup Dialog in React Native
// https://aboutreact.com/popup-dialog/

// import React in our code
import React, { useState } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Button,
} from 'react-native';

import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import DialogCom from './Common/common/DialogCom';
import { EmailInput, NormalInput, PasswordCreateInput, PasswordInput, SumbitHanddle, sumbithanddler_ } from './Common/TagComponent/InputCom';
import { ButtonCom } from './Common/TagComponent/ButtonCom';
import { container } from './Common/components/CSS/CssLibrary';
import { Alert } from 'react-native/Libraries/Alert/Alert';
import { IsEmailValid } from './Common/common/Validator function/ValidatorFunction';
import { screen_width } from './Common/DimensionCom';

const App = () => {

  formValue = {}
  const sumbithanddle = () => {
    sumbithanddler_(formValue)
  }
  return (
    <View style={{ ...container }}>
      <EmailInput
        value={formValue}
        label="Enter Email"
      />
      <PasswordInput
        value={formValue}
        label="Enter Password"
      />
      <ButtonCom
        onPress={sumbithanddle}
        ButtonText="Sumbit"
        name="login"
      />
      
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    padding: 16,
  },
  buttonStyle: {
    minWidth: '100%',
    padding: 10,
    backgroundColor: '#f5821f',
    margin: 15,
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
  },
  titleStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
});