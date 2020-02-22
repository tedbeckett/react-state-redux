let systems = [];
let airplanes = [];
let fleets = [];
let nextSystemId = 1;
let nextAirplaneId = 1;
let nextFleetId = 1;

function generateSystems(n) {
    function generateName(j) {
        return j % 3 === 0 ? 'altimeter' : j % 2 === 0 ? 'compass' : 'gyro';
    }

    for (let i = 0; i < n; i++) {
        systems.push({
            systemId: nextSystemId++,
            name: generateName(i + 1),
            status: 'good'
        });
    }
}

function generateAirplanes() {
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
        const airplane = {
            airplaneId: nextAirplaneId,
            name: `airplane-${nextAirplaneId++}`,
            systemIds
        }
        airplanes.push(airplane);
    });
};

function generateFleets() {
    let airplaneIds = [];
    let airplaneIdGroups = [];
    airplanes.forEach((airplane, i) => {
        airplaneIds.push(airplane.airplaneId);
        if (((i + 1) % 3 === 0 && i !== 0) || i === airplanes.length - 1) {
            airplaneIdGroups.push([...airplaneIds]);
            airplaneIds = [];
        };
    });
    airplaneIdGroups.forEach(airplaneIds => {
        const fleet = {
            fleetId: nextFleetId,
            name: `fleet-${nextFleetId++}`,
            airplaneIds
        }
        fleets.push(fleet);
    });
}

export function* eventGenerator() {
    systems = [];
    airplanes = [];
    fleets = [];
    nextSystemId = 1;
    nextAirplaneId = 1;
    nextFleetId = 1;
    generateSystems(27);
    generateAirplanes();
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
    airplanes.forEach(airplane => {
        events.push({
            type: 'airplane/added',
            data: airplane
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
