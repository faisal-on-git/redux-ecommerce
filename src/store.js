// import { configureStore } from "@reduxjs/toolkit";
// import productsReducer from "./features/productSlice";
// import cartReducer from "./features/cartSlice";


import { createStore, applyMiddleware, compose } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";


// import productReducer from "./redux/reducers/productReducer";





// export const store =configureStore({
//     reducer: {
//         products: productsReducer,
//         cart: cartReducer,
//     },
// })


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cartReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Enhanced Redux DevTools setup
// const composeEnhancers =
//     typeof window === 'object' &&
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//             trace: true, // Adds stack trace to action logs
//             // traceLimit: 25 // Maximum stack trace frames to be stored
//         }) : compose;

const composeEnhancers =
  typeof window === 'object' &&
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true, // Adds stack trace to action logs
      })
    : compose;

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk)) // passed thunk as we are using thunk middleware for async actions
);

export const persistor = persistStore(store);

//  const store= createStore(

//     rootReducer,




// )
export default store;
