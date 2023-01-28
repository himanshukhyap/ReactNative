import React, { useState, useEffect } from 'react';
import { View, Text, useWindowDimensions, ActivityIndicator, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import HTML from "react-native-render-html";

import Colors from '../../constants/Colors';
import SubmitButton from '../../components/form/SubmitButton';

import * as userAction from '../../store/actions/user';

const AgreementScreen = props => {

    const [isLoading, setIsLoading] = useState(true);
    const [showButtonLoader, setShowButtonLoader] = useState(false);

    const contentWidth = useWindowDimensions().width;

    const loginData = useSelector(state => state.login);

    const [content, setContent] = useState('');
    const [status, setStatus] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const response = await dispatch(userAction.getAgreement(loginData.UserId, 0));
                setContent(response.data.content);
                setStatus(response.data.status);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
            }
        }
        getData();
    }, [dispatch, props]);

    const acceptClickHandler = () => {
        setTimeout(() => {
            acceptAgreement();
        }, 50);
    }

    const acceptAgreement = async () => {
        setShowButtonLoader(true);
        try {
            await dispatch(userAction.acceptAgreement(loginData.UserId));
            setShowButtonLoader(false);
            setStatus(1);
        } catch (err) {
            setShowButtonLoader(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    const emailClickHandler = () => {
        setTimeout(() => {
            getAgreementEmail();
        }, 50);
    }

    const getAgreementEmail = async () => {
        setShowButtonLoader(true);
        try {
            const response = await dispatch(userAction.getAgreement(loginData.UserId, 1));
            setShowButtonLoader(false);
            Alert.alert(response.status, response.message, [{ text: 'Okay' }]);
        } catch (err) {
            setShowButtonLoader(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {
                content == "" ?
                    <View style={{padding: 10}}>
                        <Text style={{color: Colors.danger, fontWeight: 'bold', fontFamily: 'Roboto_bold', lineHeight: 22}}>
                            Your agreement is not available for now, it will be available soon or contact support team for the same
                        </Text>
                    </View>
                    :
                    <>
                        <View style={{ flex: 1 }}>
                            <ScrollView style={{ flex: 1, paddingHorizontal: 5 }}>
                                {/* <Text>{content}</Text> */}
                                {/* <WebView source={{ html: content }} style={{flex: 1}} /> */}
                                <HTML source={{ html: content }} contentWidth={contentWidth} />
                            </ScrollView>
                        </View>
                        {
                            status == 0 ?
                                <View style={styles.formFooter}>
                                    <SubmitButton title="Accept" onPress={acceptClickHandler} IsLoading={showButtonLoader} />
                                </View>
                                :
                                <View style={styles.formFooter}>
                                    <SubmitButton title="Get on Email" onPress={emailClickHandler} IsLoading={showButtonLoader} />
                                </View>
                        }
                    </>
            }
        </View>

    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
    },
    screen: {
        flex: 1,
        marginTop: 7
    },
    formFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: 30,
        borderTopColor: Colors.gray,
        borderTopWidth: 0,
        marginVertical: 10
    }
});

export default AgreementScreen;
