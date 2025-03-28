import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import meditationSlice from "./slices/meditationSlice";

const persistConfig = {
  key: "root",
  version: 2,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  meditation: meditationSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
