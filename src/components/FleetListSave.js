import React from 'react';
import { connect } from 'react-redux';

const FleetListComponent = ({ fleets }) => (
    <ul>
        {fleets.map(fleet => (
            <li key={fleet.fleetId}>{fleet.name}</li>
        ))}
    </ul>
);

function selectProps(state) {
    return { fleets: state.fleets };
}

export const FleetList = connect(selectProps)(FleetListComponent);
