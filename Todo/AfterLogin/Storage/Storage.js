import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { utils } from '@react-native-firebase/app';
import storage, { firebase } from '@react-native-firebase/storage';
import { Button } from '@rneui/themed';
import DocumentPicker from "react-native-document-picker";
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '@rneui/base';
import { DeleteItem, getItem } from '../../Firebase/Storage/Crud';


const Storage = () => {
    const user = firebase.auth().currentUser;
    const [Loading, setLoading] = useState(false);
    const [filePath, setFilePath] = useState([]);
    const [process, setProcess] = useState("");
    const [listData, setListData] = useState([]);
const [foruseeffct, setforuseeffct] = useState(false)
    const listFilesAndDirectories = (pageToken) => {
        const reference = storage().ref(`${user?.uid}`);
        setListData([])
        return reference.list({ pageToken }).then(result => {
            // Loop over each item
            result.items.forEach(ref => {

                setListData((previous) => {
                    return [...previous, ref];
                })
            });

            if (result.nextPageToken) {
                return listFilesAndDirectories(reference, result.nextPageToken);
            }

            return Promise.resolve();
        });
    };
    useEffect(() => {
        listFilesAndDirectories("");
    }, [Loading,foruseeffct]);
    const _chooseFile = async () => {

        try {
            const fileDetails = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
                copyTo: "cachesDirectory"
            });

            setFilePath(fileDetails);
        } catch (error) {
            setFilePath([]);

            alert(
                DocumentPicker.isCancel(error)
                    ? "Canceled"
                    : "Unknown Error: " + JSON.stringify(error)
            );
        }

    };

    const _uploadFile = async () => {
        try {

            if (Object.keys(filePath).length == 0)
                return alert("Please Select any File");
            await filePath.map(async (x) => {


                const reference = await storage().ref(
                    `${user?.uid}/${x["name"]}`
                );
                const pathToFile = await `${x["fileCopyUri"]}`;

                const task = reference.putFile(pathToFile);

                await task.on("state_changed", (taskSnapshot) => {
                    setProcess(
                        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
                    );
                });
                await task.then(() => {
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
        await setLoading(true);
    };

    return (
        <View style={styles.container}>

            <View >
                <Text style={styles.titleText}>
                    Upload Input Text as File on FireStorage
                </Text>
                <View >

                    <Text style={{fontWeight:'800',alignSelf:'center'}}>{process}</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={_chooseFile}
                    >
                        <Text >
                            Choose Image (Current Selected:{" "}
                            {filePath.length == 0
                                ? 0
                                : filePath.length}
                            )
                        </Text>
                    </TouchableOpacity>
                    <Button
                        buttonStyle={{ flexWrap: 'wrap', width: "80%", alignSelf: 'center', padding: 10 }}
                        onPress={_uploadFile}
                        loading={Loading}
                        title="Upload File on FireStorage"
                    />

                </View>

            </View>

            <View style={{marginTop:15,borderTopWidth:1,}}>
                {
                    listData?.map((x) => {
                        return (
                            <View key={x + 2} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',padding:15,marginBottom:10 }}>
                                <Text onPress={() => { getItem(x.fullPath) }} key={x + 1}>{x.name}</Text>
                                <Button type='clear' key={x + 3} icon={{ name: "delete", color: "red" }} onPress={() => { DeleteItem(x.fullPath);setforuseeffct(!foruseeffct) }} />
                            </View>
                        )
                    })}
            </View>


        </View>



    )
}

export default Storage

const styles = StyleSheet.create({
    container: {

        backgroundColor: "#61616130",
        padding: 10,
        height: "100%"

    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        padding: 20,


    },
    buttonStyle: {
        alignItems: "center",
        backgroundColor: "orange",
        padding: 15,
        alignSelf: 'center',
        width: "80%",
        marginTop: 16,
        marginBottom: 16,
    },

})