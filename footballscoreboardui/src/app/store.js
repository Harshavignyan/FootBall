import { configureStore } from '@reduxjs/toolkit';
import operatorReducer from '../features/operator/operatorSlice';

export const store = configureStore({
  reducer: {
    scoreboard: operatorReducer,
  }
});


