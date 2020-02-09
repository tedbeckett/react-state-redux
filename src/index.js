import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './state1/store';
import { loadStore } from './loadStore';
import { startReceivingSse } from './sse';

loadStore();
startReceivingSse();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


