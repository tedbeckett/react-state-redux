import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/ListItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../styles.css';

const ShipsComponent = ({ ships, selectedShipId, onShipSelected }) => (
  <div className='shipContainer'>
    <h3 className='shipTitle'>Ships</h3>
    <List className='shipList'>
      {ships.map(ship => (
        <ListItem
          button
          selected={ship.shipId === selectedShipId}
          onClick={e => onShipSelected(ship.shipId)}
          key={ship.shipId}
        >
          <ListItemText primary={ship.name} />
        </ListItem>
      ))}
    </List>
  </div>
);

function stateToProps(state) {
  const { fleets, ships, selectedFleetId } = state;
  const fleetShipIds = fleets
    .filter(fleet => fleet.fleetId === selectedFleetId)
    .flatMap(fleet => fleet.shipIds);
  const fleetShips = ships.filter(ship => fleetShipIds.includes(ship.shipId));
  return {
    ships: fleetShips,
    selectedShipId: state.selectedShipId
  }
}

export const FleetShips = connect(stateToProps)(ShipsComponent);

