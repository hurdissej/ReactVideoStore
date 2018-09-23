import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/navbar.jsx";
import NotFound from "./components/not-found.jsx";
import Customers from "./components/customers.jsx";
import Rentals from "./components/rentals.jsx";
import MovieForm from "./components/movieForm.jsx";
import LoginForm from "./components/loginForm.jsx";
import RegistrationForm from "./components/registrationForm.jsx";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="content m-4">
          <Switch>
            <Route path="/login" exact component={LoginForm} />
            <Route path="/register" exact component={RegistrationForm} />
            <Route path="/movies" exact component={Movies} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
