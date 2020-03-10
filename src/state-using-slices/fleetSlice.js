import { createSlice } from '@reduxjs/toolkit';

const fleetSlice = createSlice({
    name: 'fleet',
    initialState: {
        byId: {}
    },
    reducers: {
        added: (state, action) => {
            const { fleet } = action.payload;
            state.byId[fleet.fleetId] = fleet;
        },
        removed: (state, action) => {
            delete state.byId[action.payload.fleetId];
        },
        updated: (state, action) => {
            const { fleet } = action.payload;
            state.byId[fleet.fleetId] = fleet;
        }
    }
});

export const { added, removed, updated } = fleetSlice.actions;

export const { reducer } = fleetSlice;
