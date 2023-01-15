import { getApiResponse } from '../core/apiCaller';

export const SET_TRANSPORTER_DATA = 'SET_TRANSPORTER_DATA';
export const SET_TRANSPORTER_LIST = 'SET_TRANSPORTER_LIST';

export const getData = (id) => {

    return async (dispatch, getState) => {

        const data = new FormData();
        data.append('id', id);
        const response = await getApiResponse(data, 'transporters');

        let dataList = [];
        let singleRecord = null;

        if (id > 0) {
            singleRecord = response.data.transporters;
            dispatch({ type: SET_TRANSPORTER_DATA, record: singleRecord });
        } else {
            for (let i = 0; i < response.data.transporters.length; i++) {
                dataList.push(response.data.transporters[i]);
            }
            dispatch({ type: SET_TRANSPORTER_LIST, list: dataList });
        }

    };

};


export const postData = (formValues) => {
    return async () => {
        const data = new FormData();
        for (let fv in formValues) {
            data.append(fv.toString(), formValues[fv].toString());
        }
        await getApiResponse(data, 'transporters/submit');
    };
};

export const deleteData = (id) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        await getApiResponse(data, 'transporters/remove');
    };
};