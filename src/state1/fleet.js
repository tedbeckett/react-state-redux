import { createAction } from '@reduxjs/toolkit';

/**
 * Action type naming convention is namespace/operation
 * 
 * Since we are using redux-tools which uses Immer by default,
 * the state arguments to the reducers are Immer proxies.
 * @see https://redux-toolkit.js.org/api/createReducer
 * 
 * With immer we can either mutate the state argument or return 
 * a new value but not both.
 * @see https://github.com/immerjs/immer
 * 
 */

export const fleetAdded = createAction('fleet/added');
export const fleetAddedReducer = (state, action) => {
    const { fleet } = action.payload;
    state.fleets.byId[fleet.fleetId] = fleet;
};

export const fleetRemoved = createAction('fleet/removed');
export const fleetRemovedReducer = (state, action) => {
    delete state.fleets.byId[action.payload.fleetId];
};

export const fleetUpdated = createAction('fleet/updated');
export const fleetUpdatedReducer = (state, action) => {
    const { fleet } = action.payload;
    state.fleets.byId[fleet.fleetId] = fleet;
}

export const fleetSelected = createAction('fleet/selected');
export const fleetSelectedReducer = (state, action) => {
    state.ui.selectedFleetId = action.payload.fleetId;
}

