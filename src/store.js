import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './state-using-slices/reducer';

export const store = configureStore({
    reducer
})

