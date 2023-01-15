import { Linking } from "react-native";
import storage, { firebase } from '@react-native-firebase/storage';
export const getItem = async (fullPath) => {
    const url = await storage()
      .ref(fullPath)
      .getDownloadURL()
      .catch((e) => {
        console.error(e);
      });
    Linking.openURL(url);
   
  };

  export const DeleteItem = async (fullPath) => {
    const url = await storage()
      .ref(fullPath)
      .delete()
      .catch((e) => {
        console.error(e);
      });
    // Linking.openURL(url);
   
  };