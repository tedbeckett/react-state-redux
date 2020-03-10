import { store } from './store';
import { added as fleetAdded, removed as fleetRemoved, updated as fleetUpdated } from './state-using-slices/fleetSlice';
import { added as airplaneAdded, removed as airplaneRemoved, updated as airplaneUpdated } from './state-using-slices/airplaneSlice';
import { added as systemAdded, removed as systemRemoved, updated as systemUpdated } from './state-using-slices/systemsSlice';
import { fleetSelected, airplaneSelected, systemSelected } from './state-using-slices/uiSlice';

let eventSource;

export function startReceivingSse() {
    console.info('Creating sse connection');
    eventSource = new EventSource('http://localhost:3001/events');

    addSseHandler(systemAdded);
    addSseHandler(systemUpdated);
    addSseHandler(systemRemoved);
    addSseHandler(systemSelected);
    addSseHandler(airplaneAdded);
    addSseHandler(airplaneRemoved);
    addSseHandler(airplaneUpdated);
    addSseHandler(airplaneSelected);
    addSseHandler(fleetAdded);
    addSseHandler(fleetRemoved);
    addSseHandler(fleetUpdated);
    addSseHandler(fleetSelected);

    eventSource.onmessage = function (event) {
        console.warn(`Warning: no handler for SSE: ${event.id}`);
    }
    eventSource.onopen = () => console.info('Sse connection open');
    eventSource.onerror = () => console.error('Sse connection failed');
}

function addSseHandler(actionCreator) {
    const { type } = actionCreator;
    const sseHandler = event => {
        // Naming convention for action creator type is domain/operation.
        // Then by our own convention we use the action type domain as the field name 
        // for the payload data.
        const domain = type.substring(0, type.indexOf('/'));
        const payload = {
            [domain]: JSON.parse(event.data)
        };
        store.dispatch(actionCreator(payload));
        console.info(`dispatch ${actionCreator}`);
    };
    eventSource.addEventListener(type, sseHandler);
}



