import { SET_USERDOCUMENT_LIST, SET_USERDOCUMENT_DATA } from '../actions/userdocument';

const initialState = {
    list: [],
    record: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_USERDOCUMENT_LIST:
            return {
                ...state,
                list: action.list,
                record: null
            }
        case SET_USERDOCUMENT_DATA:
            return {
                ...state,
                record: action.record
            }
    }

    return state;
};