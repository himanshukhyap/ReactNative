// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import { MenuIcon, UserIcon } from '../../constants/IconCom';
import { screen, screen_width, window_width } from '../../constants/DimensionCom';

const NavigationDrawerHeader = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row',color:Colors.white, alignItems:'flex-start',justifyContent:'flex-start'}}>
      <TouchableOpacity onPress={toggleDrawer} style={{color:Colors.white}}>
       
       <MenuIcon name="menu"  size={screen.fontScale*30} style={{color:Colors.white,
         marginRight: screen_width*0.02
        }} />
      </TouchableOpacity>
    </View>
  );
};
export default NavigationDrawerHeader;
