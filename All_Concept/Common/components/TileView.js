import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const TileView = props => {
    return (
        <View style={{...styles.container, ...props.style}}>{props.children}</View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        alignItems: "center",
        borderRadius: 5,
    }
})

export default TileView;