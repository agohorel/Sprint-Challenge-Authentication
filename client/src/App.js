import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import { Form } from "./components/Form";
import { Jokes } from "./components/Jokes";

function App() {
  return (
    <div>
      <Router>
        <Route path="/register">
          <Form type="register"></Form>
        </Route>
        <Route path="/login">
          <Form type="login"></Form>
        </Route>
        <Route path="/jokes">
          <Jokes></Jokes>
        </Route>
      </Router>
    </div>
  );
}

export default App;
