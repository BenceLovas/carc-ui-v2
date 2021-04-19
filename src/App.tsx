import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Game from "./pages/game/Game";
import Nickname from "./pages/nickname/Nickname";
import Login from './pages/login/Login';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/nickname">
          <Nickname />
        </Route>
        <Route path={["/login", "/"]}>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
