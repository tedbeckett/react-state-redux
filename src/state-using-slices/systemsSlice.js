import { createSlice } from '@reduxjs/toolkit';

const systemSlice = createSlice({
    name: 'system',
    initialState: {
        byId: {}
    },
    reducers: {
        added: (state, action) => {
            console.log("add system: " + JSON.stringify(action.payload, null, 2));
            const { system } = action.payload;
            state.byId[system.systemId] = system;
        },
        removed: (state, action) => {
            delete state.byId[action.payload.systemId];
        },
        updated: (state, action) => {
            console.log("update system: " + JSON.stringify(action.payload, null, 2));
            const { system } = action.payload;
            state.byId[system.systemId] = system;
        }
    }
});

export const { added, removed, updated } = systemSlice.actions;

export const { reducer } = systemSlice;
