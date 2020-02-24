import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let systems = [];
let airplanes = [];
let fleets = [];

function readData() {
    const file = fs.readFileSync(path.resolve(__dirname, './data.json'));
    const data = JSON.parse(file);
    systems = data.systems;
    airplanes = data.airplanes;
    fleets = data.fleets;
}

function createEvents() {
    const systemEvents = systems.map(system => ({
        type: 'system/added',
        data: system
    }));
    const airplaneEvents = airplanes.map(airplane => ({
        type: 'airplane/added',
        data: airplane
    }));
    const fleetEvents = fleets.map(fleet => ({
        type: 'fleet/added',
        data: fleet
    }));
    const updateEvents = [
        {
            type: 'system/updated',
            data: {
                system: {
                    "systemId": 1,
                    "name": "Gyro",
                    "status": "bad"
                }
            },
            delay: 3000
        }
    ]
    return [...systemEvents, ...airplaneEvents, ...fleetEvents, ...updateEvents];
}

function* eventGenerator() {
    readData();
    const events = createEvents();
    for (let event of events) {
        yield event;
    }
};

const _default = eventGenerator;
export { _default as default };

