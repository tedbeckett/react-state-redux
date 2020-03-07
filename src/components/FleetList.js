import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/ListItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../styles.css';

const FleetListComponent = ({ fleets, selectedFleetId, onFleetSelected }) => (
  <div className='fleetContainer'>
    <h3 className='fleetTitle'>Fleets</h3>
    <List className='fleetList'>
      {fleets.map(fleet => (
        <ListItem
          button
          selected={selectedFleetId === fleet.fleetId}
          onClick={e => onFleetSelected(fleet.fleetId)}
          key={fleet.fleetId}
        >
          <ListItemText primary={fleet.name} />
        </ListItem>
      ))}
    </List>
  </div>
);

function stateToProps (state) {
  const { ui: { selectedFleetId } } = state;
  const fleets = Object.values(state.fleets.byId);
  return {
    fleets,
    selectedFleetId
   };
}

export const FleetList = connect(stateToProps)(FleetListComponent);
