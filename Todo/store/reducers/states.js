import { SET_STATE_LIST } from '../actions/states';

const initialState = {
    list: []
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_STATE_LIST:
            return {
                list: action.list
            }
    }

    return state;
};