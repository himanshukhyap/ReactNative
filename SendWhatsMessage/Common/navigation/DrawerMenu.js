import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Line from '../components/Line';
import Colors from '../constants/Colors';

const DrawerMenu = props => {

    if (props.Title == 'Cart') {
        return (
            <View></View>
        )
    }
    else {
        return (
            <View>
                <TouchableHighlight
                    underlayColor={Colors.menuHighlightBgColor}
                    activeOpacity={0.6}
                    style={styles.menuTouchable}
                    onPress={props.ClickHandler}
                >
                    <View style={styles.menuContainer}>
                        <Text style={{ ...(props.IsActive ? styles.activeMenuText : styles.menuText), ...props.style }}>
                            {props.Title}
                        </Text>
                        {props.HasArrow ?
                            <Ionicons name="ios-arrow-forward" style={styles.arrow} />
                            :
                            <Text> </Text>
                        }
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menuTouchable: {
        width: '100%',
        height: 50
    },
    menuContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuText: {
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
        paddingLeft: 17,
    },
    activeMenuText: {
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
        paddingLeft: 17,
        color: Colors.primary
    },
    arrow: {
        paddingRight: 20
    }
});

export default DrawerMenu;