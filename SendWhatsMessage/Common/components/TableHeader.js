import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import GS from '../common/GlobalStyles';

const TableHeader = props => {

    let colSizes = [];
    if (props.sizes != undefined) {
        colSizes = props.sizes;
    }


    const renderHeaders = () => {
        let arrCols = [];

        props.titles.map((item, index) => {
            arrCols.push(
                <View key={index} style={{
                    ...styles.header,
                    ...(index > 0 ? styles.leftLine : undefined),
                    ...styles[props.alignments.length > index ? props.alignments[index] : 'left'],
                    flex: colSizes.length > index ? colSizes[index] : 1
                }} >
                    <Text style={styles.headerText}>{item.replace('_', ' ')}</Text>
                </View>
            );
        });

        return arrCols;
    }

    return (
        <View style={{ ...styles.container, ...props.style }}>
            <View style={GS.row100}>

                {renderHeaders()}

                {
                    (props.hasOptions) &&
                    <View style={{ ...styles.header, ...styles.leftLine, flex: colSizes.length > 0 ? colSizes[colSizes.length - 1] : 1 }}>
                        <Text style={styles.headerText}>
                            {props.actionText == undefined ? "Actions" : props.actionText}
                        </Text>
                    </View>
                }

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
        paddingHorizontal: 5
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

export default TableHeader;