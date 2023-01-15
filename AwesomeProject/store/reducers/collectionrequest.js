import { SET_COLLECTIONREQUEST_LIST, SET_COLLECTIONREQUEST_DATA } from '../actions/collectionrequest';

const initialState = {
    list: [],
    record: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_COLLECTIONREQUEST_LIST:
            return {
                ...state,
                list: action.list,
                record: null
            }
        case SET_COLLECTIONREQUEST_DATA:
            return {
                ...state,
                record: action.record
            }
    }

    return state;
};