import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const createuser = (Email, Password) => {
    console.log(Email);
    console.log(Password);

    auth()
        .createUserWithEmailAndPassword(Email, Password)
        .then(() => {

            console.log('User account created & signed in!');
        })
        .catch(error => {
            Alert.alert(
                error.code

            );

            console.error(error);
        });
}
