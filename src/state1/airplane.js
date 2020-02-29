import { createAction } from '@reduxjs/toolkit';

/**
 * Action type naming convention is namespace-operation
 * 
 * Since we are using redux-tools, the state arguments to the reducers
 * will be Immer proxies.
 * @see https://redux-toolkit.js.org/api/createReducer
 * 
 * Note with immer we either mutate the state argument or return a new value
 * but not both!
 * @see https://github.com/immerjs/immer
 */

export const airplaneAdded = createAction('airplane/added');
export const airplaneAddedReducer = (state, action) => {
    const { airplane } = action.payload;
    state.entities.airplanes.byId[airplane.airplaneId] = airplane;
};

export const airplaneRemoved = createAction('airplane/removed');
export const airplaneRemovedReducer = (state, action) => {
    delete state.entities.airplanes.byId[action.payload.airplaneId];
};

export const airplaneUpdated = createAction('airplane/updated');
export const airplaneUpdatedReducer = (state, action) => {
    const { airplane } = action.payload.airplane;
    state.entities.airplanes.byId[airplane.airplaneId] = airplane;
};

export const airplaneSelected = createAction('airplane/selected');
export const airplaneSelectedReducer = (state, action) => {
    state.ui.selectedAirplaneId = action.payload.airplaneId;
};
