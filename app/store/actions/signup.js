import { getApiResponse } from '../core/apiCaller';

export const SET_SIGNUP_DATA = 'SET_SIGNUP_DATA';
export const SET_SIGNUP_LIST = 'SET_SIGNUP_LIST';

export const getData = (id = 0, entry_by = 0, firm_name = "", name = "", remarks = "", city = "", category = 0) => {

    return async (dispatch, getState) => {

        const data = new FormData();
        data.append('id', id);
        data.append('entry_by', entry_by);
        data.append('firm_name', firm_name);
        data.append('name', name);
        data.append('remarks', remarks);
        data.append('city', city);
        data.append('category', category);
        const response = await getApiResponse(data, 'signups');

        if (id > 0) {
            dispatch({ type: SET_SIGNUP_DATA, record: response.data.signups });
        } else {
            dispatch({ type: SET_SIGNUP_LIST, list: response.data.signups });
        }

    };

};

export const postData = (formValues, noValidation = '1') => {
    return async () => {
        const data = new FormData();
        data.append('nv', noValidation);
        for (let fv in formValues) {
            data.append(fv.toString(), formValues[fv].toString());
        }
        const response = await getApiResponse(data, 'signups/submit');
        return response;
    };
};

export const convertToVendor = (formValues) => {
    return async () => {
        const data = new FormData();
        for (let fv in formValues) {
            data.append(fv.toString(), formValues[fv].toString());
        }
        const response = await getApiResponse(data, 'signups/convertToVendor');
        return response.message;
    };
};

export const sendOtp = (mobile) => {
    return async () => {
        const data = new FormData();
        data.append('mobile', mobile);
        data.append('nv', '1');
        const response = await getApiResponse(data, 'signups/sendOTP');
        return response.data;
    };
};

export const deleteData = (id) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        await getApiResponse(data, 'signups/remove');
    };
};

export const getPriceFactors = (id) => {
    return async () => {
        const data = new FormData();
        data.append('nv', '1');
        const response = await getApiResponse(data, 'signups/getPriceFactors');
        return response.data;
    };
};

export const sendPickupRequest = (id, city_id, quantity) => {
    return async () => {
        const data = new FormData();
        data.append('nv', '1');
        data.append('id', id);
        data.append('city_id', city_id);
        data.append('quantity', quantity);
        await getApiResponse(data, 'signups/sendPickupRequest');
    };
};

export const getFollowupDetails = (lead_id) => {
    return async () => {
        const data = new FormData();
        data.append('lead_id', lead_id);
        const response = await getApiResponse(data, 'signups/getFollowupDetails');
        return response.data;
    };
};

export const saveFollowupDetails = (formValues) => {
    return async () => {
        const data = new FormData();
        for (let fv in formValues) {
            data.append(fv.toString(), formValues[fv].toString());
        }
        const response = await getApiResponse(data, 'signups/saveFollowupDetails');
        return response.data;
    };
};

export const getPendingFollowups = (entry_by = 0) => {
    return async () => {
        const data = new FormData();
        data.append('entry_by', entry_by);
        const response = await getApiResponse(data, 'signups/getPendingFollowups');
        return response.data;
    };
};
