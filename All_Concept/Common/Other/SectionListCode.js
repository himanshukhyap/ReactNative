// Example to make Section List in React Native
// https://aboutreact.com/react-native-sectionlist/

// import React in our code
import React from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  SectionList,
  Text
} from 'react-native';

const App = () => {
  let A = [
    {id: '1', value: 'Afghanistan'},
    {id: '2', value: 'Afghanistan'},
    {id: '3', value: 'Afghanistan'},
  ];
  let B = [
    {id: '4', value: 'Benin'},
    {id: '5', value: 'Bhutan'},
    {id: '6', value: 'Bosnia'},
    {id: '7', value: 'Botswana'},
    {id: '8', value: 'Brazil'},
    {id: '9', value: 'Brunei'},
    {id: '10', value: 'Bulgaria'},
  ];
  let C = [
    {id: '11', value: 'Cambodia'},
    {id: '12', value: 'Cameroon'},
    {id: '13', value: 'Canada'},
    {id: '14', value: 'Cabo'},
  ];


  const FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={styles.listItemSeparatorStyle} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SectionList
          ItemSeparatorComponent={FlatListItemSeparator}
          sections={[
            {Header: 'Section Head For Data A', data: A},
            {Header: 'Section Head For Data B', data: B},
            {Header: 'Section Head For Data C', data: C},
          ]}
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeaderStyle}>
              {section.Header}
            </Text>
          )}
          renderItem={({item}) => (
            // Item for the FlatListItems
            <Text
              style={styles.sectionListItemStyle}
              //Item Separator View
              onPress={() => alert(JSON.stringify(item))}>
              {item.value}
            </Text>
          )}
          // keyExtractor={(item, index) => index}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  sectionHeaderStyle: {
    backgroundColor: '#CDDC89',
    fontSize: 20,
    padding: 5,
    color: '#fff',
  },
  sectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: '#000',
    backgroundColor: '#F5F5F5',
  },
  listItemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
});