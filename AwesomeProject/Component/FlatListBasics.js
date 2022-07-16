import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const FlatListBasics = () => {
  let data1 = [
    'Devin', 'Dan', 'Dominic', 'Jackson', 'James',
    'Joel',
    'John',
    'Jillian',
    'Jimmy',
    'Julie']
  return (
    <View style={styles.container}>

{data1.map((x)=>{
  return(
<Text style={styles.item} key={x}>{x}</Text>

  )
})}
      {/* <FlatList
        data={[
          { key: 'Devin' },
          { key: 'Dan' },
          { key: 'Dominic' },
          { key: 'Jackson' },
          { key: 'James' },
          { key: 'Joel' },
          { key: 'John' },
          { key: 'Jillian' },
          { key: 'Jimmy' },
          { key: 'Julie' },
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      /> */}
    </View>
  );
}

export default FlatListBasics;