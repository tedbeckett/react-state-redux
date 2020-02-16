let systems = [];
let ships = [];
let fleets = [];
let nextSystemId = 1;
let nextShipId = 1;
let nextFleetId = 1;

function generateSystems(n) {
    for (let i = 0; i < n; i++) {
        systems.push({
            systemId: nextSystemId,
            name: `system-${nextSystemId++}`,
            status: 'ready'
        });
    }
}

function generateShips() {
    let systemIds = [];
    let systemIdGroups = [];
    systems.forEach((system, i) => {
        systemIds.push(system.systemId);
        if (((i + 1) % 3 === 0 && i !== 0) || i === systems.length - 1) {
            systemIdGroups.push([...systemIds]);
            systemIds = [];
        }
    });
    systemIdGroups.forEach(systemIds => {
        const ship = {
            shipId: nextShipId,
            name: `ship-${nextShipId++}`,
            systemIds
        }
        ships.push(ship);
    });
};

function generateFleets() {
    let shipIds = [];
    let shipIdGroups = [];
    ships.forEach((ship, i) => {
        shipIds.push(ship.shipId);
        if (((i + 1) % 3 === 0 && i !== 0) || i === ships.length - 1) {
            shipIdGroups.push([...shipIds]);
            shipIds = [];
        };
    });
    shipIdGroups.forEach(shipIds => {
        const fleet = {
            fleetId: nextFleetId,
            name: `fleet-${nextFleetId++}`,
            shipIds
        }
        fleets.push(fleet);
    });
}

export function* eventGenerator() {
    systems = [];
    ships = [];
    fleets = [];
    generateSystems(27);
    generateShips();
    generateFleets();
    const events = createEvents();
    for (let event of events) {
        yield event;
    }
}

function createEvents() {
    console.log('generateEvents');
    let events = [];
    systems.forEach(system => {
        events.push({
            type: 'system/added',
            data: system
        })
    })
    ships.forEach(ship => {
        events.push({
            type: 'ship/added',
            data: ship
        });
    })
    fleets.forEach(fleet => {
        events.push({
            type: 'fleet/added',
            data: fleet
        });
    });
    return events;
};
