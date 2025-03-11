import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

import { tokenReducer } from "@/store/token-slice";
import { coordsReducer } from "@/store/coords-slice";
import { vehicleReducer } from "@/store/vehicle-slice";

const rootReducer = combineReducers({
  token: tokenReducer,
  coords: coordsReducer,
  vehicle: vehicleReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
