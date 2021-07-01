import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../../ducks/userReducer";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import "./Nav.scss";

function Nav(props) {
  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    axios.delete("/api/logout").then(() => {
      props.logoutUser();
      props.history.push("/");
    });
  };

  return (
    <div className="navbar">
      <div className="nav-welcome-div">
        <Typography variant="h5" color="secondary" className="nav-welcome">
          Welcome {props.user.user.username}
        </Typography>
      </div>
      <div className="nav-link-div">
        <Link
          to="/Dashboard"
          id={`${
            props.location.pathname === "/Dashboard"
              ? "nav-link-closed"
              : "nav-link"
          }`}
        >
          <Button color="primary" variant="contained">
            Trip Builder
          </Button>
        </Link>
        <Link
          to="/Map"
          id={`${
            props.location.pathname === "/Map" ? "nav-link-closed" : "nav-link"
          }`}
        >
          <Button color="primary" variant="contained">
            Disneyland Map
          </Button>
        </Link>
        <Link
          to="/Survey"
          id={`${
            props.location.pathname === "/Survey"
              ? "nav-link-closed"
              : "nav-link"
          }`}
        >
          <Button color="primary" variant="contained">
            Survey
          </Button>
        </Link>
        <Link
          to="/Statistics"
          id={`${
            props.location.pathname === "/Statistics"
              ? "nav-link-closed"
              : "nav-link"
          }`}
        >
          <Button color="primary" variant="contained">
            Statistics
          </Button>
        </Link>
      </div>
      <div className="nav-logout-div">
        <Button onClick={() => logout()} color="secondary" variant="contained">
          Logout
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;

export default withRouter(
  connect(mapStateToProps, { logoutUser, getUser })(Nav)
);
