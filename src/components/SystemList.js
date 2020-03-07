import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/ListItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
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
  const systemIds = selectedAirplaneId || selectedAirplaneId === 0 ? airplanes.byId[selectedAirplaneId].systemIds : [];
  let airplaneSystems = [];
  systemIds.forEach(systemId => airplaneSystems.push(systems.byId[systemId]));
  return {
    systems: airplaneSystems
  }
}

export const SystemList = connect(stateToProps)(SystemListComponent);
