import { store } from './state1/store';

let evtSource;

export function startReceivingSse() {
    console.log('Creating sse connection');
    evtSource = new EventSource('http://localhost:3001/events');

    evtSource.onmessage = function (event) {
        console.log(`Received event: ${event.data}`);
        console.log(`Received event: ${event.id}`);
    }
    evtSource.onopen = () => console.log('Sse connection open');
    evtSource.onerror = () => console.log('Sse connection failed');
    
    evtSource.addEventListener("myevent", function(e) { 
      console.log('received event myevent: ' + e.data);
    })
    }



