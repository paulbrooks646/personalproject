import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAttractions } from "../ducks/attractionReducer";
import axios from "axios";
import "./components.scss";
import { Link } from "react-router-dom";
import Countdown from "./Countdown.js";
import { getUser } from "../ducks/userReducer";
import Nav from "./Nav";

function Dashboard(props) {
  useEffect(() => {
    axios.get("/api/attractions").then((res) => {
      props.getAttractions(res.data);
    });
    getDayLinks();
    getDays();
  }, [props.getAttractions, props.user.user]);

  const [dayLinks, setDayLinks] = useState([]);
  const [days, setDays] = useState([]);
  const [date, setDate] = useState("2030-10-30");

  function getDays() {
    const { id } = props.user.user;
    axios.get(`/api/days/${id}`).then((res) => setDays(res.data));
  }

  function getDayLinks() {
    const { id } = props.user.user;
    axios.get(`/api/trips/${id}`).then((res) => setDayLinks(res.data));
  }

  function newlist() {
    const { id } = props.user.user;
    axios.post("/api/trip", { id });
    getDays();
    getDayLinks();
  }

  function deleteDay(trip_id) {
    axios.delete(`/api/day/${trip_id}`);
    getDays();
    getDayLinks();
  }

  function selectDate() {
    const { id } = props.user.user;
    axios.put(`/api/date/${id}`, { date }).then(() => {
      props.getUser();
    });
  }

  const filledDays = days.map((e, index) => {
    return (
      <div key={index}>
        <Link to={`/Trip/${e.trip_id}`}>
          <h1>Day {index + 1}</h1>
        </Link>
        {e.events.map((event) => (
          <h3 className="dashboardattraction">{event}</h3>
        ))}
        <button onClick={() => deleteDay(e.trip_id)}>Delete Day</button>
      </div>
    );
  });

  const emptyDays = dayLinks.map((e, index) => (
    <Link to={`/Trip/${e.trip_id}`} key={index}>
      <h6>Day {index + 1}</h6>
    </Link>
  ));

    return (
      <>
      <Nav />
    <div className="dashboardmain">
      <div className="countdowndiv">
        <Countdown />
        <div className="dateselector">
          <h2>Add Date To Trip:</h2>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={() => selectDate()}>Submit</button>
        </div>
      </div>
      <h1 className="dashboardtitle">Plan Your Trip</h1>
      <div className="dashboarddays">
        <h6>Click day to edit</h6>
        <h6 className="dayslist">{emptyDays}</h6>
        <h6>or</h6>
        <button onClick={() => newlist()}>Add Day to Trip</button>
      </div>
      <h3>Your trip so far:</h3>
      <div className="dashboardlist">{filledDays}</div>
      <div className="statsbuttondiv">
        <h4 id="dashstat">Click here to see:</h4>
        <Link to="/Statistics">
          <button className="statsbutton">Attraction Statistics</button>
        </Link>
      </div>
            </div>
            </>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getAttractions, getUser })(Dashboard);
