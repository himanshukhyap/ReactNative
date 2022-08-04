import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, SafeAreaView, TextInput, Pressable, StatusBar } from "react-native";

import { AddDoc } from '../../Firebase/Add';

import { styles } from './TaskStyle';
import { CheckBox, Icon, Button } from '@rneui/themed';
import { FAB } from '@rneui/themed';
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
        flexDirection: "row", width: "100%", justifyContent:'center',paddingVertical:15,paddingHorizontal:10
      }}>
        <TextInput style={styles.inputAdd} placeholder="Add Task" onChangeText={setAddTask} editable={true} value={AddTask} />

        <FAB
          onPress={addtask}

          icon={{ name: 'add', color: 'white' }}
          color="green"
          style={{marginLeft:10}}
        />
        


      </View>
  
  )
}