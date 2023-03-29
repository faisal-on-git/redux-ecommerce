// import { configureStore } from "@reduxjs/toolkit";
// import productsReducer from "./features/productSlice";
// import cartReducer from "./features/cartSlice";


import { createStore,applyMiddleware,compose } from "redux";
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
    // blacklist: ['cartReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store= createStore(
    // rootReducer,
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
)
export const persistor = persistStore(store)

//  const store= createStore(
   
//     rootReducer,


   
    
// )
export default store;
