import { getApiResponse } from '../core/apiCaller';

export const SET_STATS_DATA = 'SET_STATS_DATA';
export const SET_STOCK_DATA = 'SET_STOCK_DATA';
export const SET_VENDOR_DATA = 'SET_VENDOR_DATA';
export const SET_COLLECTION_DATA = 'SET_COLLECTION_DATA';

export const getReportData = (reportType, formValues) => {

    return async (dispatch, getState) => {

        const data = new FormData();
        for (let fv in formValues) {
            data.append(fv.toString(), formValues[fv].toString());
        }

        let apiName = '';

        if (reportType == 'stats') {
            if (formValues['stats_type'] == '1') {
                apiName = 'getCollectionStatsByStates';
            } else if (formValues['stats_type'] == '2') {
                apiName = 'getCollectionStatsByCities';
            } else if (formValues['stats_type'] == '3') {
                apiName = 'getCollectionStatsByVendors';
            }
        } else if (reportType == 'CollByVendor'){
            apiName = 'getCollectionByVendors';
        } else if (reportType == 'Stock') {
            apiName = 'getStockByVendorAndWarehouse';
        } else if(reportType == 'CollDetail'){
            apiName = 'getCollectionDetailReport';
        } else if(reportType == 'InactiveVendors') {
            apiName = 'getInactiveVendors';
        } else if(reportType == 'CollectionQuantity') {
			apiName = 'getCollectionQuantityReport';
		} else if(reportType == 'CollectionByCounters') {
			apiName = 'getCollectionByCounters';
		}

        const response = await getApiResponse(data, 'reports/' + apiName);

        if (reportType == 'stats') {
            dispatch({ type: SET_STATS_DATA, statsData: response.data.data });
        } else if (reportType == 'CollByVendor'){
            dispatch({ type: SET_VENDOR_DATA, vendorData: response.data.data });
        } else if (reportType == 'Stock') {
            dispatch({ type: SET_STOCK_DATA, stockData: response.data.data });
        } else if(reportType == 'CollDetail'){
            dispatch({ type: SET_COLLECTION_DATA, collData: response.data.data });
        } else {
            return response.data;
        }

    };

};
