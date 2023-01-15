import { SET_SIGNUP_LIST, SET_SIGNUP_DATA } from '../actions/signup';

const initialState = {
    list: [],
    record: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_SIGNUP_LIST:
            return {
                ...state,
                list: action.list,
                record: null
            }
        case SET_SIGNUP_DATA:
            return {
                ...state,
                record: action.record
            }
    }

    return state;
};