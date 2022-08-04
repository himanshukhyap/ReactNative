import firestore from '@react-native-firebase/firestore';


export const deleteDoc=(uid,doc)=>{
    firestore()
    .collection(uid)
    .doc(doc)
    .delete()
    .then(() => {
      console.log('User deleted!');
    });
}
