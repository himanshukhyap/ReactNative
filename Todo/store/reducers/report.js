import { SET_STATS_DATA, SET_STOCK_DATA, SET_VENDOR_DATA, SET_COLLECTION_DATA } from '../actions/report';

const initialState = {
    statsData: [],
    stockData: [],
    vendorData: [],
    collData: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_STATS_DATA:
            return {
                ...state,
                statsData: action.statsData
            };
        case SET_STOCK_DATA:
            return {
                ...state,
                stockData: action.stockData
            };
        case SET_VENDOR_DATA:
            return {
                ...state,
                vendorData: action.vendorData
            };
        case SET_COLLECTION_DATA:
            return {
                ...state,
                collData: action.collData
            };
    }
    return state;
};