import {GET_ALL_PRODUCT, GET_PRODUCT, CREATE_PRODUCT, PRODUCT_ERROR, UPDATE_PRODUCT, CLEAR_PRODUCT, DELETE_PRODUCT} from "../actions/types";

const initialState = {
    product: [],
    detailProduct: [],
    status: [],
    error: null,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCT:
            return {
                ...state,
                product: action.product,
                status: action.status,
            };
        case GET_PRODUCT:
            return {
                ...state,
                detailProduct: action.detailproduct,
            };
        case CREATE_PRODUCT:
            return {
                ...state,
                status: action.status,
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
                status: action.payload,
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                status: action.payload,
            };
        case CLEAR_PRODUCT:
            return {
                ...state,
                product: [],
                detailProduct: [],
                status: [],
                error: null,
            };
        case PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload,
                status: "FAIL",
            };
        default:
            return state;
    }
};

export default productReducer;
