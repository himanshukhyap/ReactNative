import { getApiResponse } from '../core/apiCaller';

export const SET_INWARDTRANSACTION_DATA = 'SET_INWARDTRANSACTION_DATA';
export const SET_INWARDTRANSACTION_LIST = 'SET_INWARDTRANSACTION_LIST';

export const getData = (id, formValues = undefined) => {

    return async (dispatch, getState) => {

        const data = new FormData();
        if (formValues != undefined) {
            for (let fv in formValues) {
                data.append(fv.toString(), formValues[fv].toString());
            }
        }
        data.append('id', id);
        const response = await getApiResponse(data, 'inwardtransactions');

        let dataList = [];
        let singleRecord = null;

        if (id > 0) {
            singleRecord = response.data.inwardtransactions;
            dispatch({ type: SET_INWARDTRANSACTION_DATA, record: singleRecord });
        } else {
            for (let i = 0; i < response.data.inwardtransactions.length; i++) {
                dataList.push(response.data.inwardtransactions[i]);
            }
            dispatch({ type: SET_INWARDTRANSACTION_LIST, list: dataList });
        }

    };

};


export const postData = (formValues) => {

    return async () => {

        const data = new FormData();
        for (let fv in formValues) {
            data.append(fv.toString(), formValues[fv].toString());
        }

        const response = await getApiResponse(data, 'inwardtransactions/submit');

        if (response.status == 'Error') {
            throw new Error(response.message);
        }

    };

};

export const deleteData = (id) => {

    return async () => {

        const data = new FormData();
        data.append('id', id);

        const response = await getApiResponse(data, 'inwardtransactions/remove');

        if (response.status == 'Error') {
            throw new Error(response.message);
        }

    };

};