import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { baseApi } from './api/baseApi';
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'auth',
//   storage,
// }

// const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  // middleware: getDefaultMiddlewares => getDefaultMiddlewares({
  //   serializableCheck: {
  //     ignoredActions: [FLUSH,
  //       REHYDRATE,
  //       PAUSE,
  //       PERSIST,
  //       PURGE,
  //       REGISTER]
  //   }
  // }).concat(baseApi.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware), // Add the API middleware
  // devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in dev
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// export const persistor = persistStore(store);