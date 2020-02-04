import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { fleetAdded, fleetRemoved, fleetUpdated, fleetSelected } from './fleet';
import { fleetAddedReducer, fleetRemovedReducer, fleetUpdatedReducer, fleetSelectedReducer } from './fleet';
import { shipAdded, shipRemoved, shipUpdated, shipSelected } from './ship';
import { shipAddedReducer, shipRemovedReducer, shipUpdatedReducer, shipSelectedReducer } from './ship';
import { systemAdded, systemRemoved, systemUpdated, systemSelected } from './system';
import { systemAddedReducer, systemRemovedReducer, systemUpdatedReducer, systemSelectedReducer } from './system';


export const reducer = createReducer(initialState, {
    [fleetAdded]: fleetAddedReducer,
    [fleetRemoved]: fleetRemovedReducer,
    [fleetUpdated]: fleetUpdatedReducer,
    [fleetSelected]: fleetSelectedReducer,

    [shipAdded]: shipAddedReducer,
    [shipRemoved]: shipRemovedReducer,
    [shipUpdated]: shipUpdatedReducer,
    [shipSelected]: shipSelectedReducer,

    [systemAdded]: systemAddedReducer,
    [systemRemoved]: systemRemovedReducer,
    [systemUpdated]: systemUpdatedReducer,
    [systemSelected]: systemSelectedReducer
})

