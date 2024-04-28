// src/App.js
import React from 'react';
import Splitter, { SplitDirection } from '@devbookhq/splitter';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';
import ComponentC from './ComponentC';

function App() {
  return (
    <div className="App" style={{ height: '100vh' }}>
      <Splitter
        direction={SplitDirection.Vertical}
        initialSizes={[50, 50]}  
        minSize={100}
        style={{ height: '100%' }}
      >
        <div style={{ height: '100%' }}>
          <Splitter
            direction={SplitDirection.Horizontal}
            initialSizes={[50, 50]}  
            minSize={100}
            style={{ height: '100%' }}
          >
            <ComponentA />
            <ComponentB />
          </Splitter>
        </div>
        <ComponentC />
      </Splitter>
    </div>
  );
}

export default App;
