

export const setProducts = (products) => {
    // console.log("setProducts", products);
    return {
        type: "SET_PRODUCTS",
        payload: products,
    }
}

export const fetchProducts = () => {
    return async (dispatch) => {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        console.log("fetchProducts", data);
        dispatch({type: "FETCH_PRODUCTS", payload: data})
    }
}

