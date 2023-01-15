import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const UpdateProfile = (displayName, photoURL) => {
    

    auth()
      .currentUser.updateProfile(
        {
        displayName: displayName,
        photoURL:photoURL,
      })
      .then(() => navigation.replace("HomeScreen"))
      .catch((error) => {
        Alert(error);
        console.error(error);
      });
       
}
