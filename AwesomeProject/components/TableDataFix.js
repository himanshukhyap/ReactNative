import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Menu, { MenuTrigger, MenuOptions, MenuOption, renderers } from 'react-native-popup-menu';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ActionIcons, ActionIconColors } from '../constants/Enums';

import Colors from '../constants/Colors';
import * as GlobalFunctions from '../common/GlobalFunctions';

const { ContextMenu, SlideInMenu, Popover } = renderers;

const TableDataFix = props => {

    let colSizes = [];
    if (props.sizes != undefined) {
        colSizes = props.sizes;
    }

    const downloadClickHandler = (uri) => {
        if (uri == '') return;
        let sourceFolder = props.sourceFolder ? props.sourceFolder : 'gatepass';
        GlobalFunctions.openLiveFile(sourceFolder, uri);
    }

    const renderCells = () => {
        let colData = [];
        props.fields.map((item, index) => {
            colData.push(
                <View key={'data-' + index} style={{
                    ...styles.header,
                    ...(index > 0 ? styles.leftLine : undefined),
                    ...styles[props.alignments.length > index ? props.alignments[index] : 'left'],
                    ...{ width: colSizes.length > index ? 120 * colSizes[index] : 120 },
                    //flex: colSizes.length > index ? colSizes[index] : 1
                }}>
                    {
                        item == 'EDITRECORD' &&
                        <TouchableWithoutFeedback onPress={props.onEditPress}>
                            <MaterialIcons name={ActionIcons.Edit} color={ActionIconColors.Edit} size={24} style={{ padding: 5 }} />
                        </TouchableWithoutFeedback>
                    }
                    {
                        item == 'DELETERECORD' &&
                        <TouchableWithoutFeedback onPress={props.onDeletePress}>
                            <MaterialIcons name={ActionIcons.Delete} color={ActionIconColors.Delete} size={24} style={{ padding: 5 }} />
                        </TouchableWithoutFeedback>
                    }
                    {
                        item == 'VIEWRECORD' &&
                        <TouchableWithoutFeedback onPress={props.onViewPress}>
                            <MaterialIcons name={ActionIcons.View} color={ActionIconColors.View} size={24} style={{ padding: 5 }} />
                        </TouchableWithoutFeedback>
                    }
                    {/* {
                        item == 'gate_pass' &&
                        <TouchableWithoutFeedback onPress={() => { downloadClickHandler(props.data[item]) }}>
                            <Text style={styles.download}>
                                {props.data[item] != '' ? "View/Download" : ""}
                            </Text>
                        </TouchableWithoutFeedback>
                    } */}
                    {
                        item == 'gate_pass' &&
                        <TouchableWithoutFeedback disabled={props.data[item] == ''} onPress={props.onViewGatePass}>
                            <View>
                                {
                                    props.data[item] != '' ?
                                        <MaterialIcons name={ActionIcons.View} color={ActionIconColors.View} size={24} style={{ padding: 5 }} />
                                        :
                                        <Text style={{color: Colors.gray}}>NA</Text>
                                }
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    {
                        item != 'EDITRECORD' && item != 'DELETERECORD' && item != 'VIEWRECORD' && item != 'gate_pass' &&
                        <Text style={styles.dataText}>
                            {props.data[item]}
                        </Text>
                    }
                </View>
            )
        });

        return colData;
    }

    return (
        <View style={styles.container}>
            {renderCells()}
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 2,
        borderLeftColor: Colors.offWhite,
        borderLeftWidth: 1,
        borderRightColor: Colors.offWhite,
        borderRightWidth: 1
    },
    selected: {
        flexDirection: 'row',
        backgroundColor: 'red'
    },
    unselected: {
        flexDirection: 'row',
        backgroundColor: 'green',
    },
    header: {
        minHeight: 35,
        justifyContent: 'center',
        paddingHorizontal: 5,
        alignItems: 'center',
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
    dataText: {
        color: Colors.black1
    },
    leftLine: {
        borderLeftColor: Colors.offWhite,
        borderLeftWidth: 1
    },
    dotsContainer: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionIcon: {
        marginHorizontal: 10,
        backgroundColor: Colors.gray,
        padding: 3,
        borderRadius: 5
    },
    download: {
        fontSize: 15,
        color: Colors.primaryDark,
        lineHeight: 22
    },
});

export default TableDataFix;