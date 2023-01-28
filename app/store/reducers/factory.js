import { SET_FACTORY_LIST, SET_FACTORY_DATA } from '../actions/factory';

const initialState = {
    list: [],
    record: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_FACTORY_LIST:
            return {
                ...state,
                list: action.list,
                record: null
            }
        case SET_FACTORY_DATA:
            return {
                ...state,
                record: action.record
            }
    }

    return state;
};