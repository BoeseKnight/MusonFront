import "./App.css";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Greeting from "./components/Greeting";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ReactDOM } from "react";
import {useState} from 'react';


function App() {
  const[token, setToken]=useState("")
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Greeting} />
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
