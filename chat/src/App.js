import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Chat from './components/Chat/Chat';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/chat">
            <Chat />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
