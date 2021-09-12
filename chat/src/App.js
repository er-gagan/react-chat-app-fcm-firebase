import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import RESTRICT_AFTER_LOGGED_IN_COMPONENT from './RESTRICT_AFTER_LOGGED_IN_COMPONENT';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Signup from './components/Signup/Signup';
import 'react-toastify/dist/ReactToastify.css';
import Chat from './components/Chat/Chat';
import Protected from './Protected'
import './App.css';


const App = () => {

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Protected component={Chat} />
          </Route>
          <Route exact path="/login">
            <RESTRICT_AFTER_LOGGED_IN_COMPONENT component={Login} />
          </Route>
          <Route exact path="/signup">
            <RESTRICT_AFTER_LOGGED_IN_COMPONENT component={Signup} />
          </Route>
        </Switch>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
