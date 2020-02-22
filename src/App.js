import React from 'react';
import { store } from './state1/store';
import { fleetSelected } from './state1/fleet';
import { shipSelected } from './state1/ship';
import { FleetList } from './components/FleetList';
import { AirplaneList } from './components/AirplaneList';
import { SystemList } from './components/SystemList';
import './styles.css';

export function App() {

  function handleFleetSelected(fleetId) {
    store.dispatch(fleetSelected({ fleetId }));
    store.dispatch(shipSelected({ shipId: null }));
  }

  function handleShipSelected(shipId) {
    store.dispatch(shipSelected({ shipId }));
  }

  return (
    <div className='mainContainer'>
      <FleetList
        className='fleetContainer'
        onFleetSelected={handleFleetSelected} 
      />
      <AirplaneList
        className='airplaneList'
        onShipSelected={handleShipSelected}
      />
      <SystemList 
        className='systemList'
      />
      {/* <StrikeGroupShips
        className='airplaneContainer'
        sgId={selectedSgId}
        onShipSelected={setSelectedShipId}
      />
      <ShipSystems
        className='systemContainer'
        shipId={selectedShipId}
      /> */}
      <div className='mapContainer' />
    </div>
  )
};
