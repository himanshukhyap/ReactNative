import { SET_USERADDRESS_LIST, SET_USERADDRESS_DATA } from '../actions/useraddress';

const initialState = {
    list: [],
    record: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_USERADDRESS_LIST:
            return {
                ...state,
                list: action.list,
                record: null
            }
        case SET_USERADDRESS_DATA:
            return {
                ...state,
                record: action.record
            }
    }

    return state;
};