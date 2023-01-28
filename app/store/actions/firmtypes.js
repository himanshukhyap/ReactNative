import { getApiResponse } from '../core/apiCaller';

export const SET_FIRMTYPES_DATA = 'SET_FIRMTYPES_DATA';
export const SET_FIRMTYPES_LIST = 'SET_FIRMTYPES_LIST';

export const getData = (id) => {

    return async (dispatch, getState) => {

        const data = new FormData();
        data.append('id', id);
        const response = await getApiResponse(data, 'firmtypes');

        let dataList = [];
        let singleRecord = null;

        if (id > 0) {
            singleRecord = response.data.firmtypes;
            dispatch({ type: SET_FIRMTYPES_DATA, record: singleRecord });
        } else {
            for (let i = 0; i < response.data.firmtypes.length; i++) {
                dataList.push(response.data.firmtypes[i]);
            }
            dispatch({ type: SET_FIRMTYPES_LIST, list: dataList });
        }

    };

};


export const postData = (formValues) => {
    return async () => {
        const data = new FormData();
        for (let fv in formValues) {
            data.append(fv.toString(), formValues[fv].toString());
        }
        await getApiResponse(data, 'firmtypes/submit');
    };
};

export const deleteData = (id) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        await getApiResponse(data, 'firmtypes/remove');
    };
};