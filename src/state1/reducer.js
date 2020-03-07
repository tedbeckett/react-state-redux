import { createReducer } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { fleetAdded, fleetRemoved, fleetUpdated, fleetSelected } from './fleet';
import { fleetAddedReducer, fleetRemovedReducer, fleetUpdatedReducer, fleetSelectedReducer } from './fleet';
import { airplaneAdded, airplaneRemoved, airplaneUpdated, airplaneSelected } from './airplane';
import { airplaneAddedReducer, airplaneRemovedReducer, airplaneUpdatedReducer, airplaneSelectedReducer } from './airplane';
import { systemAdded, systemRemoved, systemUpdated, systemSelected } from './system';
import { systemAddedReducer, systemRemovedReducer, systemUpdatedReducer, systemSelectedReducer } from './system';


export const reducer = createReducer(initialState, {
    // Make use of ecma-2015 computed property names
    [fleetAdded]: fleetAddedReducer,
    [fleetRemoved]: fleetRemovedReducer,
    [fleetUpdated]: fleetUpdatedReducer,
    [fleetSelected]: fleetSelectedReducer,

    [airplaneAdded]: airplaneAddedReducer,
    [airplaneRemoved]: airplaneRemovedReducer,
    [airplaneUpdated]: airplaneUpdatedReducer,
    [airplaneSelected]: airplaneSelectedReducer,

    [systemAdded]: systemAddedReducer,
    [systemRemoved]: systemRemovedReducer,
    [systemUpdated]: systemUpdatedReducer,
    [systemSelected]: systemSelectedReducer
})

