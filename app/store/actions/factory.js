import { getApiResponse } from '../core/apiCaller';

export const SET_FACTORY_DATA = 'SET_FACTORY_DATA';
export const SET_FACTORY_LIST = 'SET_FACTORY_LIST';

export const getData = (id) => {

    return async (dispatch, getState) => {

        const data = new FormData();
        data.append('id', id);
        const response = await getApiResponse(data, 'factories');

        let dataList = [];
        let singleRecord = null;

        if (id > 0) {
            singleRecord = response.data.factories;
            dispatch({ type: SET_FACTORY_DATA, record: singleRecord });
        } else {
            for (let i = 0; i < response.data.factories.length; i++) {
                dataList.push(response.data.factories[i]);
            }
            dispatch({ type: SET_FACTORY_LIST, list: dataList });
        }

    };

};


export const postData = (formValues) => {
    return async () => {
        const data = new FormData();
        for (let fv in formValues) {
            data.append(fv.toString(), formValues[fv].toString());
        }
        await getApiResponse(data, 'factories/submit');
    };
};

export const deleteData = (id) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        await getApiResponse(data, 'factories/remove');
    };
};