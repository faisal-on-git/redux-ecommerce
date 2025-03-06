// Action Types
export const CART_ACTIONS = {
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    CLEAR_CART: "CLEAR_CART",
    UPDATE_QUANTITY: "UPDATE_QUANTITY"
};

// Action Creators
export const addToCart = (product) => {
    return {
        type: CART_ACTIONS.ADD_TO_CART,
        payload: product,
    };
};

export const removeFromCart = (product) => {
    return {
        type: CART_ACTIONS.REMOVE_FROM_CART,
        payload: product,
    };
};

export const clearCart = () => {
    return {
        type: CART_ACTIONS.CLEAR_CART
    };
};

export const updateQuantity = (productId, quantity) => {
    return {
        type: CART_ACTIONS.UPDATE_QUANTITY,
        payload: { productId, quantity }
    };
};