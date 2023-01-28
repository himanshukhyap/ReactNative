import Variables from '../../constants/Variables';

export const SET_VERSION_DATA = 'SET_VERSION_DATA';

export const getVersion = () => {

    return async (dispatch, getState) => {

        const baseUrl = Variables.IsLive ? Variables.LiveApiBaseUrl : Variables.LocalApiBaseUrl;
        const apiResponse = await fetch(
            baseUrl + 'api/version',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!apiResponse.ok) {
            throw new Error('Unable to connect to the server' + apiResponse.status);
        }

        const textResponse = await apiResponse.text();
        console.log(textResponse + '\n\n\n');

        const response = JSON.parse(textResponse);

        return response;

    };

};