import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { utils } from '@react-native-firebase/app';
import storage, { firebase } from '@react-native-firebase/storage';
import { Button } from '@rneui/themed';
import DocumentPicker from "react-native-document-picker";
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '@rneui/base';
import { getItem } from '../../Firebase/Storage/Crud';
import Colors from '../../constants/Colors';
import { container } from '../../CSS/CssLibrary';
import { screen, screen_height, screen_width } from '../../constants/DimensionCom';


const Storage = () => {
    const user = firebase.auth().currentUser;
    const [Loading, setLoading] = useState(false);
    const [loader, setloader] = useState(false);
    const [loaderchoose, setloaderchoose] = useState(false);
    const [filePath, setFilePath] = useState([]);
    const [process, setProcess] = useState("");
    const [listData, setListData] = useState([]);
    const [path, setpath] = useState(null);
    const [foruseeffct, setforuseeffct] = useState(false)
    console.log(listData)
    const listFilesAndDirectories = (pageToken) => {
        const reference = storage().ref(`${user?.uid}`);
        return reference.list({ pageToken }).then(result => {

            setListData([result.items])
            setloader(false)
            if (result.nextPageToken) {
                return listFilesAndDirectories(reference, result.nextPageToken);
            }

            return Promise.resolve();
        });
    };
    const DeleteItem = async (fullPath) => {
        setloader(true)
        await storage()
            .ref(fullPath)
            .delete()
            .catch((e) => {
                console.error(e);
            });
        setforuseeffct(!foruseeffct)
        // Linking.openURL(url);

    };
    useEffect(() => {
        listFilesAndDirectories("");
    }, [foruseeffct, process]);
    const _chooseFile = async () => {
        setloaderchoose(true)
        try {
            const fileDetails = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
                copyTo: "cachesDirectory"
            });

            setFilePath(fileDetails);
            setloaderchoose(false)
        } catch (error) {
            setFilePath([]);
            setloaderchoose(false)
            alert(
                DocumentPicker.isCancel(error)
                    ? "Canceled"
                    : "Unknown Error: " + JSON.stringify(error)
            );
        }

    };

    const _uploadFile = () => {
        try {

            if (Object.keys(filePath).length == 0)
                return alert("Please Select any File");
            filePath.map((x) => {


                const reference = storage().ref(
                    `${user?.uid}/${x["name"]}`
                );
                const pathToFile = `${x["fileCopyUri"]}`;

                const task = reference.putFile(pathToFile);

                task.on("state_changed", (taskSnapshot) => {
                    const k = 1024;
                    const decimals = 2
                    const dm = decimals < 0 ? 0 : decimals;
                    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

                    const i = Math.floor(Math.log(taskSnapshot.totalBytes) / Math.log(k));


                    setProcess(

                        `${parseFloat((taskSnapshot.bytesTransferred / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]} transferred out of ${parseFloat((taskSnapshot.totalBytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]}`

                    )


                });
                task.then(() => {
                    setLoading(false)
                    setProcess("");
                });
            })
            // await alert("Image uploaded to the bucket!");
            setFilePath([]);

        } catch (error) {
            console.log("Error->", error);
            alert(`Error-> ${error}`);
        }
        setLoading(true);
    };

    return (
        <View style={{...container,backgroundColor:Colors.black}}>
            <View >
                <View style={{ marginBottom: screen_height*0.01 }}>
                    <Text style={styles.titleText}>
                        File on FireStorage
                    </Text>
                    <View >
                        <Text style={{ fontWeight: '800', alignSelf: 'center' }}>{process}</Text>
                        
                        <Button
                            activeOpacity={0.5}
                            buttonStyle={styles.buttonStyle}
                            onPress={_chooseFile}
                            loading={loaderchoose}
                            >
                            <Text >
                                Choose Image (Current Selected:{" "}
                                {filePath.length == 0
                                    ? 0
                                    : filePath.length}
                                )
                            </Text>
                        </Button>
                        <Button
                            buttonStyle={{...styles.buttonStyle,backgroundColor:Colors.darkGreen}}
                            onPress={_uploadFile}
                            loading={Loading}
                            title="Upload File on FireStorage"
                        />
                    </View>
                </View>
            </View>

            <ScrollView>
                <View style={{  width: "100%" }}>
                    {
                        listData?.map((ref) => {
                            return (
                                ref?.map((x) => {
                                    return (
                                        <View key={x + 2} style={{ flexDirection: 'row', alignItems: 'center',justifyContent:"center", paddingHorizontal:screen_width*0.05, marginBottom: screen_height*0.01 }}>
                                            {/* <Text style={{ color: 'blue', width: "80%" }} onPress={() => { getItem(x.fullPath) }} key={x + 1} >{x.name}</Text> */}
                                            <TouchableOpacity style={{ color: 'blue', width: "80%", }} onPress={() => { getItem(x.fullPath) }} key={x + 1}>
                                                <View >
                                                    <Text style={{ color: Colors.white1, }}>{x.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{ width: "20%" ,alignItems:"flex-end"}}>
                                                <Button type='clear' key={x + 3} icon={{ name: "delete", color: "red" }} onPress={() => { DeleteItem(x.fullPath); setpath(x.fullPath) }} loading={path == x.fullPath ? loader : false} />
                                            </View>
                                        </View>
                                    )
                                })
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Storage

const styles = StyleSheet.create({
    container: {

        backgroundColor: Colors.black,
        padding: 10,
        height: "100%"

    },
    titleText: {
        fontSize: screen.fontScale*20,
        fontWeight: "bold",
        textAlign: "center",
        //  padding: screen.,
        color: Colors.accent


    },
    buttonStyle: {
        alignItems: "center",
        backgroundColor: Colors.blue,
         padding: screen.fontScale*10,
        alignSelf: 'center',
        width: screen_width*.80,
        marginTop: screen_height*0.01,
        marginBottom: screen_height*0.02,
        // shadowColor: '#171717',
        // shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        borderRadius: 15,
    },

})