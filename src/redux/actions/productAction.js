import { apiService } from "../../utils/api";
import { ENDPOINTS } from "../../utils/urls";

// Action Types
export const PRODUCT_ACTIONS = {
    SET_PRODUCTS: "SET_PRODUCTS",
    FETCH_PRODUCTS: "FETCH_PRODUCTS",
    FETCH_PRODUCTS_LOADING: "FETCH_PRODUCTS_LOADING",
    FETCH_PRODUCTS_ERROR: "FETCH_PRODUCTS_ERROR"
};

// Action Creators
export const setProducts = (products) => ({
    type: PRODUCT_ACTIONS.SET_PRODUCTS,
    payload: products,
});

export const setProductsLoading = (isLoading) => ({
    type: PRODUCT_ACTIONS.FETCH_PRODUCTS_LOADING,
    payload: isLoading,
});

export const setProductsError = (error) => ({
    type: PRODUCT_ACTIONS.FETCH_PRODUCTS_ERROR,
    payload: error,
});

// Thunk Action Creator
export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            dispatch(setProductsLoading(true));
            const path = process.env.REACT_APP_ENV === "development"
                ? "/localProduct"
                : ENDPOINTS.PRODUCTS;

            const data = await apiService.get(path);
            dispatch({
                type: PRODUCT_ACTIONS.FETCH_PRODUCTS,
                payload: data
            });
        } catch (error) {
            dispatch(setProductsError(error.message || "Failed to fetch products"));
        } finally {
            dispatch(setProductsLoading(false));
        }
    };
};

// Fetch a single product by ID
export const fetchProductById = (id) => {
    return async (dispatch) => {
        try {
            dispatch(setProductsLoading(true));
            const data = await apiService.get(ENDPOINTS.PRODUCT_DETAILS(id));
            return data;
        } catch (error) {
            dispatch(setProductsError(error.message || "Failed to fetch product details"));
            throw error;
        } finally {
            dispatch(setProductsLoading(false));
        }
    };
};

