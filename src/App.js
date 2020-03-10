import React from 'react';
import { store } from './store';
import { fleetSelected } from './state-using-slices/uiSlice';
import { airplaneSelected } from './state-using-slices/uiSlice';
import { FleetList } from './components/FleetList';
import { AirplaneList } from './components/AirplaneList';
import { SystemList } from './components/SystemList';
import './styles.css';

export function App() {

  function handleFleetSelected(fleetId) {
    store.dispatch(fleetSelected({ fleetId }));
    store.dispatch(airplaneSelected({ airplaneId: null }));
  }

  function handleAirplaneSelected(airplaneId) {
    store.dispatch(airplaneSelected({ airplaneId }));
  }

  return (
    <div className='mainContainer'>
      <FleetList
        onFleetSelected={handleFleetSelected} 
      />
      <AirplaneList
        onAirplaneSelected={handleAirplaneSelected}
      />
      <SystemList 
      />
      <div className='mapContainer' />
    </div>
  )
};
