import { store } from './store';
import { airplaneAdded, airplaneUpdated } from './state1/airplane';
import { fleetAdded, fleetUpdated } from './state1/fleet';
import { systemAdded, systemUpdated } from './state1/system';

let nextSystemId = 1;
let nextAirplaneId = 1;
let nextFleetId = 1;
let fleetMap = new Map();
let airplaneMap = new Map();
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

function createAirplane(systemIds) {
    const airplane = {
        airplaneId: nextAirplaneId,
        name: `airplane-${nextAirplaneId++}`,
        systemIds
    };
    airplaneMap.set(airplane.airplaneId, airplane);
    return airplane;
};

function createFleet(airplaneIds) {
    const fleet = {
        fleetId: nextFleetId,
        name: `fleet-${nextFleetId++}`,
        airplaneIds
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

function createAndDispatchFleet(airplaneIds) {
    const fleet = createFleet(airplaneIds);
    store.dispatch(fleetAdded({ fleet }));
}

function createAndDispatchAirplane(systemIds) {
    const airplane = createAirplane(systemIds);
    store.dispatch(airplaneAdded({ airplane }));
    return airplane;
}

export function loadStore() {
    let airplanes = [];
    for (let i = 0; i < 9; i++) {
        const systemIds = createAndDispatchSystems(3);
        const airplane = createAndDispatchAirplane(systemIds);
        airplanes.push(airplane);
        if (airplanes.length % 3 === 0) {
            const airplaneIds = airplanes.map(airplane => airplane.airplaneId);
            createAndDispatchFleet(airplaneIds);
            airplanes.length = 0;
        }
    };
    const addSystem = () => {
        const systemIds = createAndDispatchSystems(1);
        const systemId = systemIds[0];
        const airplane = airplaneMap.get(1);
        const updatedAirplane = {
            ...airplane,
            systemIds: [...airplane.systemIds, systemId]
        }
        airplaneMap.set(airplane.airplaneId, updatedAirplane);
        store.dispatch(airplaneUpdated({airplane: updatedAirplane}));
    };
    setTimeout(addSystem, 2000);
    const addAirplane = () => {
        const systemIds = createAndDispatchSystems(3);
        const newAirplane = createAndDispatchAirplane(systemIds);
        const fleet = fleetMap.get(1);
        const updatedFleet = {
            ...fleet,
            airplaneIds: [...fleet.airplaneIds, newAirplane.airplaneId]
        }
        fleetMap.set(fleet.fleetId, updatedFleet);
        store.dispatch(fleetUpdated({ fleet: updatedFleet }));
    }
    setTimeout(addAirplane, 4000);
};
