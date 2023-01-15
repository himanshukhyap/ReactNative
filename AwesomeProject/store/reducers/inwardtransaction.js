import { SET_INWARDTRANSACTION_LIST, SET_INWARDTRANSACTION_DATA } from '../actions/inwardtransaction';

const initialState = {
    list: [],
    record: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_INWARDTRANSACTION_LIST:
            return {
                ...state,
                list: action.list,
                record: null
            }
        case SET_INWARDTRANSACTION_DATA:
            return {
                ...state,
                record: action.record
            }
    }

    return state;
};