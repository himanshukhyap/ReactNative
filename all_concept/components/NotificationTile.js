import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const NotificationTile = props => {
    return (
        <View style={{ ...styles.notification }}>
            <View style={{ ...styles.notificationTitle, ...(props.type == 1 ? styles.success : props.type == 2 ? styles.warning : props.type == 3 ? styles.error : styles.normal) }}>
                <Text style={styles.left}>{props.title}</Text>
                {
                    props.date != '' &&
                    <Text style={styles.right}>{props.date}</Text>
                }
            </View>
            <Text style={{
                ...styles.notificationContent, ...(props.type == 1 ? styles.successLight :
                    props.type == 2 ? styles.warningLight :
                        props.type == 3 ? styles.errorLight :
                            styles.normalLight)
            }}>
                {props.content.replace(/\\n/ig, "\n")}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    notification: {
        marginBottom: 15,
        borderRadius: 8,
        borderColor: Colors.black2,
        borderWidth: 1,
    },
    notificationTitle: {
        backgroundColor: Colors.warning,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        padding: 5,
        flexDirection: 'row'
    },
    notificationContent: {
        backgroundColor: Colors.warningLight,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        padding: 5
    },

    normal: {
        backgroundColor: Colors.info
    },
    success: {
        backgroundColor: Colors.success
    },
    warning: {
        backgroundColor: Colors.warning
    },
    error: {
        backgroundColor: Colors.danger
    },

    normalLight: {
        backgroundColor: Colors.infoLight
    },
    successLight: {
        backgroundColor: Colors.successLight
    },
    warningLight: {
        backgroundColor: Colors.warningLight
    },
    errorLight: {
        backgroundColor: Colors.dangerLight
    },

    left: {
        flex: 1,
        color: Colors.black,
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
    },
    right: {
        flex: 1,
        textAlign: 'right',
        color: Colors.black,
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
    }
});

export default NotificationTile;