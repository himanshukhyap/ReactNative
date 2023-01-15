import { SET_OUTWARD_LIST, SET_OUTWARD_DATA } from '../actions/outwardtransaction';

const initialState = {
    list: [],
    record: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_OUTWARD_LIST:
            return {
                ...state,
                list: action.list,
                record: null
            }
        case SET_OUTWARD_DATA:
            return {
                ...state,
                record: action.record
            }
    }

    return state;
};