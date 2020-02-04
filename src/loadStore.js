import { store } from './state1/store';
import { shipAdded } from './state1/ship';
import { fleetAdded } from './state1/fleet';
import { systemAdded } from './state1/system';

let nextSystemId = 1;
let nextShipId = 1;
let nextFleetId = 1;

function createSystems(n) {
    let systems = [];
    for (let i = 0; i < n; i++) {
        systems.push({
            systemId: nextSystemId,
            name: `name-${nextSystemId++}`,
            status: 'ready'
        });
    }
    return systems;
}

function createShip(systemIds) {
    return {
        shipId: nextShipId,
        name: `name-${nextShipId++}`,
        systemIds
    };
};

function createFleet(shipIds) {
    return {
        fleetId: nextFleetId,
        name: `name-${nextFleetId++}`,
        shipIds
    }
};

function dispatchSystems(systems) {
    systems.forEach(system => {
        store.dispatch(systemAdded(system));
    });
}

export function loadStore() {
    let ships = [];
    for (let i = 0; i < 9; i++) {
        const systems = createSystems(3);
        dispatchSystems(systems);
        const systemIds = systems.map(system => system.systemId);
        const ship = createShip(systemIds);
        store.dispatch(shipAdded(ship));
        ships.push(ship);
        if (ships.length % 3 === 0) {
            const shipIds = ships.map(ship => ship.shipId);
            const fleet = createFleet(shipIds);
            store.dispatch(fleetAdded(fleet));
            ships.length = 0;
        }
    };
};
