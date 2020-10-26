import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import Map from './components/Map';
import About from './components/About';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home}/>
      <Route path="/map" component={Map}/>
      <Route path="/about" component={About}/>
    </Router>

  );
}

export default App;
