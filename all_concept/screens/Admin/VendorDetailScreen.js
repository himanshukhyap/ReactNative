import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import HeaderRight from '../../navigation/HeaderRight';
import Colors from '../../constants/Colors';
import DetailsViewer from '../../components/DetailsViewer';

import * as userAction from '../../store/actions/user';

const VendorDetailScreen = props => {

    const { params } = props.route;
    const [isLoading, setIsLoading] = useState(true);
    const [id, setId] = useState(0);
    const [logs, setLogs] = useState('');

	const[userData, setUserData] = useState();

    const dispatch = useDispatch();

    const fetchAllData = async (pkid) => {
        try {
            setIsLoading(true);
            const apiData = await dispatch(userAction.getUserDetails(pkid));
			setUserData(apiData);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
        }
    }

    useEffect(() => {

        props.navigation.setOptions({ title: 'Vendor Details' });

        if (params && params.id) {
            fetchAllData(params.id);
        } else {
            props.navigation.navigate('Vendors1', { token: 'refresh' });
        }
    }, [dispatch]);

	
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }


    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
                <DetailsViewer
                    data={userData}
                    captions="Firm Name,Contact Person,Mobile,Store Code,Created By,Logistic Manger,Designation,Email,Website,Firm Type,State,City,Address,Postal Code,GST No,Start Date,
							  Expiry Date,Oil Rate,Minimum Liftup Qty,Agreement Status,Active"
                    keys="firm_name,name,mobile,store_code,created_by_name,logistic_manager,designation,email,website,firm_type,state_name,city,address,postal_code,gst_no,start_date,
								expire_date,oil_rate,min_liftup_qty,agreement_status_name,is_active_name" />
            </View>
        </ScrollView>
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
        /*paddingLeft: 10,
        paddingRight: 10,*/
    },
    formHeader: {
        width: '100%',
        backgroundColor: Colors.warning,
        marginTop: 15,
        marginBottom: 5,
        paddingVertical: 5,
        alignItems: 'center'
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
    }
})


export default VendorDetailScreen;
