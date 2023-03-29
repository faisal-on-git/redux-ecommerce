const initialState = {
  products: [],
  totalCount: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;
      const existItem = state.products.find((x) => x.id === item.id);
      if (existItem) {
        return {
          ...state,
          products: state.products.map((x) =>
            x.id === existItem.id ? { ...x, quantity: x.quantity + 1 } : x
          ),
          totalCount: state.totalCount + 1,
        };
      } else {
        return {
          ...state,
          products: [...state.products, { ...item, quantity: 1 }],
          totalCount: state.totalCount + 1,
        };
      }

    case "REMOVE_FROM_CART":
      const itemId = action.payload.id;
      const itemToRemove = state.products.find((x) => x.id === itemId);
      if (itemToRemove.quantity === 1) {
        // If the item's quantity is 1, remove it from the cart
        return {
          ...state,
          totalCount: state.totalCount - 1,
          products: state.products.filter((x) => x.id !== itemId),
        };
      } else {
        // Otherwise, decrease the item's quantity by 1
        const updatedProducts = state.products.map((x) =>
          x.id === itemId ? { ...x, quantity: x.quantity - 1 } : x
        );
        return {
          ...state,
          totalCount: state.totalCount - 1,
          products: updatedProducts,
        };
      }

    default:
      return state;
  }
};
export default cartReducer;
