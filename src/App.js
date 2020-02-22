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
        className='fleetContainer'
        onFleetSelected={handleFleetSelected} 
      />
      <AirplaneList
        className='airplaneList'
        onAirplaneSelected={handleAirplaneSelected}
      />
      <SystemList 
        className='systemList'
      />
      {/* <StrikeGroupAirplanes
        className='airplaneContainer'
        sgId={selectedSgId}
        onAirplaneSelected={setSelectedAirplaneId}
      />
      <AirplaneSystems
        className='systemContainer'
        airplaneId={selectedAirplaneId}
      /> */}
      <div className='mapContainer' />
    </div>
  )
};
