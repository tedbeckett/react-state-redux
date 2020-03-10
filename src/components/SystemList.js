import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/ListItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import '../styles.css';

function SystemListComponent({ systems }) {
  return (
    <div className='systemList'>
      <h3>Systems</h3>
      <List className='systemList'>
        {systems.map(system => {
          const { name, status } = system;
          const text = name + (status === 'good' ? '' : ' - offline');
          return (
            <ListItem
              button
              key={system.systemId}
              className='systemContainer'
            >
              <ListItemText
                className='systemText'
                primary={text}
              />
            </ListItem>
          )})
        }
      </List>
    </div>
  )
};

function stateToProps(state) {
  const { airplanes, systems, ui: { selectedAirplaneId } } = state;
  const isSelected = selectedAirplaneId || selectedAirplaneId === 0
  const systemIds = isSelected ? airplanes.byId[selectedAirplaneId].systemIds : [];
  let airplaneSystems = [];
  systemIds.forEach(systemId => airplaneSystems.push(systems.byId[systemId]));
  return {
    systems: airplaneSystems
  }
}

export const SystemList = connect(stateToProps)(SystemListComponent);
