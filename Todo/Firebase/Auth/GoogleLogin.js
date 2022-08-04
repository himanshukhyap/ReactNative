import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';


export const GoogleLogin = async () => {

  GoogleSignin.configure({
    webClientId: "760485064446-97djaltqirgpfh1spj7mfeknfkgm2uat.apps.googleusercontent.com"
  });

  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  //Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);


}



export const loginEmailAndPassword = async (Email, Password) => {
  console.log(Email);
  console.log(Password);

  if (Email != null && Password != null) {
    await auth()
      .signInWithEmailAndPassword(Email, Password)
      .then(() => {
        console.log("Signed in ");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        Alert.alert(
          errorCode

        );
      });
  }
}