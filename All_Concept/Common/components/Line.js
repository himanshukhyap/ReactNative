import React from 'react'
import { View, StyleSheet } from 'react-native'

import Colors from '../constants/Colors'

const Line = props => {
    return (
        <View style={{...styles.line, ...props.style}}></View>
    );
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        backgroundColor: Colors.light_gray,
    }
})

export default Line;