import { store } from './state1/store';
import { shipAdded, shipUpdated } from './state1/ship';
import { fleetAdded, fleetUpdated } from './state1/fleet';
import { systemAdded, systemUpdated } from './state1/system';

let nextSystemId = 1;
let nextShipId = 1;
let nextFleetId = 1;
let fleetMap = new Map();
let shipMap = new Map();
let systemMap = new Map();

function createSystems(n) {
    let systems = [];
    for (let i = 0; i < n; i++) {
        systems.push({
            systemId: nextSystemId,
            name: `system-${nextSystemId++}`,
            status: 'ready'
        });
    }
    systems.forEach(system => systemMap.set(system.systemId, system));
    return systems;
}

function createShip(systemIds) {
    const ship = {
        shipId: nextShipId,
        name: `ship-${nextShipId++}`,
        systemIds
    };
    shipMap.set(ship.shipId, ship);
    return ship;
};

function createFleet(shipIds) {
    const fleet = {
        fleetId: nextFleetId,
        name: `fleet-${nextFleetId++}`,
        shipIds
    }
    fleetMap.set(fleet.fleetId, fleet);
    return fleet;
};

function createAndDispatchSystems(numSystems) {
    const systems = createSystems(numSystems);
    systems.forEach(system => {
        store.dispatch(systemAdded({system}));
    });
    const systemIds = systems.map(system => system.systemId);
    return systemIds;
}

function createAndDispatchFleet(shipIds) {
    const fleet = createFleet(shipIds);
    store.dispatch(fleetAdded({ fleet }));
}

function createAndDispatchShip(systemIds) {
    const ship = createShip(systemIds);
    store.dispatch(shipAdded({ ship }));
    return ship;
}

export function loadStore() {
    let ships = [];
    for (let i = 0; i < 9; i++) {
        const systemIds = createAndDispatchSystems(3);
        const ship = createAndDispatchShip(systemIds);
        ships.push(ship);
        if (ships.length % 3 === 0) {
            const shipIds = ships.map(ship => ship.shipId);
            createAndDispatchFleet(shipIds);
            ships.length = 0;
        }
    };
    const addSystem = () => {
        const systemIds = createAndDispatchSystems(1);
        const systemId = systemIds[0];
        const ship = shipMap.get(1);
        const updatedShip = {
            ...ship,
            systemIds: [...ship.systemIds, systemId]
        }
        shipMap.set(ship.shipId, updatedShip);
        store.dispatch(shipUpdated({ship: updatedShip}));
    };
    setTimeout(addSystem, 2000);
    const addShip = () => {
        const systemIds = createAndDispatchSystems(3);
        const newShip = createAndDispatchShip(systemIds);
        const fleet = fleetMap.get(1);
        const updatedFleet = {
            ...fleet,
            shipIds: [...fleet.shipIds, newShip.shipId]
        }
        fleetMap.set(fleet.fleetId, updatedFleet);
        store.dispatch(fleetUpdated({ fleet: updatedFleet }));
    }
    setTimeout(addShip, 4000);
};
