import { createSlice } from '@reduxjs/toolkit';

const airplaneSlice = createSlice({
    name: 'airplane',
    initialState: {
        byId: {}
    },
    reducers: {
        added: (state, action) => {
            const { airplane } = action.payload;
            state.byId[airplane.airplaneId] = airplane;
        },
        removed: (state, action) => {
            delete state.byId[action.payload.airplaneId];
        },
        updated: (state, action) => {
            const { airplane } = action.payload.airplane;
            state.byId[airplane.airplaneId] = airplane;
        }
    }
});

export const { added, removed, updated } = airplaneSlice.actions;

export const { reducer } = airplaneSlice;
