import { store } from './store';
// import { fleetAdded, fleetRemoved, fleetUpdated, fleetSelected } from './state1/fleet';
// import { airplaneAdded, airplaneRemoved, airplaneUpdated, airplaneSelected } from './state1/airplane';
// import { systemAdded, systemRemoved, systemUpdated, systemSelected } from './state1/system';
import { added as fleetAdded, removed as fleetRemoved, updated as fleetUpdated } from './state-using-slices/fleetSlice';
import { added as airplaneAdded, removed as airplaneRemoved, updated as airplaneUpdated } from './state-using-slices/airplaneSlice';
import { added as systemAdded, removed as systemRemoved, updated as systemUpdated } from './state-using-slices/systemsSlice';
import { fleetSelected, airplaneSelected, systemSelected } from './state-using-slices/uiSlice';

let eventSource;

// Convenience function - creates and registers a sse listener that dispatches to the redux store.
function addListener(actionCreator) {
    const listener = event => {
        const payload = {
            [actionCreator.type]: JSON.parse(event.data)
        };
        const action = actionCreator(payload);
        store.dispatch(action);
        console.log(`dispatch event ${actionCreator} payload ${JSON.stringify(payload, null, 2)}`);
    };
    eventSource.addEventListener(actionCreator.type, listener);
}

export function startReceivingSse() {
    console.log('Creating sse connection');
    eventSource = new EventSource('http://localhost:3001/events');

    //    addListener(systemAdded);
    eventSource.addEventListener(
        systemAdded, e => {
            store.dispatch(systemAdded({ system: JSON.parse(e.data) }))
        }
    );
    eventSource.addEventListener(
        systemUpdated, e => {
            store.dispatch(systemUpdated({ system: JSON.parse(e.data) }))
        }
    );
    addListener(systemRemoved);
    // addListener(
    //     systemUpdated, e => store.dispatch(systemUpdated({ system: JSON.parse(e.data) })));
    addListener(systemSelected);

    eventSource.addEventListener(airplaneAdded, e => store.dispatch(airplaneAdded({ airplane: JSON.parse(e.data) })));
    addListener(airplaneRemoved);
    addListener(airplaneUpdated);
    addListener(airplaneSelected);

    eventSource.addEventListener(fleetAdded, e => store.dispatch(fleetAdded({ fleet: JSON.parse(e.data) })));
    addListener(fleetRemoved);
    addListener(fleetUpdated);
    addListener(fleetSelected);

    eventSource.onmessage = function (event) {
        console.log(`Warning: no handler for SSE: ${event.id}`);
    }
    eventSource.onopen = () => console.log('Sse connection open');
    eventSource.onerror = () => console.log('Sse connection failed');
}



