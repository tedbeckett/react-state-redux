import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {},
    reducers: {        
        fleetSelected: (state, action) => {
            state.selectedFleetId = action.payload.fleetId;
        },
        airplaneSelected: (state, action) => {
            state.selectedAirplaneId = action.payload.airplaneId;
        },
        systemSelected: (state, action) => {
            state.selectedSystemId = action.payload.systemId;
        }        
    }
});

export const { fleetSelected, airplaneSelected, systemSelected } = uiSlice.actions;

export const { reducer } = uiSlice;
