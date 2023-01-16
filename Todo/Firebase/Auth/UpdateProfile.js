import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const UpdateProfile = (displayName) => {
    

    auth()
      .currentUser.updateProfile(
        {
        displayName: displayName,
  
      })
      .catch((error) => {
        Alert(error);
        console.error(error);
      });
       
}
