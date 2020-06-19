import React from 'react';
import './App.scss';
import Routes from './routes.js'
import Nav from './Components/Nav.js'

function App() {
  return (
    <div className="App">
      <div>
      <Nav/>
      </div>
      <div className="routes">
      {Routes}
      </div>
    </div>
  );
}

export default App;
