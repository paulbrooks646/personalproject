import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAttractions } from "../ducks/attractionReducer";
import axios from "axios";
import "./components.scss";
import { Link } from "react-router-dom";
import Nav from './Nav'

function Trip(props) {
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    axios.get("/api/attractions").then((res) => {
      props.getAttractions(res.data);
    });

    getTrip();
  }, [props.getAttractions, props.user.user]);

  function getTrip() {
    axios
      .get(`/api/trip/${props.match.params.trip_id}`)
      .then((res) => setTrip(res.data));
  }

  function newEvent(trip_id, attraction_id, user_id) {
    console.log(trip_id, attraction_id, user_id);
    axios.post("/api/event", { trip_id, attraction_id, user_id });
    getTrip();
  }

  function removeFromTrip(id) {
    axios.delete(`/api/trip/${id}`);
    getTrip();
  }

  const tripArray = trip.map((e, index) => (
    <div className="currenttrip" key={index}>
      <h2 className={`trip${e.name}`}>{e.name}</h2>
      <button onClick={() => removeFromTrip(e.event_id)}>
        Remove From Trip
      </button>
    </div>
  ));

  const attractionsArray = props.attractions.attractions.map((e, index) => {
    return (
      <div className={`divtrip${e.name}`} key={index} style={{border: "solid"}}>
        <Link to={`/Attraction/${e.attraction_id}`}>
          <h2 className={`trip${e.name}`}>{e.name}</h2>
        </Link>
        <button
          onClick={() =>
            newEvent(
              props.match.params.trip_id,
              e.attraction_id,
              props.user.user.id
            )
          }
        >
          Add to Trip
        </button>
      </div>
    );
  });
  return (
    <>
      <Nav />
      <div className="tripmain">
        <div className="trip">
          {attractionsArray}
          <h2 className="tripfantasy">Fantasyland</h2>
          <h2 className="tripmains">Main Street USA</h2>
          <h2 className="tripfrontier">Frontierland</h2>
          <h2 className="tripcritter">Critter Country</h2>
          <h2 className="tripnew">New Orleans Square</h2>
          <h2 className="tripadventure">Adventureland</h2>
          <h2 className="triptomorrow">Tomorrowland</h2>
          <h2 className="triptoon">Toon Town</h2>
        </div>
        <div className="triptrip">
          <h2 className="tripyourday">Your day:</h2>
          {tripArray}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getAttractions })(Trip);
