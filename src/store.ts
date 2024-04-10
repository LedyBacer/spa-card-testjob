import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { filmsApi } from './services/films.ts';
import userActionsReducer from './services/userActionsSlice.ts';

export const store = configureStore({
  reducer: {
    [filmsApi.reducerPath]: filmsApi.reducer,
    userActions: userActionsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(filmsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
