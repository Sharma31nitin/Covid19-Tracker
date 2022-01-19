import React from 'react';
import './App.css';
import Global from './containers/Global/Global.js';
import Countries from './containers/Global/Countries/Countries';
function App() {
  return (
    <div className="App">
     <Global/>
     <Countries/>
    </div>
  );
}

export default App;
