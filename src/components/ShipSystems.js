import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/ListItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import '../styles.css';

function SystemsComponent({ systems }) {
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
  const shipSystemIds = ships
    .filter(ship => ship.shipId === selectedShipId)
    .flatMap(ship => ship.systemIds);
  const shipSystems = systems.filter(system => shipSystemIds.includes(system.systemId));
  return {
    systems: shipSystems
  }
}

export const ShipSystems = connect(stateToProps)(SystemsComponent);
