import { configureStore } from '@reduxjs/toolkit';
import operatorReducer from '../features/operator/operatorSlice';
import loginReducer from '../features/login/loginSlice';
import { authApi } from '../services/auth.service';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        scoreboard: operatorReducer,
        auth: loginReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);
