import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { Children, useState } from 'react'
import { Button, Input } from '@rneui/themed';

const PowerTransformer = () => {
    const [KVA, setKVA] = React.useState(0);
    const [HV, setHV] = React.useState(0);
    const [LV, setLV] = React.useState(0);
    const [temp, settemp] = useState(0)
    const [losses100percent, setlosses100percent] = useState(0)
    const [noload, setnoload] = useState(0)
    const [ABHV, setABHV] = useState(0)
    const [ABLV, setABLV] = useState(0)
    const [BCHV, setBCHV] = useState(0)
    const [BCLV, setBCLV] = useState(0)
    const [CAHV, setCAHV] = useState(0)
    const [CALV, setCALV] = useState(0)


    const hvcurrent = KVA * 1000 / (1.732 * HV)
    const lvcurrent = KVA * 1000 / (1.732 * LV)
    const AvgHV = (ABHV + BCHV + CAHV) / 3
    const AvgLV = (ABLV + BCLV + CALV) / 3
    const hvi2r = hvcurrent * hvcurrent * AvgHV  *1.50
    const lvi2r = lvcurrent * lvcurrent * AvgLV *1.50/1000
    const tempat75 = 310 / (235 + temp)
    const lossesat100percentatcurrenttemp = hvi2r + lvi2r
    const lossesat100percentageat75temp = lossesat100percentatcurrenttemp * tempat75
    const reversecalculation = (losses100percent - lossesat100percentatcurrenttemp) / tempat75

   


    return (
        <ScrollView style={{padding: 15,}}>
            <View style={{  width: "100%" }}>

                <View style={styles.parentdiv}>
                    <Text style={styles.text}>Rating (KVA)</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => { setKVA(parseFloat(value)) }}
                        placeholder="KVA Rating"
                        keyboardType='decimal-pad'
                    />
                </View>
                <View style={styles.parentdiv}>
                    <Text style={styles.text}>HV Side Voltage</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => { setHV(parseFloat(value)) }}
                        placeholder="33000"
                        keyboardType='decimal-pad'
                    />
                </View>
                <View style={styles.parentdiv}>
                    <Text style={styles.text}>LV Side Voltage</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => { setLV(parseFloat(value)) }}
                        placeholder="11000"
                        keyboardType='decimal-pad'
                    />
                </View>
                <View style={styles.parentdiv}>
                    <Text style={styles.text}>Temp (℃)</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => { settemp(parseFloat(value)) }}
                        placeholder="24.5"
                        keyboardType='decimal-pad'
                    />
                </View>
                <View style={styles.parentdiv}>
                    <Text style={styles.text}>100 % Losses</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => { setlosses100percent(parseFloat(value)) }}
                        placeholder="1532"
                        keyboardType='decimal-pad'
                    />
                </View>
                <View style={styles.parentdiv}>
                    <Text style={styles.text}>No Load Losses</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => { setnoload(parseFloat(value)) }}
                        placeholder="452"
                        keyboardType='decimal-pad'
                    />
                </View>
                <View style={{ borderWidth: 1, marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ borderWidth: 1, width: "33.33%", textAlign: 'center' }}>Side</Text>
                        <Text style={{ borderWidth: 1, width: "33.33%", textAlign: 'center' }}>HV Side</Text>
                        <Text style={{ borderWidth: 1, width: "33.33%", textAlign: 'center' }}>LV Side</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ borderWidth: 1, width: "33.33%", textAlign: 'center', textAlignVertical: 'center' }}>AB</Text>
                        <TextInput
                            style={styles.tablerow}
                            onChangeText={(value) => { setABHV(parseFloat(value)) }}
                           
                            keyboardType='decimal-pad'
                        />
                        <TextInput
                            style={styles.tablerow}
                            onChangeText={(value) => { setABLV(parseFloat(value)) }}
                            
                            keyboardType='decimal-pad'
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ borderWidth: 1, width: "33.33%", textAlign: 'center', textAlignVertical: 'center' }}>BC</Text>
                        <TextInput
                            style={styles.tablerow}
                            onChangeText={(value) => { setBCHV(parseFloat(value)) }}
                          
                            keyboardType='decimal-pad'
                        />
                        <TextInput
                            style={styles.tablerow}
                            onChangeText={(value) => { setBCLV(parseFloat(value)) }}
                         
                            keyboardType='decimal-pad'
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ borderWidth: 1, width: "33.33%", textAlign: 'center', textAlignVertical: 'center' }}>CA</Text>
                        <TextInput
                            style={styles.tablerow}
                            onChangeText={(value) => { setCAHV(parseFloat(value)) }}
                           
                            keyboardType='decimal-pad'
                        />
                        <TextInput
                            style={styles.tablerow}
                            onChangeText={(value) => { setCALV(parseFloat(value)) }}
                        
                            keyboardType='decimal-pad'
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ borderWidth: 1, width: "33.33%", textAlign: 'center', fontWeight: 'bold', textAlignVertical: 'center' }}>Average</Text>
                        <Text
                            style={styles.tablerow}
                        >
                            {AvgHV.toFixed(2)}
                        </Text>
                        <Text style={styles.tablerow}>
                            {AvgLV.toFixed(2)}
                        </Text>
                    </View>


                </View>
            </View>
            <Text style={{flexDirection:'row',alignSelf:'center',fontSize:30,color:"red"}}>Result</Text>
            <View style={{ padding: 15, width: "100%", borderTopWidth: 2,borderColor:"red" }}>
                <View style={styles.parentdiv}>
                    <Text style={styles.text}>100% losses at Temp(75%)</Text>
                    <Text
                        style={styles.input}   >
                        {reversecalculation + lossesat100percentageat75temp}
                    </Text>
                </View>
    
                <View style={styles.parentdiv}>
                    <Text style={styles.textresult}>50% losses at Temp(75%)</Text>
                    <Text
                        style={styles.inputresult}   >
                        {(reversecalculation + lossesat100percentageat75temp)/4+noload}
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default PowerTransformer

const styles = StyleSheet.create({

    input: {
        height: 40,
        margin: 12,
        width: "70%",

        borderBottomWidth: 1,
        padding: 10,
        textAlign: 'right'
    },
    inputresult: {
        height: 40,
        margin: 12,
        width: "70%",
color:"green",
        borderBottomWidth: 1,
        padding: 10,
        textAlign: 'right'
    },
    text: {
        width: "30%",

    },
    parentdiv: { flexDirection: 'row', alignItems: 'center' },
    tablerow: {
        borderWidth: 1, width: "33.33%", textAlign: 'center'
    },
    textresult: {
        width: "30%",
color:"green"
    },
})