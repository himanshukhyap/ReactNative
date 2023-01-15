import auth from '@react-native-firebase/auth';
export const logout =async () => {
  await  auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}
