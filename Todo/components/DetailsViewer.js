import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';
import GS from '../common/GlobalStyles';
import * as GlobalFunctions from '../common/GlobalFunctions';

const DetailsViewer = props => {

    const downloadClickHandler = (uri) => {
        let sourceFolder = props.sourceFolder ? props.sourceFolder : 'gatepass';
        GlobalFunctions.openLiveFile(sourceFolder, uri);
    }

    const renderDetails = () => {
        let detail = [];
        let i = 0;
        let arrCaptions = props.captions.replace(/\s{2,}/g, '').replace(/[\r\n]/g, '').split(',');
        let arrKeys = props.keys.replace(/\s{2,}/g, '').replace(/[\r\n]/g, '').split(',');
        let downloadables = props.downloadables ? props.downloadables : '';

        for (i = 0; i < arrCaptions.length; i++) {
            let caption = arrCaptions[i]
            let data = props.data[arrKeys[i]];

            if (props.hideEmpty && data == '') {
                continue;
            }
            if (props.hideNA && data == '-NA-') {
                continue;
            }

            detail.push(
                <View style={GS.row100} key={i}>
                    <View style={{ ...GS.f1, ...styles.gridCol, ...(i % 2 == 0 ? styles.odd : styles.even) }}>
                        <Text style={styles.label}>
                            {caption}
                        </Text>
                    </View>
                    <View style={{ ...GS.f1, ...styles.gridCol, ...styles.leftLine, ...(i % 2 == 0 ? styles.odd : styles.even) }}>
                        {
                            downloadables.indexOf(arrKeys[i], 0) > -1 && data != '' &&
                            <TouchableWithoutFeedback onPress={() => { downloadClickHandler(data) }}>
                                <Text style={styles.download}>
                                    View/Download
                                </Text>
                            </TouchableWithoutFeedback>
                        }
                        {
                            downloadables.indexOf(arrKeys[i], 0) == -1 &&
                            <Text style={styles.data}>
                                {data}
                            </Text>
                        }
                    </View>
                </View>
            );
        }

        return detail;
    }

    return (
        <View style={props.style}>
            {
                props.data &&
                renderDetails()
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
        fontSize: 15,
        color: Colors.black2
    },
    gridCol: {
        minHeight: 35,
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    leftLine: {
        borderLeftColor: Colors.offWhite,
        borderLeftWidth: 1
    },
    odd: {
        backgroundColor: Colors.white2,
        borderBottomColor: Colors.offWhite,
        borderBottomWidth: 1
    },
    even: {
        backgroundColor: Colors.white1,
        borderBottomColor: Colors.offWhite,
        borderBottomWidth: 1
    },
    data: {
        fontSize: 15,
        color: Colors.black2,
        lineHeight: 22
    },
    download: {
        fontSize: 15,
        color: Colors.primaryDark,
        lineHeight: 22
    }
});

export default DetailsViewer;