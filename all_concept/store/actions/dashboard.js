import { getApiResponse } from '../core/apiCaller';

export const SET_DASHBOARD_DATA = 'SET_DASHBOARD_DATA';

export const getData = (user_id, user_type, vendor_id) => {

    return async (dispatch, getState) => {

        const data = new FormData();
        data.append('user_id', user_id);
        data.append('user_type', user_type);
        data.append('vendor_id', vendor_id);
        const response = await getApiResponse(data, 'dashboard');

        let counters = response.data.counters;
        let notifications = response.data.notifications;
        
        dispatch({ type: SET_DASHBOARD_DATA, counters: counters, notifications: notifications });

		return response.data;
    };

};
