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

export const systemAdded = createAction('system/added');
export const systemAddedReducer = (state, action) => {
    state.systems.push(action.payload.system)
};

export const systemRemoved = createAction('system/removed');
export const systemRemovedReducer = (state, action) => {
    return state.systems.filter(system => system.systemId !== action.payload.system.systemId);
};

export const systemUpdated = createAction('system/updated');
export const systemUpdatedReducer = (state, action) => {
    state.systems.forEach(system => {
        if (system.systemId === action.payload.system.systemId) {
            system = {
                ...system,
                ...action.payload.system
            }
        }
    })
}

export const systemSelected = createAction('system/selected');
export const systemSelectedReducer = (state, action) => {
    state.selectedSystemId = action.payload.systemId;
}

