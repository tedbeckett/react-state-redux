import { createSlice } from '@reduxjs/toolkit';

const systemSlice = createSlice({
    name: 'system',
    initialState: {
        byId: {}
    },
    reducers: {
        added: (state, action) => {
            const { system } = action.payload;
            state.byId[system.systemId] = system;
        },
        removed: (state, action) => {
            delete state.byId[action.payload.systemId];
        },
        updated: (state, action) => {
            const { system } = action.payload;
            state.byId[system.systemId] = system;
        }
    }
});

export const { added, removed, updated } = systemSlice.actions;

export const { reducer } = systemSlice;
