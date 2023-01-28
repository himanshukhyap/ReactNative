import { SET_TRANSPORTER_LIST, SET_TRANSPORTER_DATA } from '../actions/transporter';

const initialState = {
    list: [],
    record: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_TRANSPORTER_LIST:
            return {
                ...state,
                list: action.list,
                record: null
            }
        case SET_TRANSPORTER_DATA:
            return {
                ...state,
                record: action.record
            }
    }

    return state;
};