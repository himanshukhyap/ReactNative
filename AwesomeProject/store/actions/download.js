import { getApiResponse } from '../core/apiCaller';

export const generateLeadsExcel = (entry_by = 0, firm_name = "", name = "", remarks = "", city = "") => {
    return async (dispatch, getState) => {
        const data = new FormData();
        data.append('entry_by', entry_by);
        data.append('firm_name', firm_name);
        data.append('name', name);
        data.append('remarks', remarks);
        data.append('city', city);
        const response = await getApiResponse(data, 'download/leads');
        return response.data;
    };
};

export const generateCollectionByVendorsExcel = (date_from = "", date_upto = "") => {
    return async (dispatch, getState) => {
        const data = new FormData();
        data.append('date_from', date_from);
        data.append('date_upto', date_upto);
        const response = await getApiResponse(data, 'download/collectionByVendors');
        return response.data;
    };
};

export const generatePendingCollectionsExcel = () => {
    return async (dispatch, getState) => {
        const data = new FormData();
        const response = await getApiResponse(data, 'download/pendingCollections');
        return response.data;
    };
};

export const generateInactiveVendorsExcel = (date_since, state_id) => {
    return async (dispatch, getState) => {
        const data = new FormData();
        data.append('date_since', date_since);
        data.append('state_id', state_id);
        const response = await getApiResponse(data, 'download/inactiveVendors');
        return response.data;
    };
};

