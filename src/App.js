import React from "react";
import { BrowserRouter, Route, Switch, NavLink, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Article from "./pages/Article";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>My Articles</h1>
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          {/* ":" is a rout parameter that changes, in oru case article/1 article/2... */}
          {/* we click on a Link and this link is connected to this component */}
          <Route path="/article/:id">
            <Article />
          </Route>
          {/* "*" matches against everything */}
          <Route path="*">
            {/* if we enter some random after a slash /sdlkf than it will redirect us to home */}
            <Redirect to="/"/>
          </Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
