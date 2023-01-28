import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';
export default function DialogCom(props) {
  
    // const [
    //     defaultAnimationDialog, setDefaultAnimationDialog
    // ] = useState(true);
    // const [
    //     scaleAnimationDialog, setScaleAnimationDialog
    // ] = useState(false);
    // const [
    //     slideAnimationDialog, setSlideAnimationDialog
    // ] = useState(false);


    return (
        <Dialog
            onDismiss={() => {
                props.setDefaultAnimationDialog(false);
            }}
            width={0.9}
            visible={props.defaultAnimationDialog}
            rounded
            actionsBordered
            dialogTitle={
                <DialogTitle
                    title="Default Animation Dialog Simple"
                    style={{
                        backgroundColor: '#F7F7F8',
                    }}
                    hasTitleBar={false}
                    align="left"
                />
            }
            footer={
                <DialogFooter>
                    {/* <DialogButton
                        text="CANCEL"
                        bordered
                        onPress={() => {
                            props.setDefaultAnimationDialog(false);
                        }}
                        key="button-1"
                    /> */}
                    <DialogButton
                        text="OK"
                        bordered
                        
                        onPress={() => {
                            props.setDefaultAnimationDialog(false);
                        }}
                        key="button-2"
                    />
                </DialogFooter>
            }>
            <DialogContent
                style={{
                    backgroundColor: '#F7F7F8',
                }}>
                <Text>
                    Here is an example of default animation dialog
                </Text>
            </DialogContent>
        </Dialog>
    )
}

const styles = StyleSheet.create({})

