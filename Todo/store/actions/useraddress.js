import { getApiResponse } from '../core/apiCaller';

export const SET_USERADDRESS_DATA = 'SET_USERADDRESS_DATA';
export const SET_USERADDRESS_LIST = 'SET_USERADDRESS_LIST';

export const getData = (id) => {

    return async (dispatch, getState) => {

        const data = new FormData();
        data.append('id', id);
        const response = await getApiResponse(data, 'useraddresses');
        
        let dataList = [];
        let singleRecord = null;

        if (id > 0) {
            singleRecord = response.data.useraddresses;
            dispatch({ type: SET_USERADDRESS_DATA, record: singleRecord });
        } else {
            for (let i = 0; i < response.data.useraddresses.length; i++) {
                dataList.push(response.data.useraddresses[i]);
            }
            dispatch({ type: SET_USERADDRESS_LIST, list: dataList });
        }

    };

};


export const postData = (formValues) => {
    return async () => {
        const data = new FormData();
        for (let fv in formValues) {
            data.append(fv.toString(), formValues[fv].toString());
        }
        await getApiResponse(data, 'useraddresses/submit');
    };
};

export const deleteData = (id) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        await getApiResponse(data, 'useraddresses/remove');
    };
};