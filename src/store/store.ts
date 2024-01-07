import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import {
    attributeSlice,
    authSlice,
    cartsSlice,
    categorySlice,
    orderSlice,
    productSlice,
    notificationSlice,
    profileSlice,
    productSlice2,
} from './slices';

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [productSlice.name]: productSlice.reducer,
    [cartsSlice.name]: cartsSlice.reducer,
    [attributeSlice.name]: attributeSlice.reducer,
    [categorySlice.name]: categorySlice.reducer,
    [orderSlice.name]: orderSlice.reducer,
    [notificationSlice.name]: notificationSlice.reducer,
    [profileSlice.name]: profileSlice.reducer,
    [productSlice2.name]: productSlice2.reducer,
});

const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
    key: 'root',
    storage,
    blacklist: [
        authSlice.name,
        attributeSlice.name,
        cartsSlice.name,
        categorySlice.name,
        profileSlice.name,
        productSlice.name,
        productSlice2.name,
        orderSlice.name,
        notificationSlice.name,
    ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
