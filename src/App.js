import React from "react";
import "./App.css";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      {/* A Switch renders the first child Route that matches */}
      {/* If i were to delete the <Switch> the Errors page will forever display in all sub-pages */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/" component={Rooms} />
        {/* The slug is just a randome name, it coule be anything The reason for
        this :slug is to let React know that after /rooms/(It could be any
        single page) Example www.beachresort/rooms/deluxe or
        www.beachresort/rooms/family-suite */}
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route component={Error} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
