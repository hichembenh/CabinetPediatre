import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

import Auth from "./components/Auth/Auth";
import Home from "./components/Pages/Home";
import Kids from "./components/Pages/Kids";
import Secretaire from "./components/Pages/Secretaire";
import Navbar from "./components/Navbar/Navbar";


const App = () => {

  return (

      <Router>
          <Navbar/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/sign-up' exact component={Auth}/>
          <Route path='/kids' exact component={Kids}/>
          <Route path='/secretaire' exact component={Secretaire}/>
        </Switch>
      </Router>

  );
};

export default App;
