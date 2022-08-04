import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Button, Pressable, StatusBar } from "react-native";
export const styles = StyleSheet.create({
   
    scrollView: {
      // backgroundColor: '#adb5bd',
      paddingHorizontal:10
    },
    header: {
     
      paddingVertical: 8,
      borderWidth: 4,
      borderColor: "#20232a",
      borderRadius: 6,
      backgroundColor: "#61dafb",
      color: "#20232a",
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold"
    },
    item: {
      textAlignVertical: 'center',
      paddingLeft: 6,
      fontSize: 18,
      fontWeight: 'bold',
      width: 100


    },
    input: {

      borderBottomWidth:1,
      padding:10,
      boxSizing: "border-box",
      borderColor:"white",
      width: "95%",
      flexWrap: "wrap",
      fontSize: 18,
      fontWeight: 'bold',
      color:"white",
      padding:10,
      margin:0,
      


    },
    button: {
      // alignItems: 'center',
      // justifyContent: 'center',
      paddingVertical: 5,
      paddingHorizontal: 1,
      borderRadius: 0,
      elevation: 3,
      
      
      

    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
      width:"80%",
      paddingVertical: 5,
      paddingHorizontal: 5,
      boxSizing: "border-box",
      borderColor:"white",
      margin:0,
   

    },
    subHeader: {
      backgroundColor: "#2089dc",
      color: "white",
      textAlign: "center",
      paddingVertical: 5,
      marginBottom: 10,
      marginVertical: 10
    },inputAdd: {

      borderWidth: 1,
      paddingVertical: 5,
      paddingHorizontal: 5,
      boxSizing: "border-box",
      width: "85%",
      flexWrap: "wrap",
      fontSize: 18,
      fontWeight: 'bold',
    
    },
    buttonAdd: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
      paddingHorizontal: 0,
      borderRadius: 0,
      elevation: 3,
      width: "15%"

    },
  });