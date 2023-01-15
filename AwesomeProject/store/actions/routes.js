import { getApiResponse } from '../core/apiCaller';

export const SET_USERDOCUMENT_DATA = 'SET_USERDOCUMENT_DATA';
export const SET_USERDOCUMENT_LIST = 'SET_USERDOCUMENT_LIST';

export const getAll = (storeCode = '') => {
    return async (dispatch, getState) => {
        const data = new FormData();
        data.append('store_code', storeCode);
        const response = await getApiResponse(data, 'routes/getAll');
		return response.data;
    };
};

export const getRecord = (pkId, userId) => {
    return async (dispatch, getState) => {
        const data = new FormData();
        data.append('id', pkId);
        data.append('userId', userId);
        const response = await getApiResponse(data, 'routes/getRecord');
		return response.data;
    };
};

export const updateRouteSequence = (seqInfo) => {
    return async (dispatch, getState) => {
        const data = new FormData();
        data.append('seqInfo', seqInfo);
        const response = await getApiResponse(data, 'routes/updateRouteSequence');
		return response.data;
    };
};


export const updateVendorsRoute = (routeId, vendorIds) => {
    return async () => {
        const data = new FormData();
        data.append('routeId', routeId);
        data.append('vendorIds', vendorIds);
        await getApiResponse(data, 'routes/updateVendorsRoute');
    };
};


export const postData = (formValues) => {
    return async () => {
        const data = new FormData();
        data.append('id', formValues['id']);
        data.append('name', formValues['name']);
        await getApiResponse(data, 'routes/submit');		
    };
};

export const deleteData = (id) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        const response = await getApiResponse(data, 'routes/remove');
		return response.data;
    };
};