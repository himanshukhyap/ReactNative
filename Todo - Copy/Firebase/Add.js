import firestore from '@react-native-firebase/firestore';

export const AddDoc = async (uid, data) => {

  let timestamp = firestore.Timestamp.now().toDate()

  let obj = { Task: data, Date: timestamp, Complete: false }
  await firestore()
    .collection(uid)
    .add(obj)
    .then(() => {
      console.log('User added!');
    });
}