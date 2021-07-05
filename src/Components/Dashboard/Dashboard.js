import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAttractions } from "../../ducks/attractionReducer";
import axios from "axios";
import "./Dashboard.scss";
import { Link } from "react-router-dom";
import { getUser } from "../../ducks/userReducer";
import Button from "@material-ui/core/Button"

function Dashboard(props) {
  const { id } = props.user.user;

  useEffect(() => {
    axios.get("/api/attractions").then((res) => {
      props.getAttractions(res.data);
    });

    getDayLinks();
    getDays();
  }, [props.getAttractions, props.user.user]);

  const [dayLinks, setDayLinks] = useState([]);
  const [days, setDays] = useState([]);

  function getDays() {
    axios.get(`/api/days/${id}`).then((res) => setDays(res.data));
  }

  function getDayLinks() {
    axios.get(`/api/trips/${id}`).then((res) => {
      setDayLinks(res.data);
    });
  }

  function newlist() {
    axios.post("/api/trip", { id });
    getDays();
    getDayLinks();
  }

  function deleteDay(trip_id) {
    axios.delete(`/api/day/${trip_id}`);
    getDays();
    getDayLinks();
  }

  const filledDays = days.map((e, index) => {
    return (
      <div key={index} className="filled-day">
        <Link to={`/Trip/${e.trip_id}`}>
          <h1 className="filled-day-title">Day {index + 1}</h1>
        </Link>
        {e.events.map((event, index) => (
          <Link to={`/Attraction/${event[2]}`}>
            <h3 key={index} className={`dashboard${event[1]}`}>
              {event[0]}
            </h3>
          </Link>
        ))}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => deleteDay(e.trip_id)}
        >
          Delete Day
        </Button>
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
      <div className="dashboardmain">
        <h1 className="dashboardtitle">Plan Your Trip</h1>
        <div className="dashboarddays">
          <h6>Click day to edit</h6>
          <h6 className="dayslist">{emptyDays}</h6>
          <h6>or</h6>
          <Button variant="contained" color="primary" onClick={() => newlist()}>Add Day to Trip</Button>
        </div>
        <div className="trip-so-far">
          <h3>Your trip so far:</h3>
        </div>
        <div className="dashboardlist">{filledDays}</div>
      </div>
    </>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getAttractions, getUser })(Dashboard);
