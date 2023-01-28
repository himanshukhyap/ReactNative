import { getApiResponse } from '../core/apiCaller';

export const SET_OUTWARDDOCUMENT_DATA = 'SET_OUTWARDDOCUMENT_DATA';
export const SET_OUTWARDDOCUMENT_LIST = 'SET_OUTWARDDOCUMENT_LIST';

export const getData = (outward_id) => {

    return async (dispatch, getState) => {

        const data = new FormData();
        data.append('outward_id', outward_id);
        const response = await getApiResponse(data, 'outwarddocuments');

        let dataList = [];
        let singleRecord = null;

        /*if (id > 0) {
            singleRecord = response.data.outwarddocuments;
            dispatch({ type: SET_OUTWARDDOCUMENT_DATA, record: singleRecord });
        } else {*/
            for (let i = 0; i < response.data.outwarddocuments.length; i++) {
                dataList.push(response.data.outwarddocuments[i]);
            }
            dispatch({ type: SET_OUTWARDDOCUMENT_LIST, list: dataList });
        //}

    };

};


export const postData = (formValues) => {
    return async () => {
        let fileExtn = formValues['file_name'].split('.').pop();
        const data = new FormData();
        data.append('document_title', formValues['document_title']);
        data.append('outward_id', formValues['outward_id']);
        data.append('file_name', { uri: formValues['file_name'], name: 'Image.' + fileExtn, type: 'image/*' });
        await getApiResponse(data, 'outwarddocuments/submit');
    };
};

export const deleteData = (id) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        await getApiResponse(data, 'outwarddocuments/remove');
    };
};