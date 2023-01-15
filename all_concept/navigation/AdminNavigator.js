import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import DefaultStackNavOptions from './DefaultStackNavOptions';
import DrawerContent from './DrawerContent';
import * as HeaderOptions from './HeaderOptions';

import DashboardScreen from '../screens/Admin/DashboardScreen';
import UsersScreen from '../screens/Admin/UsersScreen';
import UserEntryScreen from '../screens/Admin/UserEntryScreen';
import WarehousesScreen from '../screens/Admin/WarehousesScreen';
import WarehouseEntryScreen from '../screens/Admin/WarehouseEntryScreen';
import WarehouseDocumentsScreen from '../screens/Admin/WarehouseDocumentsScreen';
import CollectionStatsReport from '../screens/Admin/CollectionStatsReport';
import CollectionQuantityReport from '../screens/Admin/CollectionQuantityReport';
import CollectionByVendorsReport from '../screens/Admin/CollectionByVendorsReport';
import WarehouseTranstiStockReport from '../screens/Admin/WarehouseTranstiStockReport';
import CollectionDetailReport from '../screens/Admin/CollectionDetailReport';
import GatePassViewerScreen from '../screens/Admin/GatePassViewerScreen';
import CollectionRequestEntryScreen from '../screens/Admin/CollectionRequestEntryScreen';
import CollectionRequestsScreen from '../screens/Admin/CollectionRequestsScreen';
import OutwardsScreen from '../screens/Admin/OutwardsScreen';
import OutwardEntryScreen from '../screens/Admin/OutwardEntryScreen';
import OutwardDetailScreen from '../screens/Admin/OutwardDetailScreen';
import InwardsScreen from '../screens/Admin/InwardsScreen';
import InwardEntryScreen from '../screens/Admin/InwardEntryScreen';
import InwardDetailScreen from '../screens/Admin/InwardDetailScreen';
import LeadsScreen from '../screens/Admin/LeadsScreen';
import LeadsDetailScreen from '../screens/Admin/LeadsDetailScreen';
import LeadsEntryScreen from '../screens/Admin/LeadsEntryScreen';
import LeadsFollowupScreen from '../screens/Marketing/LeadsFollowupScreen';
import VendorsScreen from '../screens/Admin/VendorsScreen';
import VendorEntryScreen from '../screens/Marketing/VendorEntryScreen';
import VendorDetailScreen from '../screens/Admin/VendorDetailScreen';
import CountersScreen from '../screens/Admin/CountersScreen';
import InactiveVendorsReport from '../screens/Admin/InactiveVendorsReport';
import GenerateChallanScreen from '../screens/Admin/GenerateChallanScreen';
import PendingFollowupsScreen from '../screens/Marketing/PendingFollowupsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SeparatorScreen from '../screens/SeparatorScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DashboardStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="Dashboard1" component={DashboardScreen} options={{ title: 'Dashboard' }} />
        </Stack.Navigator>
    )
}

const UserStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="Users1" component={UsersScreen} options={(props) => HeaderOptions.RightAddIcon(props, 'Users')} />
            <Stack.Screen name="UserEntry" component={UserEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'User Entry')} />
        </Stack.Navigator>
    )
}

const FollowupStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="PendingFollowups1" component={PendingFollowupsScreen} options={{ title: 'Pending Followups' }} />
            <Stack.Screen name="LeadsFollowups" component={LeadsFollowupScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Leads Followups')} />
        </Stack.Navigator>
    )
}

const WarehouseStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="Warehouses1" component={WarehousesScreen} options={{ title: 'Warehouses' }} />
            <Stack.Screen name="WarehouseEntry" component={WarehouseEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Warehouse Entry')} />
            <Stack.Screen name="WarehouseDocuments" component={WarehouseDocumentsScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Warehouse Documents')} />
        </Stack.Navigator>
    )
}

const LeadsStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions} >
            <Stack.Screen name="Leads1" component={LeadsScreen} options={{ title: 'Leads' }} />
            <Stack.Screen name="LeadsEntry" component={LeadsEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Leads Entry')} />
            <Stack.Screen name="LeadsDetail" component={LeadsDetailScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Leads Detail')} />
            <Stack.Screen name="LeadsFollowups" component={LeadsFollowupScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Leads Followups')} />
        </Stack.Navigator>
    )
}

const VendorStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="Vendors1" component={VendorsScreen} options={{ title: 'Vendors' }} />
            <Stack.Screen name="VendorEntry" component={VendorEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Vendor Entry')} />
            <Stack.Screen name="VendorDetails" component={VendorDetailScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Vendor Details')} />
            <Stack.Screen name="Counters" component={CountersScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Counters')} />
        </Stack.Navigator>
    )
}

const CollectionStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="PendingCollections1" component={CollectionRequestsScreen} options={{ title: 'Pending Collections' }} />
        </Stack.Navigator>
    )
}

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="Profile1" component={ProfileScreen} options={{ title: 'Profile' }} />
        </Stack.Navigator>
    )
}

const CollectionStatsStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions} >
            <Stack.Screen name="CollectionStats1" component={CollectionStatsReport} options={{ title: 'Collection Statistics' }} />
        </Stack.Navigator>
    )
}

const CollectionQuantityStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions} >
            <Stack.Screen name="CollectionQuantity1" component={CollectionQuantityReport} options={{ title: 'Collection Quantity Report' }} />
        </Stack.Navigator>
    )
}

const ChallanStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions} >
            <Stack.Screen name="GenerateChallan1" component={GenerateChallanScreen} options={{ title: 'Generate Challan' }} />
        </Stack.Navigator>
    )
}

const InactiveVendorStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions} >
            <Stack.Screen name="InactiveVendors1" component={InactiveVendorsReport} options={{ title: 'Inactive Vendors' }} />
        </Stack.Navigator>
    )
}

const CollectionByVendorStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="CollectionByVendor1" component={CollectionByVendorsReport} options={{ title: 'Collection From Vendors' }} />
        </Stack.Navigator>
    )
}

const StockReportStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="StockReport1" component={WarehouseTranstiStockReport} options={{ title: 'Stock Report' }} />
        </Stack.Navigator>
    )
}

const CollectionDetailStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="CollectionDetail1" component={CollectionDetailReport} options={{ title: 'Collection Details' }} />
            <Stack.Screen name="CollectionEntry" component={CollectionRequestEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Collection Entry')} />
            <Stack.Screen name="GatePassViewer" component={GatePassViewerScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Gate Pass Viewer')} />
        </Stack.Navigator>
    )
}


const OutwardsStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="Outwards1" component={OutwardsScreen} options={{ title: 'Outward Transactions' }} />
            <Stack.Screen name="OutwardEntry" component={OutwardEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Outward Entry')} />
            <Stack.Screen name="OutwardDetails" component={OutwardDetailScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Outward Details')} />
        </Stack.Navigator>
    )
}


const InwardsStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={DefaultStackNavOptions}>
            <Stack.Screen name="Inwards1" component={InwardsScreen} options={{ title: 'Inward Transactions' }} />
            <Stack.Screen name="InwardEntry" component={InwardEntryScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Inward Entry')} />
            <Stack.Screen name="InwardDetail" component={InwardDetailScreen} options={(props) => HeaderOptions.LeftBackIcon(props, 'Inward Detail')} />
        </Stack.Navigator>
    )
}

const AdminDrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Dashboard"
            useLegacyImplementation={true}
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{ drawerItemStyle: { marginTop: 1, marginVertical: 0, paddingVertical: 0 } }} >

            <Drawer.Screen name="Dashboard" component={DashboardStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Dashboard')} />
            <Drawer.Screen name="Users" component={UserStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Users')} />
            <Drawer.Screen name="Warehouses" component={WarehouseStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Warehouses')} />
            <Drawer.Screen name="Leads" component={LeadsStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Leads')} />
            <Drawer.Screen name="PendingFollowups" component={FollowupStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Pending Followups')} />
            <Drawer.Screen name="Vendors" component={VendorStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Vendors')} />
            <Drawer.Screen name="PendingCollections" component={CollectionStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Pending Collections')} />
            <Drawer.Screen name="GenerateChallan" component={ChallanStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Generate Challan')} />
            <Drawer.Screen name="Profile" component={ProfileStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Profile')} />
            <Drawer.Screen name="Separator1" component={SeparatorScreen} options={HeaderOptions.DrawerOptions} />
            <Drawer.Screen name="CollectionStats" component={CollectionStatsStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Collection Statistics')} />
            <Drawer.Screen name="CollectionQuantity" component={CollectionQuantityStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Collection Quantity Report')} />
            <Drawer.Screen name="CollectionByVendor" component={CollectionByVendorStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Collection From Vendors')} />
            <Drawer.Screen name="StockReport" component={StockReportStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Stock Report')} />
            <Drawer.Screen name="CollectionDetail" component={CollectionDetailStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Collection Detail')} />
            <Drawer.Screen name="InactiveVendors" component={InactiveVendorStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Inactive Vendors')} />
            <Drawer.Screen name="Outwards" component={OutwardsStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Outwards')} />
            <Drawer.Screen name="Inwards" component={InwardsStackNavigator} options={(props) => HeaderOptions.DrawerOptions(props, 'Inwards')} />
            <Drawer.Screen name="Separator2" component={SeparatorScreen} options={HeaderOptions.DrawerOptions} />

        </Drawer.Navigator>
    )
}

export default AdminDrawerNavigator;