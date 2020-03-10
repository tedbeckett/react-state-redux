import { combineReducers } from 'redux';
import { reducer as fleetReducer } from './fleetSlice';
import { reducer as airplaneReducer } from './airplaneSlice';
import { reducer as systemReducer } from './systemsSlice';
import { reducer as uiReducer } from './uiSlice';

const tmp = {
    test: 'hi',
    fleets: fleetReducer,
    airplanes: airplaneReducer,
    systems: systemReducer,
    ui: uiReducer
};
console.log('reducer: ' + JSON.stringify(tmp, null, 2));

export const reducer = combineReducers({
    fleets: fleetReducer,
    airplanes: airplaneReducer,
    systems: systemReducer,
    ui: uiReducer
});