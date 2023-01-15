import { SET_OUTWARDDOCUMENT_LIST, SET_OUTWARDDOCUMENT_DATA } from '../actions/outwarddocument';

const initialState = {
    list: [],
    record: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_OUTWARDDOCUMENT_LIST:
            return {
                ...state,
                list: action.list,
                record: null
            }
        case SET_OUTWARDDOCUMENT_DATA:
            return {
                ...state,
                record: action.record
            }
    }

    return state;
};