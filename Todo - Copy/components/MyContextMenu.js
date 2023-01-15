import React from 'react';
import Menu, { MenuProvider, MenuTrigger, MenuOptions, MenuOption, renderers } from 'react-native-popup-menu';

import Colors from '../constants/Colors';

const { ContextMenu, SlideInMenu, Popover } = renderers;

const MyPopupMenu = props => {

    const renderMenus = menus => {
        let arrMenu = [];
        menus.map((item, i) => {
            arrMenu.push(
                <MenuOption text={item} customStyles={optionStyles} />
            )
        })
    }

    return (
        <MenuProvider style={styles.menuProvider}>
            <Menu renderer={ContextMenu} rendererProps={{ anchorStyle: styles.anchorStyle }}>
                <MenuTrigger text={props.title} customStyles={triggerStyles} />
                <MenuOptions customStyles={optionsStyles}>
                    { renderMenus(props.menus) }
                </MenuOptions>
            </Menu>
        </MenuProvider>
    );
};

const triggerStyles = {
    triggerText: {
      color: Colors.white,
    },
    triggerOuterWrapper: {
      /*backgroundColor: 'orange',
      padding: 15,*/
    },
    triggerWrapper: {
      backgroundColor: Colors.darkGreen,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
    },
    triggerTouchable: {
      underlayColor: 'darkblue',
      activeOpacity: 70,
      style : {
        flex: 1,
      },
    },
  };


const optionsStyles = {
    optionsContainer: {
        backgroundColor: Colors.lightGray,
        /*minWidth: 300,
        padding: 5,*/
    },
    optionsWrapper: {
        /*backgroundColor: 'purple',*/
    },
    optionWrapper: {
        /*backgroundColor: 'yellow',*/
        borderTopColor: Colors.gray,
        paddingVertical: 10,
        borderTopWidth: 1
        /*margin: 5,*/
    },
    optionTouchable: {
        /*underlayColor: Colors.darkGreen,
        activeOpacity: 70,*/
    },
    optionText: {
        color: Colors.black,
    },
};

const optionStyles = {
    optionTouchable: {
      underlayColor: 'red',
      activeOpacity: 40,
    },
    optionWrapper: {
      backgroundColor: 'pink',
      margin: 5,
    },
    optionText: {
      color: 'black',
    },
  };
  
const styles = StyleSheet.create({
    menuProvider: {
        flex: 1,
        margin: 30
    },
    menuButton:{
        alignItems: 'center',
        backgroundColor: Colors.darkGreen,
        color: Colors.white,
        padding: 10
    },
    anchorStyle: {
        backgroundColor: 'transparent',
    }
});

export default MyPopupMenu;