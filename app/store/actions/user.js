import { getApiResponse } from '../core/apiCaller';

export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_LIST = 'SET_USER_LIST';

export const getData = (id = 0, type = 0, created_by = 0, get_self = 0) => {

    return async (dispatch, getState) => {

        const data = new FormData();
        data.append('id', id);
        data.append('type', type);
        data.append('created_by', created_by);
        data.append('get_self', get_self);
        const response = await getApiResponse(data, 'users');

        let dataList = [];
        let singleRecord = null;

        if (id > 0) {
            singleRecord = response.data.users;
            dispatch({ type: SET_USER_DATA, record: singleRecord });
        } else {
            for (let i = 0; i < response.data.users.length; i++) {
                dataList.push(response.data.users[i]);
            }
            dispatch({ type: SET_USER_LIST, list: dataList });
        }

    };

};



export const getCounters = (vendorid = 0) => {
    return async (dispatch, getState) => {

        const data = new FormData();
        data.append('vendorid', vendorid);
        const response = await getApiResponse(data, 'users/counters');

        let dataList = [];

        for (let i = 0; i < response.data.users.length; i++) {
            dataList.push(response.data.users[i]);
        }
        
        dispatch({ type: SET_USER_LIST, list: dataList });
    };
};


export const getByType = (type) => {
    return async (dispatch, getState) => {
        const data = new FormData();
        data.append('type', type);
        const response = await getApiResponse(data, 'users/getUsersByType');
		return response.data;
    };
};

export const getUserDetails = (id) => {
    return async (dispatch, getState) => {
        const data = new FormData();
        data.append('id', id);
        const response = await getApiResponse(data, 'users/getUserDetails');
		return response.data;
    };
};

export const getAgreement = (id, on_email) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        data.append('on_email', on_email);
        return await getApiResponse(data, 'users/getAgreement');
    };
};

export const acceptAgreement = (id) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        await getApiResponse(data, 'users/acceptAgreement');
    };
};

export const postData = (formValues) => {
    return async () => {
        const data = new FormData();
        for (let fv in formValues) {
            data.append(fv.toString(), formValues[fv].toString());
        }
        await getApiResponse(data, 'users/submit');
    };
};

export const deleteData = (id) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        await getApiResponse(data, 'users/remove');
    };
};

export const sendForgotPwdOTP = (mobile) => {
    return async () => {
        const data = new FormData();
        data.append('mobile', mobile);
        return await getApiResponse(data, 'passwordreset/sendForgotPwdOTP');
    };
};

export const updatePassword = (id, password) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        data.append('password', password);
        await getApiResponse(data, 'passwordreset/updatePassword');
    };
};

export const updateLocation = (user_id, latitude, longitude, accuracy, altitude, altitude_accuracy, heading, speed) => {
    return async (dispatch, getState) => {
        const data = new FormData();
        data.append('user_id', user_id);
        data.append('latitude', latitude);
        data.append('longitude', longitude);
        data.append('accuracy', accuracy);
        data.append('altitude', altitude);
        data.append('altitude_accuracy', altitude_accuracy);
        data.append('heading', heading);
        data.append('speed', speed);
        const response = await getApiResponse(data, 'userLocations/update');
        return response.data;
    }
};

export const submitAttendance = (attType) => {
    return async (dispatch, getState) => {
        const data = new FormData();
        data.append('attType', attType);
        const response = await getApiResponse(data, 'users/submitAttendance');
        return response.data;
    }
};

export const getAttendances = () => {
    return async () => {
        const data = new FormData();
        const response = await getApiResponse(data, 'users/getAttendances');
        return response.data;
    }
};

export const getVendorsByState = (state_id, route_pending) => {
    return async () => {
        const data = new FormData();
		data.append('state_id', state_id);
		data.append('route_pending', route_pending);
        const response = await getApiResponse(data, 'users/getVendorsByState');
        return response.data;
    }
};

export const getVendorsByRoute = (route_id) => {
    return async () => {
        const data = new FormData();
		data.append('route_id', route_id);
        const response = await getApiResponse(data, 'users/getVendorsByRoute');
        return response.data;
    }
};

export const updateRouteSequence = (vendorIds, routeId) => {
    return async (dispatch, getState) => {
        const data = new FormData();
        data.append('vendor_ids', vendorIds);
        data.append('route_id', routeId);
        const response = await getApiResponse(data, 'users/updateRouteSequence');
		return response.data;
    };
};

export const deleteRouteInfo = (id, routeId) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        data.append('route_id', routeId);
        const response = await getApiResponse(data, 'users/deleteRouteInfo');
		return response.data;
    };
};