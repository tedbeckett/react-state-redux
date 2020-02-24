import React from 'react';
import { store } from './state1/store';
import { fleetSelected } from './state1/fleet';
import { airplaneSelected } from './state1/airplane';
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
