import storage from '@react-native-firebase/storage';


const uploadFile = (localFilePath) => {

    const reference = storage().ref('/myfiles/mycollection/my-file.txt');
    const task = reference.putFile(localFilePath);
    task.on('state_changed', taskSnapshot => {
        console.log(`${taskSnapshot.bytesTransferred} transferred 
    out of ${taskSnapshot.totalBytes}`);
    });
    task.then(() => {
        console.log('Image uploaded to the bucket!');
    });

    //   task.pause();
    // task.resume();
}