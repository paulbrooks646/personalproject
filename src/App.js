import React, { useEffect } from "react";
import "./App.scss";
import Routes from "./routes.js";
import Nav from "./Components/Nav/Nav"
import axios from "axios";
import { loginUser } from "./ducks/userReducer.js";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom"

function App(props) {
  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        props.loginUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app-main">
      <Nav/>
      <div className="routes">{Routes}</div>
    </div>
  );
}
const mapStateToProps = (reduxState) => reduxState;

export default withRouter(connect(mapStateToProps, { loginUser })(App));
