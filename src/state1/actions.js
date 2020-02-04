import { createAction } from '@reduxjs/toolkit';


export const fleetsInitialized = createAction('FLEETS_INITIALIZED');
export const fleetAdded = createAction('FLEET_ADDED');
export const fleetRemoved = createAction('FLEET_REMOVED');
export const fleetUpdated = createAction('FLEET_UPDATED');

export const shipsSet = createAction('SHIPS_INITIALIZED');
export const shipAdded = createAction('SHIP_ADDED');
export const shipRemoved = createAction('SHIP_REMOVED');
export const shipUpdated = createAction('SHIP_UPDATED');
