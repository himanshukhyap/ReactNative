import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import AccordionListItem from './AccordionListItem';

import Colors from '../constants/Colors';

const MyAccordion = props => {
    return (
        <AccordionListItem title={props.title} isOpen={props.isOpen}
            containerStyle={{ ...styles.containerStyle, ...props.containerStyle }}
            titleParentStyle={{ ...styles.titleParentStyle, ...props.titleParentStyle }}
            titleTextStyle={{ ...styles.titleTextStyle, ...props.titleTextStyle }}
        >
            {props.children}
        </AccordionListItem>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: Colors.lighterGray,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray
    },
    titleParentStyle: {
        backgroundColor: Colors.gray
    },
    titleTextStyle: {
        //fontWeight: 'bold',
        lineHeight: 20
    },
});

export default MyAccordion;