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
    state.ships.push(action.payload.ship)
};

export const shipRemoved = createAction('ship/removed');
export const shipRemovedReducer = (state, action) => {
    return state.ships.filter(ship => ship.shipId !== action.payload.shipId);
};

export const shipUpdated = createAction('ship/updated');
export const shipUpdatedReducer = (state, action) => {
    state.ships.forEach(ship => {
        if (ship.shipId === action.payload.ship.shipId) {
            // Because the state parameter is an Immer proxy, we have to use 
            // Object.assign, which modifies its first parameter in place.
            // We can't use spread because it creates a new object and we can't
            // overwrite the proxy.
            Object.assign(ship, action.payload.ship);
        }
    })
};

export const shipSelected = createAction('ship/selected');
export const shipSelectedReducer = (state, action) => {
    state.selectedShipId = action.payload.shipId;
};
