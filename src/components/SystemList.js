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
    <div className='systemContainer'>
      <h3>Systems</h3>
      <List className='systemList'>
        {systems.map(system => (
          <ListItem
            button
            key={system.systemId}
          >
            <ListItemText
              primary={system.name}
            />
            <ListItemIcon>
              {
                system.status === 'ready' ? 
                  <ErrorIcon color='secondary'/> : 
                  <CheckOutlinedIcon style={{ color: 'green'}}/>
              }
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </div>
  )
};

function stateToProps(state) {
  const { airplanes, systems, selectedAirplaneId } = state;
  const systemIds = selectedAirplaneId || selectedAirplaneId === 0 ? airplanes.byId[selectedAirplaneId].systemIds : [];
  let airplaneSystems = [];
  systemIds.forEach(systemId => airplaneSystems.push(systems.byId[systemId]));
  return {
    systems: airplaneSystems
  }
}

export const SystemList = connect(stateToProps)(SystemListComponent);
