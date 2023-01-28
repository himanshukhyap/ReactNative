import { SET_USER_LIST, SET_USER_DATA } from '../actions/user';

const initialState = {
    list: [],
    record: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_LIST:
            return {
                ...state,
                list: action.list,
                record: null
            }
        case SET_USER_DATA:
            return {
                ...state,
                record: action.record
            }
    }

    return state;
};