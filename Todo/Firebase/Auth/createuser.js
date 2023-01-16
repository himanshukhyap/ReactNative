import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { UpdateProfile } from './UpdateProfile';

export const createuser = (Email, Password,displayName) => {
    console.log(Email);
    console.log(Password);

    auth()
        .createUserWithEmailAndPassword(Email, Password)
        .then((user) => {
         
            // console.log(user);
            if (user) {
              auth()
                .currentUser.updateProfile({
                  displayName: displayName,
                //   photoURL:
                //     "https://aboutreact.com/profile.png",
                })
                // .then(() => navigation.replace("HomeScreen"))
                .catch((error) => {
                  alert(error);
                  console.error(error);
                });
            }
          })
        .catch(error => {
            Alert.alert(
                error.code

            );

            console.error(error);
        });
}
