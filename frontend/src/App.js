import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Email from "./components/Email";
import "./App.css";
import Login from "./components/Login";
import Departments from "./components/Departments";
// import Dept from "./components/ShowDepts";
import { useSelector } from "react-redux";
import AskEntery from "./components/AskEntery";

function App() {
  const login = useSelector((state) => state.login.loggedIn);
  let routes;
  if (login) {
    routes = (
      <React.Fragment>
        <Route path="/users" exact element={<AskEntery />} />
        <Route path="/users/dept" exact element={<Departments />} />
        <Route path="/users/email" exact element={<Email />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" exact element={<Login />} />
      </React.Fragment>
    );
  }

  return (
    <BrowserRouter>
      <Routes>{routes}</Routes>
    </BrowserRouter>
  );
}

export default App;
