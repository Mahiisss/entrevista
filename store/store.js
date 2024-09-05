import {configureStore} from "@reduxjs/toolkit";
import { persistStore,persistReducer } from "redux-persist";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key:"root",
    storage
}

const perUserReducer = persistReducer(persistConfig,userReducer);

const store = configureStore({
    reducer:{
        creds:perUserReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistedStore = persistStore(store);
export {persistedStore};
export default store;