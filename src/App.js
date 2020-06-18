import React from 'react';
import './App.css';
import Routes from './routes.js'
import Nav from './Components/Nav/Nav.js'

function App() {
  return (
    <div className="App">
      <Nav/>
      {Routes}
    </div>
  );
}

export default App;
