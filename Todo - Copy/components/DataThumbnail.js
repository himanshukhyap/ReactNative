import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';
import TileView from '../components/TileView';

const DataThumbnail = props => {
    return (
        <View style={styles.dataItem}>
            <TileView style={{ ...styles.thumbnail, ...props.style }}>
                <Text style={styles.thumbnailTitle}>
                    {props.title.replace('^', "\n")}
                </Text>
                {
                    props.value != "" &&
                    <Text style={styles.thumbnailData}>{props.value}
                        <Text style={styles.unit}>{props.unit}</Text>
                    </Text>
                }
                {
                    props.value == "" &&
                    <Text style={{...styles.thumbnailData, ...styles.date, ...styles.extraTop}}>
                        {props.unit}
                    </Text>
                }
            </TileView>
        </View>
    );
}

const styles = StyleSheet.create({
    dataItem: {
        flex: 1,
        height: 'auto',
    },
    thumbnail: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    thumbnailTitle: {
        color: Colors.black,
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
        fontSize: 16,
        height: 45,
    },
    thumbnailData: {
        color: Colors.black,
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
        fontSize: 24,
        width: '100%',
        textAlign: 'right',
        textAlignVertical: 'center',
    },
    extraTop: {
        paddingTop: 5
    },
    unit: {
        fontSize: 19,
    },
    date: {
        fontSize: 25,
    }
});

export default DataThumbnail;