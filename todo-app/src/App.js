// import logo from './logo.svg';
import React from 'react';
import './App.css';
import {Switch, Route,BrowserRouter} from "react-router-dom";
import Home from './components/Home';


function App() {
  return (
    <BrowserRouter>
  <Switch>
      <Route exact path = '/' component={Home}/>

    </Switch>
    </BrowserRouter>
  
  );
}

export default App;
