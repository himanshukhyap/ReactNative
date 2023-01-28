import { getApiResponse } from '../core/apiCaller';

export const SET_WAREHOUSE_DATA = 'SET_WAREHOUSE_DATA';
export const SET_WAREHOUSE_LIST = 'SET_WAREHOUSE_LIST';

export const getData = (id, manager_id = 0) => {

    return async (dispatch, getState) => {

        const data = new FormData();
        data.append('id', id);
        data.append('manager_id', manager_id);
        const response = await getApiResponse(data, 'warehouses');

        let dataList = [];
        let singleRecord = null;

        if (response.data) {
            if (id > 0) {
                singleRecord = response.data.warehouses;
                dispatch({ type: SET_WAREHOUSE_DATA, record: singleRecord });
            } else {
                for (let i = 0; i < response.data.warehouses.length; i++) {
                    dataList.push(response.data.warehouses[i]);
                }
                dispatch({ type: SET_WAREHOUSE_LIST, list: dataList });
            }
        }

    };

};


export const postData = (formValues) => {
    return async () => {
        const data = new FormData();
        for (let fv in formValues) {
            data.append(fv.toString(), formValues[fv].toString());
        }
        await getApiResponse(data, 'warehouses/submit');
    };

};

export const deleteData = (id) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        await getApiResponse(data, 'warehouses/remove');
    };
};