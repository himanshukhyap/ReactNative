// Example of Animated Splash Screen in React Native
// https://aboutreact.com/animated-splash-screen/

// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {View, Text, Image, StyleSheet} from 'react-native';

const SplashCom = () => {
  const [align, setAlign] = useState('center');
  const [alignsecond, setAlignsecond] = useState(false);

  useEffect(() => {
    let myTimeout = setTimeout(() => {
      setAlign('flex-start'), setAlignsecond(true);
    }, 1500);
    return () => clearTimeout(myTimeout);
  }, []);

  return (
    <View
      style={[
        styles.container,
        {justifyContent: align}
      ]}>
      <Image
        source={{
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/react_logo.png',
        }}
        style={{width: 100, height: 100}}
      />
      {!alignsecond ? null : (
        <View style={{margin: 10}}>
          <Text
            style={{
              color: '#114998',
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            About React
          </Text>
        </View>
      )}
    </View>
  );
};

export default SplashCom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 40,
  },
});