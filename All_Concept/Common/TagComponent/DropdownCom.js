//React Native Picker
//https://aboutreact.com/react-native-picker/

//import React in our code
import React, { useState } from 'react';

//import all the components we are going to use
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import Colors from './Colors';
import { screen_width } from './DimensionCom';

const DropdownCom = (props) => {
    // console.log(props.items)
    const [choosenLabel, setChoosenLabel] = useState(props.items[0].label);
    const [choosenIndex, setChoosenIndex] = useState(0);
    // const items = [
    //     {label:"Himanshu",value:"Himanhus" },
    //     {label:"Nimesh",value:"Nimesh" },
    //     {label:"Manoj",value:"Manoj" },
    //     {label:"Shubha,m",value:"shubham" }
    //   ]
    return (

        <View >

            <Picker
                enabled={true}
                style={props.style}
                mode='dialog'
                selectedValue={choosenLabel}
                onValueChange={(itemValue, itemIndex) => {
                    setChoosenLabel(itemValue);
                    setChoosenIndex(itemIndex);
                }}>
                {props.items.map(x => {
                    // console.log(x)
                    return (
                        <Picker.Item
                            color={props.color}
                            enabled={props.enabled}
                            key={x.label}
                            label={x.label}
                            value={x.value}
                            style={{color:Colors.black}}
                        />
                    )
                })}

            </Picker>

            {/* <Text style={styles.text}>
                Selected Value: {choosenLabel}
            </Text> */}

            {/* <Text style={styles.text}>
                Selected Index: {choosenIndex}
            </Text> */}
        </View>

    );
};

const styles = StyleSheet.create({

    // text: {
    //     fontSize: 20,
    //     alignSelf: 'center',
    // },

});

export default DropdownCom;