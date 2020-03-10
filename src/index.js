import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { loadStore } from './loadStore';
import { startReceivingSse } from './sse';

// loadStore();
startReceivingSse();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


