import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationActions } from 'react-navigation';

import Variables from '../../constants/Variables';

export async function getApiResponse(formData, apiUrl) {

    //console.log((Variables.IsLive ? Variables.LiveApiBaseUrl : Variables.LocalApiBaseUrl) + apiUrl);
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
        const objData = JSON.parse(userData);
        const { mobile, password } = objData;

        formData.append('login_mobile', mobile);
        formData.append('login_password', password);
    }

    const baseUrl = Variables.IsLive ? Variables.LiveApiBaseUrl : Variables.LocalApiBaseUrl;

    console.log(baseUrl + 'api/' + apiUrl);

    const apiResponse = await fetch(
        baseUrl + 'api/' + apiUrl,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        }
    );

    if (!apiResponse.ok) {
        console.log(apiResponse);
        throw new Error('Unable to connect to the server' + apiResponse.status);
    }

    const textResponse = await apiResponse.text();

    let jsonResponse = '';
    try {
        jsonResponse = JSON.parse(textResponse);
    } catch (err) {
        console.log(textResponse + '\n\n\n');
        throw new Error(err.message);
    }

    if (jsonResponse.status == 'Error') {
        console.log(textResponse + '\n\n\n');
        throw new Error(jsonResponse.message);
    }

    return jsonResponse;
}