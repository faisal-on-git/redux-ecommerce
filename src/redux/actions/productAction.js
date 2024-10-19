import { apiInstance } from "../../utils/api"


export const setProducts = (products) => {
    // console.log("setProducts", products);
    return {
        type: "SET_PRODUCTS",
        payload: products,
    }
}

export const fetchProducts = () => {
    return async (dispatch) => {
        const path = process.env.REACT_APP_ENV === "development" ? "/localProduct" : "/products"
        const response = await apiInstance.get(path);
        const data = await response.data
        console.log("fetchProducts", data);
        dispatch({type: "FETCH_PRODUCTS", payload: data})
    }       
}

