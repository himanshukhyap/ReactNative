import { getApiResponse } from '../core/apiCaller';

export const SET_STATE_LIST = 'SET_STATE_LIST';

export const getData = () => {

    return async (dispatch, getState) => {

        const data = new FormData();
        data.append('userid', 1);
        const response = await getApiResponse(data, 'states');

        const states = [];
        for (let i=0; i<response.data.states.length; i++) {
            states.push(response.data.states[i]);
        }

        dispatch({ type: SET_STATE_LIST, list: states });

		return response.data.states;
    };

};