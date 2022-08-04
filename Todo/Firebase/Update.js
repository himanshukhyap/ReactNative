import firestore from '@react-native-firebase/firestore';
export const updateDoc = (UserId,task, data,Type) => {

    let  timestamp= firestore.Timestamp.now().toDate()
    
    if( Type=="Update")
    {
        let  obj =  {Task:task,Update:timestamp}
        firestore()
            .collection(UserId)
            .doc(data.Id)
            .update(obj)
            .then(() => {
                console.log('User updated!');
            });
    }
    if( Type=="CheckBox")
    {
        let  obj =  {Update:timestamp, Complete:!data.Complete}
        firestore()
            .collection(UserId)
            .doc(data.Id)
            .update(obj)
            .then(() => {
                console.log('User updated!');
            });
    }
  
    

}