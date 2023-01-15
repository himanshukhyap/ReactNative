import { SET_DASHBOARD_DATA } from '../actions/dashboard';

const initialState = {
    counters: null,
    notifications: []
};

export default (state = initialState, action) => {

    if (action.type == SET_DASHBOARD_DATA) {
        return {
            ...state,
            counters: action.counters,
            notifications: action.notifications
        }
    }

    return state;
};