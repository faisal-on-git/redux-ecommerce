import { PRODUCT_ACTIONS } from "../actions/productAction";

const initialState = {
    products: [],
    loading: false,
    error: null
};

const productReducer = (state = initialState, action) => {
    // console.log("productReducer", action);
    switch (action.type) {
        case PRODUCT_ACTIONS.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                error: null
            };
        case PRODUCT_ACTIONS.FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                error: null
            };
        case PRODUCT_ACTIONS.FETCH_PRODUCTS_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case PRODUCT_ACTIONS.FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default productReducer;
