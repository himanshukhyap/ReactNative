// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef, useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Loader from './Components/Loader';
import { createuser } from '../Firebase/Auth/createuser';
import { firebase } from '@react-native-firebase/firestore'
import { CheckIcon, UserIcon } from '../constants/IconCom';
import { screen } from '../constants/DimensionCom';
import Colors from '../constants/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
import { container } from '../CSS/CssLibrary';
import { EmailInput, NormalInput, PasswordInput } from '../constants/InputCom';
import { MyButton } from '../constants/MyButton';
import { IsEmailValid, IsFullNameValid, IsPasswordValid } from '../constants/Validator/ValidatorFunction';

const RegisterScreen = ({ navigation }) => {
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  // const [errortext, setErrortext] = useState('');
  const user = firebase.auth().currentUser;
  const [Email, setEmail] = useState(null)
  const [password, setpassword] = useState(null)
  const[displayName, setdisplayName] = useState("")
  const emailInputRef = createRef();
  if (user != null) {
    navigation.navigate('Task')
    setEmail(null); setpassword(null)
  }
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef(null)

  const handleSubmitButton = async () => {
    const _IsFullNameValid= IsFullNameValid(displayName)
    const isemailvalid = _IsFullNameValid?IsEmailValid(Email):false
    const ispasswordvalid = isemailvalid ? IsPasswordValid(password) : false

    if (isemailvalid === true & ispasswordvalid === true) {
      // console.warn("df")
      await createuser(Email, password,displayName )
      setLoading(true)
      // await   setIsRegistraionSuccess(true)
    }

  };

  return (
    <View style={{ ...container, backgroundColor: Colors.black }}>
      {/* <Loader loading={true} /> */}

      <Spinner visible={loading} />
      <CheckIcon style={{ color: Colors.white1 }} size={screen.scale * 45} />
      {/* <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../Image/aboutreact.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View> */}
 <NormalInput
        // style={styles.inputStyle}
        onChangeText={(val) => setdisplayName(val)}
        placeholder="Enter Full Name"
        placeholderTextColor={Colors.white}
        keyboardType="sentense"
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() =>
          emailInputRef.current &&
          emailInputRef.current.focus()
        }
      />
      <EmailInput
        // style={styles.inputStyle}
        onChangeText={(val) => setEmail(val)}
        placeholder="Enter Email"
        placeholderTextColor={Colors.white}
        keyboardType="email-address"
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() =>
          passwordInputRef.current &&
          passwordInputRef.current.focus()
        }
      />
      <PasswordInput
        placeholder="Enter Password"
        placeholderTextColor={Colors.white}
        secureTextEntry={true}
        returnKeyType="next"
        blurOnSubmit={false}
        onChangeText={(val) => setpassword(val)}
        onSubmitEditing={Keyboard.dismiss}
        refs={passwordInputRef}
      />

      <MyButton
        onPress={handleSubmitButton}
        style={{
          // width: "70%",
          borderRadius: 25,
          // height: 50,
          alignItems: "center",
          justifyContent: "center",
          marginTop: screen.height * 0.02,
          backgroundColor: Colors.gray,

        }}
        textStyle={{
          color: Colors.black
          // backgroundColor:Colors.black3
        }}
        title="REGISTER"

      />



    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
