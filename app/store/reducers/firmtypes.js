import { SET_FIRMTYPES_LIST, SET_FIRMTYPES_DATA } from '../actions/firmtypes';

const initialState = {
    list: [],
    record: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_FIRMTYPES_LIST:
            return {
                ...state,
                list: action.list,
                record: null
            }
        case SET_FIRMTYPES_DATA:
            return {
                ...state,
                record: action.record
            }
    }

    return state;
};