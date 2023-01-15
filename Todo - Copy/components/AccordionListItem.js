import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Button, } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import Collapsible from 'react-native-collapsible';

const AccordionListItem = props => {
    const [open, setOpen] = useState(props.isOpen != undefined ? props.isOpen : false);
    const animatedController = useRef(new Animated.Value(0)).current;

    const arrowAngle = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: props.isOpen ? [`${Math.PI}rad`, '0rad'] : ['0rad', `${Math.PI}rad`],
        //outputRange: [`${Math.PI}rad`, '0rad'],
    });

    const toggleListItem = () => {
        if (open) {
            Animated.timing(animatedController, {
                duration: 300,
                toValue: props.isOpen ? 1 : 0,
                useNativeDriver: true,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            }).start();
        } else {
            Animated.timing(animatedController, {
                duration: 300,
                toValue: props.isOpen ? 0 : 1,
                useNativeDriver: true,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            }).start();
        }
        setOpen(!open);
    };

    return (
        <View style={props.containerStyle}>
            <TouchableWithoutFeedback onPress={() => toggleListItem()}>
                <View style={{ ...styles.titleContainer, ...props.titleParentStyle }}>
                    <View style={{ flex: 1 }}>
                        <Text style={props.titleTextStyle}>{props.title}</Text>
                    </View>
                    <View style={{ width: 35, alignItems: 'center' }}>
                        <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
                            <MaterialIcons name="keyboard-arrow-down" size={20} color="black" />
                        </Animated.View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <Collapsible collapsed={!open}>
                <View>
                    {props.children}
                </View>
            </Collapsible>
        </View>
    );
};
export default AccordionListItem;

const styles = StyleSheet.create({
    bodyBackground: {
        /*backgroundColor: '#cccccc',*/
    },
    rotated: {
        transform: [{ rotate: '180deg' }]
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        /*borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#cccccc',*/
    },
});
