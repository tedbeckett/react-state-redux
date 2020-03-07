import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/ListItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../styles.css';

const AirplaneListComponent = ({ airplanes, selectedAirplaneId, onAirplaneSelected }) => (
  <div className='airplaneContainer'>
    <h3 className='airplaneTitle'>Airplanes</h3>
    <List className='airplaneList'>
      {airplanes.map(airplane => (
        <ListItem
          button
          selected={airplane.airplaneId === selectedAirplaneId}
          onClick={e => onAirplaneSelected(airplane.airplaneId)}
          key={airplane.airplaneId}
        >
          <ListItemText primary={airplane.name} />
        </ListItem>
      ))}
    </List>
  </div>
);

function stateToProps(state) {
  const { fleets, airplanes, ui: { selectedFleetId, selectedAirplaneId } } = state;
  const airplaneIds = selectedFleetId || selectedFleetId === 0 ? fleets.byId[selectedFleetId].airplaneIds : [];
  const fleetAirplanes = airplaneIds.map(airplaneId => airplanes.byId[airplaneId]);
  return {
    airplanes: fleetAirplanes,
    selectedAirplaneId
  }
}

export const AirplaneList = connect(stateToProps)(AirplaneListComponent);
