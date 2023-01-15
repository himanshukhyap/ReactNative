import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'

const MyTextInput = () => {
  const [userName, setUserName] = useState('');
  return (
    <View>
      <TextInput
        value={userName}
        onChangeText={(userName) => setUserName(userName)}
        placeholder={'UserName'}
        style={styles.input}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#ffffff',
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#e8e8e8'
  },
});

export default MyTextInput