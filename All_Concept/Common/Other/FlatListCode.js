// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator

} from 'react-native';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(1);
  const [refreshing, setRefreshing] = useState(true);
  // const [dataSource, setDataSource] = useState([]);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);


  const getData = ()=>{
    setLoading(true);
    // fetch('https://abooutreactapis.000webhostapp.com/getpost.php?offset='
    // + offset)
     fetch('https://jsonplaceholder.typicode.com/posts?offset= '+ offset+"&limit="+10)
    .then((response) => response.json())
    .then((responseJson) => {
      setOffset(offset + 1);
      // setFilteredDataSource(responseJson);
      //  console.log(responseJson)
      // setMasterDataSource(responseJson);
      setRefreshing(false);
      setFilteredDataSource([...filteredDataSource, ...responseJson]);
      setMasterDataSource([...masterDataSource, ...responseJson]);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  const searchFilterFunction = (text) => {

    // Check if searched text is not blank
    if (text) {

      const newData = masterDataSource.filter(x => {
        const ietmstring = x.title.toUpperCase()
        let result = ietmstring.match(text.toUpperCase());
        return result

      }


      );
      console.log(newData)
      setFilteredDataSource(newData);
      setSearch(text);
    } else {

      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };
  const onRefresh = () => {
    //Clear old data of the list
    setMasterDataSource([]);
    setFilteredDataSource([])
    //Call the Service to get the latest data
    getData();
  };
  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getData}
          //On Click of button load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {loading ? (
            <ActivityIndicator
              color="white"
              style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
    
  };
  const ListHeader = () => {
    //View to set in Header
    return (
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>
            This is Header
        </Text>
      </View>
    );
  };

  const ListFooter = () => {
    //View to set in Footer
    return (
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>
            This is Footer
        </Text>
      </View>
    );
  };
  const EmptyListMessage = ({item}) => {
    return (
      // Flat List Item
      <Text
        style={styles.emptyListStyle}
        onPress={() => getItem(item)}>
        No Data Found
      </Text>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          enableEmptySections={true}
          refreshControl={
            <RefreshControl

              //refresh control used for the Pull to Refresh
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListEmptyComponent={EmptyListMessage}
           ListFooterComponent={renderFooter}
           ListHeaderComponent={ListHeader}
        //Footer to show below listview
        // ListFooterComponent={ListFooter}
         
         
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  itemStyle: {
    padding: 10,
  },
  headerFooterStyle: {
    width: '100%',
    height: 45,
    backgroundColor: '#606070'
    
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    padding: 7,
  },
});

export default App;