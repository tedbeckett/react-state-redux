import React from 'react';
import { FleetList } from './components/FleetList';
import './App.css';

export const App2 = () => (
  <div className="App">
    <header className="App-header">
      <FleetList 
        onFleetSelected={(id) => console.log('on fleet selected: ' + id)}
      />
    </header>
  </div>
);
