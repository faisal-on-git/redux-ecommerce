import { setProducts } from "../actions/productAction";

const initialState = {
    products: [],
};

const productReducer = (state = initialState, action) => {
    // console.log("productReducer", action);
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                
                products: action.payload,
            };
            case 'FETCH_PRODUCTS':
                return {
                    products: action.payload,
                };
        default:
            return state;
    }
};
export default productReducer;
