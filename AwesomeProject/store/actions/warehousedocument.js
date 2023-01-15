import { getApiResponse } from '../core/apiCaller';

export const SET_WAREHOUSEDOCUMENT_DATA = 'SET_WAREHOUSEDOCUMENT_DATA';
export const SET_WAREHOUSEDOCUMENT_LIST = 'SET_WAREHOUSEDOCUMENT_LIST';

export const getData = (warehouse_id) => {

    return async (dispatch, getState) => {

        const data = new FormData();
        data.append('warehouse_id', warehouse_id);
        const response = await getApiResponse(data, 'warehousedocuments');

        let dataList = [];
        let singleRecord = null;

        /*if (id > 0) {
            singleRecord = response.data.warehousedocuments;
            dispatch({ type: SET_WAREHOUSEDOCUMENT_DATA, record: singleRecord });
        } else {*/
            for (let i = 0; i < response.data.warehousedocuments.length; i++) {
                dataList.push(response.data.warehousedocuments[i]);
            }
            dispatch({ type: SET_WAREHOUSEDOCUMENT_LIST, list: dataList });
        //}

    };

};


export const postData = (formValues) => {
    return async () => {
        const data = new FormData();
        data.append('document_title', formValues['document_title']);
        data.append('warehouse_id', formValues['warehouse_id']);
        data.append('file_name', { uri: formValues['file_name'], name: 'Document.pdf', type: 'application/pdf' });
        await getApiResponse(data, 'warehousedocuments/submit');
    };
};

export const deleteData = (id) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        await getApiResponse(data, 'warehousedocuments/remove');
    };
};