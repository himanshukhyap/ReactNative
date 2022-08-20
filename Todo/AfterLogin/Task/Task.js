
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, StatusBar } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { FAB, Tab, TabView } from '@rneui/themed';

import { Switch } from '@rneui/themed'
import { updateDoc } from '../../Firebase/Update';
import { deleteDoc } from '../../Firebase/Delete';
import { styles } from './TaskStyle';
import { CheckBox, Button } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import auth, { firebase } from '@react-native-firebase/auth';
import AddTaskCom from './AddTaskCom';
import { SpeedDial } from '@rneui/themed';
import { logout } from '../../Firebase/Auth/SingOut';
const Task = ({ route, navigation }) => {
    const [open, setOpen] = React.useState(false);
    const user = firebase.auth().currentUser;

    // console.log(users);
    // const { user } = route.params;

    const [index, setIndex] = React.useState(0);
    const [checkbox, setcheckbox] = useState(null)
    const [check1, setCheck1] = useState(false);
    const [ChnageTask, setChnageTask] = useState(null);
    const [data, setdata] = useState([])
    const [DocId, setDocId] = useState(null)

    function onResult(QuerySnapshot) {
        let db = []
        QuerySnapshot.forEach(documentSnapshot => {
            let obj = { Id: documentSnapshot?.id, ...documentSnapshot?.data() }
            db.push(obj)
        });
        setdata(db)
    }

    function onError(error) {
        console.error(error);
    }
    useEffect(() => {
        firestore().collection(user?.uid).orderBy('Date', "desc").onSnapshot(onResult, onError)

    }, []);




    return (
        <>

            <View>
                <View style={{ height: "100%", padding: 0, }}>
                    <AddTaskCom uid={user.uid} />
                    <><Tab
                        value={index}
                        onChange={(e) => setIndex(e)}
                        indicatorStyle={{
                            backgroundColor: 'black',
                            height: 3,
                        }}
                        variant="default"
                    >
                        <Tab.Item
                            title="Pending"
                            titleStyle={{ fontSize: 12 }}

                        >
                            <Icon name="pending" color="" />
                        </Tab.Item>
                        <Tab.Item
                            title="Complete"
                            titleStyle={{ fontSize: 12 }}

                        >
                            <Icon name="done" color="" />
                        </Tab.Item>

                    </Tab>

                        <TabView value={index} onChange={setIndex} animationType="timing" >
                            <TabView.Item style={{ backgroundColor: '#685F76', width: '100%' }}>

                                <ScrollView style={styles.scrollView}>
                                    <View >
                                        {/* <Text style={styles.subHeader}>Pending Task</Text> */}
                                        {data.filter(f => f?.Complete == false).map((x) => {

                                            return (
                                                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', width: "auto", alignItems: "center", paddingVertical: 10, paddingHorizontal: 10, marginVertical: 0, borderColor: "pink", borderBottomWidth: 1, alignContent: "center" }} key={x.Id + 1}>
                                                    <View style={{ width: "75%" }}>
                                                        {DocId == x.Id ?

                                                            <TextInput style={styles.input} defaultValue={x.Task} key={x.Id + 2} onChangeText={setChnageTask} /> :
                                                            <View style={{ flexDirection: 'row', alignItems: "center" }}>

                                                                <Switch

                                                                    value={x?.Complete
                                                                        // checkbox == x.Id && check1
                                                                    }
                                                                    onValueChange={(value) => { setCheck1(!check1); setcheckbox(x.Id); updateDoc(user.uid, ChnageTask, x, "CheckBox") }}
                                                                />
                                                                <Text style={styles.text} key={x.Id + 2}>{x.Task} </Text>

                                                            </View>
                                                        }
                                                    </View>
                                                    <View style={{ flexDirection: "row", justifyContent: 'flex-end', width: "25%" }} key={x.Id + 3}>
                                                        {DocId == x.Id ?
                                                            <FAB
                                                                onPress={() => { updateDoc(user.uid, ChnageTask, x, "Update"); setDocId(null) }}

                                                                icon={{ name: 'done', color: 'white' }}
                                                                color="#20c997"
                                                                size="small"
                                                                style={{ marginEnd: 5 }}
                                                            />
                                                            // <Icon  name="done" color="#20c997" onPress={() => { updateDoc(user.uid, ChnageTask, x, "Update"); setDocId(null) }} />
                                                            :
                                                            <FAB
                                                                onPress={() => { setDocId(x.Id); setChnageTask(x.Task) }}

                                                                icon={{ name: 'edit', color: 'white' }}
                                                                color="#20c997"
                                                                size="small"
                                                                style={{ marginEnd: 5 }}
                                                            />
                                                            // <Icon name="edit" color="#20c997" onPress={() => { setDocId(x.Id); setChnageTask(x.Task) }} />
                                                        }
                                                        <FAB
                                                            onPress={() => { deleteDoc(user.uid, x.Id) }}

                                                            icon={{ name: 'delete', color: 'white' }}
                                                            color="#20c997"
                                                            size="small"
                                                        />
                                                        {/* <Icon name="delete" color="#dc3545" onPress={() => { deleteDoc(user.uid, x.Id) }} /> */}
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>

                                </ScrollView>



                            </TabView.Item>
                            <TabView.Item style={{ backgroundColor: '#685F76', width: '100%' }}>

                                <ScrollView style={styles.scrollView}>
                                    <View >
                                        {/* <Text style={styles.subHeader}>Pending Task</Text> */}
                                        {data.filter(f => f?.Complete == true).map((x) => {

                                            return (
                                                <View style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', width: "auto", alignItems: "center", paddingVertical: 10, paddingHorizontal: 10, marginVertical: 0, borderColor: "pink", borderBottomWidth: 1, alignContent: "center" }} key={x.Id + 1}>
                                                    <View style={{ width: "75%" }}>
                                                        {DocId == x.Id ?

                                                            <TextInput style={styles.input} defaultValue={x.Task} key={x.Id + 2} onChangeText={setChnageTask} /> :
                                                            <View style={{ flexDirection: 'row', alignItems: "center" }}>

                                                                <Switch

                                                                    value={x?.Complete
                                                                        // checkbox == x.Id && check1
                                                                    }
                                                                    onValueChange={(value) => { setCheck1(!check1); setcheckbox(x.Id); updateDoc(user.uid, ChnageTask, x, "CheckBox") }}
                                                                />
                                                                <Text style={styles.text} key={x.Id + 2}>{x.Task} </Text>

                                                            </View>
                                                        }
                                                    </View>
                                                    <View style={{ flexDirection: "row", justifyContent: 'flex-end', width: "25%" }} key={x.Id + 3}>
                                                        {DocId == x.Id ?
                                                            <FAB
                                                                onPress={() => { updateDoc(user.uid, ChnageTask, x, "Update"); setDocId(null) }}

                                                                icon={{ name: 'done', color: 'white' }}
                                                                color="#20c997"
                                                                size="small"
                                                                style={{ marginEnd: 5 }}
                                                            />
                                                            // <Icon  name="done" color="#20c997" onPress={() => { updateDoc(user.uid, ChnageTask, x, "Update"); setDocId(null) }} />
                                                            :
                                                            <FAB
                                                                onPress={() => { setDocId(x.Id); setChnageTask(x.Task) }}

                                                                icon={{ name: 'edit', color: 'white' }}
                                                                color="#20c997"
                                                                size="small"
                                                                style={{ marginEnd: 5 }}
                                                            />
                                                            // <Icon name="edit" color="#20c997" onPress={() => { setDocId(x.Id); setChnageTask(x.Task) }} />
                                                        }
                                                        <FAB
                                                            onPress={() => { deleteDoc(user.uid, x.Id) }}

                                                            icon={{ name: 'delete', color: 'white' }}
                                                            color="#20c997"
                                                            size="small"
                                                        />
                                                        {/* <Icon name="delete" color="#dc3545" onPress={() => { deleteDoc(user.uid, x.Id) }} /> */}
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>

                                </ScrollView>



                            </TabView.Item>

                        </TabView>
                    </>
                </View>
                {/* <SpeedDial
                    isOpen={open}
                    icon={{ name: 'add', color: '#fff' }}
                    openIcon={{ name: 'close', color: '#fff' }}
                    onOpen={() => setOpen(!open)}
                    onClose={() => setOpen(!open)}
                >
                    <SpeedDial.Action
                        icon={{ name: 'storage', color: '#fff' }}
                        title="Storage"
                        onPress={() => { navigation.navigate("Storage") }}
                    />

                </SpeedDial> */}

            </View>
        </>
    );


};


export default Task;
