import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux"
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

import cartReducer from '../features/cart/cartSilce'
import cartModalReducer from '../features/cartModal/cartModalSlice'
import searchModalReducer from '../features/searchModal/searchModalSlice'

const reducers = combineReducers({
    cart: cartReducer,
    cartModal: cartModalReducer,
    searchModal: searchModalReducer,
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export default store;