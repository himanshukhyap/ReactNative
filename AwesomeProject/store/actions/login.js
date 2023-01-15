import AsyncStorage from '@react-native-async-storage/async-storage';

import Variables from '../../constants/Variables';

export const LOGIN = 'LOGIN';

export const login = (mobile, password) => {
    return async dispatch => {

        const pushToken = await AsyncStorage.getItem('pushToken');

        const data = new FormData();
        data.append('mobile', mobile);
        data.append('password', password);
        data.append('pushToken', pushToken);
        
        const baseUrl = Variables.IsLive ? Variables.LiveApiBaseUrl : Variables.LocalApiBaseUrl;
        const apiResponse = await fetch(
            baseUrl + 'api/login/validate',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: data
            }
        );

        if (!apiResponse.ok) {
            throw new Error('Unable to connect to the server' + apiResponse.status);
        }

        const textResponse = await apiResponse.text();
        console.log(textResponse + '\n\n\n');

        const jsonResponse = JSON.parse(textResponse);

        if (jsonResponse.status == 'Error') {
            throw new Error(jsonResponse.message);
        }

        dispatch({
            type: LOGIN,
            UserId: jsonResponse.data.user.id,
            UserType: jsonResponse.data.user.type,
            Name: jsonResponse.data.user.name,
            Email: jsonResponse.data.user.email,
            Mobile: jsonResponse.data.user.mobile,
            VendorId: jsonResponse.data.user.vendor_id,
            SeeSignups: jsonResponse.data.user.see_signups
        });
        
        await saveDataToSharedPreferences(jsonResponse.data.user, password);

		return jsonResponse.data.user;
    }
};

export const forgotPassword = mobile => {
    return async dispatch => {
        const data = new FormData();
        data.append('mobile', mobile);

        const apiResponse = await fetch(
            Variables.IsLive ? Variables.LiveApiBaseUrl : Variables.LocalApiBaseUrl + 'api/login/forgot',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: data
            }
        );

        const repsonse = await apiResponse.text();
        console.log(repsonse);
    }
}

const saveDataToSharedPreferences = (user, password) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        userId: user.id,
        userType: user.type,
        name: user.name,
        mobile: user.mobile,
        password: password,
        vendorId: user.vendor_id,
        seeSignups: user.see_signups
    }));
};