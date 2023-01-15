import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, SafeAreaView, TextInput, Pressable, StatusBar } from "react-native";

import { AddDoc } from '../../Firebase/Add';

import { styles } from './TaskStyle';
import { CheckBox, Icon, Button } from '@rneui/themed';
import { FAB } from '@rneui/themed';
import { NormalInput } from '../../constants/InputCom';
import Colors from '../../constants/Colors';
import { screen, screen_height, screen_width } from '../../constants/DimensionCom';
import { EnterIcon } from '../../constants/IconCom';
export default function AddTaskCom(uid) {

  const [AddTask, setAddTask] = useState(null)


  const addtask = () => {
    if (AddTask == null || AddTask == "") {
      alert("Enter task")

    }
    if (AddTask != null && AddTask != "") {
      AddDoc(uid.uid, AddTask)
      setAddTask(null)
    }

  }

  return (


    <View style={{
      flexDirection: "row", 
      width: screen_width*1, 
      alignItems:'center',
      justifyContent:'center',
      marginBottom:screen_height*0.01,
      // paddingVertical: 15, paddingHorizontal: 10
    }}>
      <NormalInput style={styles.inputAdd} placeholder="Add Task" onChangeText={setAddTask} editable={true} value={AddTask} />

      <EnterIcon style={{ color: Colors.white, marginLeft: 5 }} size={screen.scale * 17} onPress={addtask}
      />
      {/* <FAB
          onPress={addtask}

          icon={{ name: 'add', color: 'white' }}
          color="green"
          style={{marginLeft:10}}
        /> */}



    </View>

  )
}