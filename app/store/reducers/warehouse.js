import { SET_WAREHOUSE_LIST, SET_WAREHOUSE_DATA } from '../actions/warehouse';

const initialState = {
    list: [],
    record: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_WAREHOUSE_LIST:
            return {
                ...state,
                list: action.list,
                record: null
            }
        case SET_WAREHOUSE_DATA:
            return {
                ...state,
                record: action.record
            }
    }

    return state;
};