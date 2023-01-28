import { getApiResponse } from '../core/apiCaller';

export const SET_USERDOCUMENT_DATA = 'SET_USERDOCUMENT_DATA';
export const SET_USERDOCUMENT_LIST = 'SET_USERDOCUMENT_LIST';

export const getData = (user_id) => {

    return async (dispatch, getState) => {

        const data = new FormData();
        data.append('user_id', user_id);
        const response = await getApiResponse(data, 'userdocuments');

        let dataList = [];
        let singleRecord = null;

        /*if (id > 0) {
            singleRecord = response.data.userdocuments;
            dispatch({ type: SET_USERDOCUMENT_DATA, record: singleRecord });
        } else {*/
            for (let i = 0; i < response.data.userdocuments.length; i++) {
                dataList.push(response.data.userdocuments[i]);
            }
            dispatch({ type: SET_USERDOCUMENT_LIST, list: dataList });
        //}

    };

};


export const postData = (formValues) => {
    return async () => {
        const data = new FormData();
        data.append('document_title', formValues['document_title']);
        data.append('user_id', formValues['user_id']);
        data.append('file_name', { uri: formValues['file_name'], name: 'Document.pdf', type: 'application/pdf' });
        await getApiResponse(data, 'userdocuments/submit');
    };
};

export const deleteData = (id) => {
    return async () => {
        const data = new FormData();
        data.append('id', id);
        await getApiResponse(data, 'userdocuments/remove');
    };
};