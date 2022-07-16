import React, { useState } from "react";
import { Text, View, Image,  TextInput, ScrollView } from 'react-native';
import FlatListBasics from "./Component/FlatListBasics";
import { Button,ThemeProvider } from '@rneui/themed';
import { Form } from "./Component/Form";

const YourApp = () => {
  const [isHungry, setISsHungry] = useState(true)
  const [Text1, setText1] = useState("")

  return (
    
<ScrollView>
      <View>

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>
            Try editing me! 🎉
          </Text>
        </View>
        <View>
          <Image
            source={{ uri: "https://reactnative.dev/docs/assets/p_cat1.png" }}
            style={{ width: 200, height: 200 }}
          />
      

          <TextInput
            style={{ height: 40 }}
            placeholder="Type here to translate!"
            onChangeText={newText => setText1(newText)}
            defaultValue={Text1}
          />
        </View>
        <FlatListBasics />

        <ThemeProvider>
      <Button title="Hey!" />
    </ThemeProvider>
    <Form/>
       </View>
      
</ScrollView>

  );
}

export default YourApp;