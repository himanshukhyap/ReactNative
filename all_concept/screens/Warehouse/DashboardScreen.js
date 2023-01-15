import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constants/Colors';
import NotificationTile from '../../components/NotificationTile';
import DataThumbnail from '../../components/DataThumbnail';

import * as dashboardAction from '../../store/actions/dashboard';

const DashboardScreen = props => {

    const [isLoading, setIsLoading] = useState(true);

    const loginData = useSelector(state => state.login);

    const counters = useSelector(state => state.dashboard.counters);

    const notifications = useSelector(state => state.dashboard.notifications);

    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                await dispatch(dashboardAction.getData(loginData.UserId, loginData.UserType, loginData.VendorId));
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                Alert.alert('An Error Occurred!', err.message, [{ text: 'Okay' }]);
            }
        }
        getData();
    }, [dispatch, props]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    const renderNotifications = () => {
        let lstNotifications = [];
        for (let i = 0; i < notifications.length; i++) {
            lstNotifications.push(
                <NotificationTile
                    key={i.toString()}
                    type={notifications[i].type}
                    title={notifications[i].title}
                    date={notifications[i].added_date}
                    content={notifications[i].notification} />
            );
        }

        if (notifications.length == 0) {
            lstNotifications.push(
                <View
                    key="0">
                    <Text style={styles.zeroNotifications}>
                        No Notifications Available
                    </Text>
                </View>
            );
        }

        return lstNotifications;
    }

    return (
        <ScrollView stickyHeaderIndices={[2]}>

            <View style={styles.dataRow}>
                <DataThumbnail title="Today Picked Up Quantity" unit="kg" value={counters.TodayPickedQty} style={{ backgroundColor: Colors.thumbnailColor1 }} />
                <DataThumbnail title="This Month Picked Up Quantity" unit="kg" value={counters.MonthPickedQty} style={{ backgroundColor: Colors.thumbnailColor2 }} />
            </View>

            <View style={styles.dataRow}>
                <DataThumbnail title="Stock Available At Field" unit="kg" value={counters.FieldStock} style={{ backgroundColor: Colors.thumbnailColor3 }} />
                <DataThumbnail title="Stock Available In Warehouses" unit="kg" value={counters.WarehouseStock} style={{ backgroundColor: Colors.thumbnailColor4 }} />
            </View>

            <View style={styles.notificationHeader}>
                <View style={styles.headerChild}>
                    <Text style={styles.title}>Notifications</Text>
                </View>
            </View>

            <View style={styles.notificationArea}>
                {renderNotifications()}
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
    screen: {
        flex: 1,
        marginTop: 7
    },
    dataRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 80,
        marginTop: 7,
    },
    title: {
        fontWeight: 'bold',
        fontFamily: 'Roboto_bold',
        fontSize: 18,
        paddingVertical: 5,
        textAlign: 'center',
        borderBottomColor: Colors.black2,
        borderBottomWidth: 1,
        borderTopColor: Colors.black2,
        borderTopWidth: 1
    },
    notificationArea: {
        padding: 8
    },
    notificationHeader: {
        marginTop: 10,
        backgroundColor: Colors.white1,
        padding: 8
    },
    headerChild:{
        width: '100%',
        borderBottomColor: Colors.black2,
        borderBottomWidth: 1,
        borderTopColor: Colors.black2,
        borderTopWidth: 1,
    },
    zeroNotifications: {
        width: '100%',
        textAlign: 'center'
    }
});

export default DashboardScreen;
