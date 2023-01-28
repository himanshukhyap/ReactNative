import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import GS from '../common/GlobalStyles';

const TableHeaderFix = props => {

    let colSizes = [];
    if (props.sizes != undefined) {
        colSizes = props.sizes;
    }

    const renderCells = () => {
        let cols = [];
        props.titles.map((item, index) => {
            cols.push(
                <View key={'header' + index} style={{                    
                    ...styles.header,
                    ...(index > 0 ? styles.leftLine : undefined),
                    ...styles[props.alignments.length > index ? props.alignments[index] : 'left'],
                    ...{width: colSizes.length > index ? 120 * colSizes[index] : 120}
                }}>
                    <Text style={styles.headerText}>{item}</Text>
                </View>
            );
        });

        return cols;
    }

    return (
        <View style={{ ...styles.container, ...props.style }}>
            <View style={GS.row100}>
                {renderCells()}
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        height: 35,
        marginHorizontal: 2,
        marginTop: 5,
    },
    header: {
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryDark,
        paddingHorizontal: 5,
    },
    left: {
        alignItems: 'flex-start',
    },
    right: {
        alignItems: 'flex-end',
    },
    center: {
        alignItems: 'center',
    },
    headerText: {
        color: Colors.white,
        textTransform: 'capitalize'
    },
    leftLine: {
        borderLeftColor: Colors.tableHeaderBorder,
        borderLeftWidth: 1
    }
});

export default TableHeaderFix;