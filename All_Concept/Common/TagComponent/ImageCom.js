import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const ImageUriCom = (props) => {

    return (
        <View>

            <Image
                source={{
                    uri: props.url
                }}
                style={props?.style}
            />

        </View>
    )
}


// <Image 
//     source={require('./your-img.png')}  
//     style={{width: 400, height: 400}} 
// />


const styles = StyleSheet.create({})

//React Native Image
//https://aboutreact.com/react-native-image/

// import Image from 'react-native-remote-svg';

// <Image
//   source={{ uri: 'https://example.com/my-pic.svg' }}
//   style={{ width: 200, height: 532 }}
// />;