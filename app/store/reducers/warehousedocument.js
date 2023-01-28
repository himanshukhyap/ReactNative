import { SET_WAREHOUSEDOCUMENT_LIST, SET_WAREHOUSEDOCUMENT_DATA } from '../actions/warehousedocument';

const initialState = {
    list: [],
    record: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_WAREHOUSEDOCUMENT_LIST:
            return {
                ...state,
                list: action.list,
                record: null
            }
        case SET_WAREHOUSEDOCUMENT_DATA:
            return {
                ...state,
                record: action.record
            }
    }

    return state;
};