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

export const shipAdded = createAction('ship/added');
export const shipAddedReducer = (state, action) => {
    const { ship } = action.payload;
    state.ships.byId[ship.shipId] = ship;
};

export const shipRemoved = createAction('ship/removed');
export const shipRemovedReducer = (state, action) => {
    delete state.ships.byId[action.payload.shipId];
};

export const shipUpdated = createAction('ship/updated');
export const shipUpdatedReducer = (state, action) => {
    const { ship } = action.payload.ship;
    state.ships.byId[ship.shipId] = ship;
};

export const shipSelected = createAction('ship/selected');
export const shipSelectedReducer = (state, action) => {
    state.selectedShipId = action.payload.shipId;
};
