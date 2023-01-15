import { getApiResponse } from '../core/apiCaller';

export const SET_OUTWARD_DATA = 'SET_OUTWARD_DATA';
export const SET_OUTWARD_LIST = 'SET_OUTWARD_LIST';

export const getData = (id, formValues = undefined) => {

    return async (dispatch, getState) => {

        const data = new FormData();
        if (formValues != undefined) {
            for (let fv in formValues) {
                data.append(fv.toString(), formValues[fv].toString());
            }
        }
        data.append('id', id);
        const response = await getApiResponse(data, 'outwardtransactions');

        let dataList = [];
        let singleRecord = null;

        if (id > 0) {
            singleRecord = response.data.outwardtransactions;
            dispatch({ type: SET_OUTWARD_DATA, record: singleRecord });
        } else {
            for (let i = 0; i < response.data.outwardtransactions.length; i++) {
                dataList.push(response.data.outwardtransactions[i]);
            }
            dispatch({ type: SET_OUTWARD_LIST, list: dataList });
        }

    };

};


export const postData = (formValues) => {

    return async () => {

        const data = new FormData();
        for (let fv in formValues) {
            data.append(fv.toString(), formValues[fv].toString());
        }

        const response = await getApiResponse(data, 'outwardtransactions/submit');

        if (response.status == 'Error') {
            throw new Error(response.message);
        }

    };

};

export const deleteData = (id) => {

    return async () => {

        const data = new FormData();
        data.append('id', id);

        const response = await getApiResponse(data, 'outwardtransactions/remove');

        if (response.status == 'Error') {
            throw new Error(response.message);
        }

    };

};