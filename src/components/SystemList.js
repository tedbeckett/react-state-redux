import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/ListItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
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
            secondary={
              <Typography
                style={{ color: system.status === 'ready' ? 'green' : 'red', fontWeight: 'strong' }}>
                {system.status}
              </Typography>}
          />
        </ListItem>
      ))}
    </List>
    </div>
  )
};

function stateToProps(state) {
  const { ships, systems, selectedShipId } = state;
  const systemIds = selectedShipId || selectedShipId === 0 ? ships.byId[selectedShipId].systemIds : [];
  let shipSystems = [];
  systemIds.forEach(systemId => shipSystems.push(systems.byId[systemId]));
  return {
    systems: shipSystems
  }
}

export const SystemList = connect(stateToProps)(SystemListComponent);
