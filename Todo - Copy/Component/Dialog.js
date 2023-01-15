import React, { useState } from 'react';
import {
Button,
Dialog,
CheckBox,
ListItem,
Avatar,
} from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

import React from 'react'

function DialogCom() {

    const [visible1, setVisible1] = useState(false);
    
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);
    const [visible5, setVisible5] = useState(false);
    const [visible6, setVisible6] = useState(false);
    const [checked, setChecked] = useState(1);
    
    const toggleDialog1 = () => {
      setVisible1(!visible1);
    };
    const toggleDialog2 = () => {
      setVisible2(!visible2);
    };
    const toggleDialog3 = () => {
      setVisible3(!visible3);
    };
    const toggleDialog4 = () => {
      setVisible4(!visible4);
    };
    const toggleDialog5 = () => {
      setVisible5(!visible5);
    };
    const toggleDialog6 = () => {
      setVisible6(!visible6);
    };

  return (
    <Button
    title="Open Simple Dialog"
    onPress={toggleDialog1}
 
  />
  )
}

export default DialogCom