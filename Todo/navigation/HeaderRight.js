import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors'
import HeaderButton from '../components/HeaderButton';

const HeaderRight = props => {

    let iconColor = "white";
    let showIcon = false;
	let iconComp = Ionicons;

    if(props.iconColor != undefined && props.iconColor != ""){
        iconColor = props.iconColor;
    }

    if(props.isIcon && props.iconName != undefined && props.iconName != ""){
        showIcon = true;
    }

	if(props.iconComp) {
		iconComp = props.iconComp;
	}

    return (
        <View style={{ flexDirection: 'row' }}>
            {
                showIcon ?
                    <HeaderButtons>
                        <Item IconComponent={iconComp} iconName={props.iconName} color={iconColor} iconSize={26}
                            onPress={props.onPress} />
                    </HeaderButtons> 
                    :
                    <HeaderButton onPress={props.onPress} title={props.title} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        width: 20,
        height: 20,
        right: 2,
        top: 2,
        zIndex: 1,
        backgroundColor: Colors.red
    },
    badgeText:{
        color: Colors.white
    }
});

export default HeaderRight;