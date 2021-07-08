import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAttractions } from "../../ducks/attractionReducer";
import axios from "axios";
import "./Trip.scss";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Trip(props) {
  const [trip, setTrip] = useState([]);
  const [fantasyCard, setFantasyCard] = useState(false);
  const [mainCard, setMainCard] = useState(false);
  const [frontierCard, setFrontierCard] = useState(false);
  const [critterCard, setCritterCard] = useState(false);
  const [newCard, setNewCard] = useState(false);
  const [adventureCard, setAdventureCard] = useState(false);
  const [tomorrowCard, setTomorrowCard] = useState(false);
  const [toonCard, setToonCard] = useState(false);

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
      <Button
        variant="contained"
        color="secondary"
        onClick={() => removeFromTrip(e.event_id)}
      >
        REMOVE
      </Button>
    </div>
  ));

  const attractionsArray = props.attractions.attractions.map((e, index) => {
    return (
      <div className={`divtrip${e.name}`} key={index}>
        <Link to={`/Attraction/${e.attraction_id}`}>
          <h2 className={`trip${e.name}`}>{e.name}</h2>
        </Link>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            newEvent(
              props.match.params.trip_id,
              e.attraction_id,
              props.user.user.id
            )
          }
        >
          Add
        </Button>
      </div>
    );
  });
  return (
    <>
      <div className="tripmain">
        {/* <div className="trip"> */}
          {/* {attractionsArray} */}
          <div className="trip-left">
            <Typography variant="h2" className="tripadventure">
              Adventureland
            </Typography>
            <Typography variant="h2" className="tripcritter">
              Critter Country
            </Typography>
            <Typography variant="h2" className="tripfantasy">
              Fantasyland
            </Typography>
            <Typography variant="h2" className="tripfrontier">
              Frontierland
            </Typography>
          </div>
          <div className="trip-right">
            <Typography variant="h2" className="tripmains">
              Main Street USA
            </Typography>
            <Typography variant="h2" className="tripnew">
              New Orleans Square
            </Typography>
            <Typography variant="h2" className="triptomorrow">
              Tomorrowland
            </Typography>
            <Typography variant="h2" className="triptoon">
              Toon Town
            </Typography>
          </div>
        {/* </div> */}
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
