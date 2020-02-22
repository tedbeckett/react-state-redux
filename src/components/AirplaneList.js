import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/ListItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../styles.css';

const AirplaneListComponent = ({ ships, selectedShipId, onShipSelected }) => (
  <div className='airplaneContainer'>
    <h3 className='shipTitle'>Ships</h3>
    <List className='airplaneList'>
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
  const { fleets, ships, selectedFleetId, selectedShipId } = state;
  const shipIds = selectedFleetId || selectedFleetId === 0 ? fleets.byId[selectedFleetId].shipIds : [];
  const fleetShips = shipIds.map(shipId => ships.byId[shipId]);
  return {
    ships: fleetShips,
    selectedShipId
  }
}

export const AirplaneList = connect(stateToProps)(AirplaneListComponent);
