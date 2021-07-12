import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAttractions } from "../../ducks/attractionReducer";
import axios from "axios";
import "./Trip.scss";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card"

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

  const adventureArray = props.attractions.attractions.map((e, index) => {

    if (e.location === "Adventureland") {
      return (
        <div className={`divtrip${e.name}`} key={index}>
          <Link to={`/Attraction/${e.attraction_id}`}>
            <h2 className={`trip${e.name}`}>{e.name}</h2>
          </Link>
          <Button
            variant="contained"
            color="primary"
            id="trip-button"
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
      )
    };
  });

  const critterArray = props.attractions.attractions.map((e, index) => {
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
  const fantasyArray = props.attractions.attractions.map((e, index) => {
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
  const frontierArray = props.attractions.attractions.map((e, index) => {
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
  const newArray = props.attractions.attractions.map((e, index) => {
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
  const mainArray = props.attractions.attractions.map((e, index) => {
    return (
      <div className={`divtrip${e.name}`} key={index}>
        <Link to={`/Attraction/${e.attraction_id}`}>
          <h2 className={`trip${e.name}`}>{e.name}</h2>
        </Link>
        <Button
          variant="contained"
          color="primary"
          id="trip-button"
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

  const toonArray = props.attractions.attractions.map((e, index) => {
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
  const tomorrowArray = props.attractions.attractions.map((e, index) => {
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
      <div className="trip-main">
        <div className="trip-lands">
          <Typography variant="h4" color="primary" className="trip-lands-title">
            From which land would you like to add rides to your trip?
          </Typography>
          <div className="trip-lands-main">
            <div className="trip-lands-left">
              <Typography
                variant="h2"
                className="trip-adventure"
                onClick={() => setAdventureCard(true)}
              >
                Adventureland
              </Typography>
              <Typography variant="h2" className="trip-critter">
                Critter Country
              </Typography>
              <Typography variant="h2" className="trip-fantasy">
                Fantasyland
              </Typography>
              <Typography variant="h2" className="trip-frontier">
                Frontierland
              </Typography>
            </div>
            <div className="trip-lands-right">
              <Typography variant="h2" className="trip-mains">
                Main Street USA
              </Typography>
              <Typography variant="h2" className="trip-new">
                New Orleans Square
              </Typography>
              <Typography variant="h2" className="trip-tomorrow">
                Tomorrowland
              </Typography>
              <Typography variant="h2" className="trip-toon">
                Toon Town
              </Typography>
            </div>
          </div>
        </div>
        <div className="trip-trip">
          <h2 className="tripyourday">Your day:</h2>
          {tripArray}
        </div>
        <Card
          className={`${
            adventureCard ? "trip-land-card" : "trip-land-card-closed"
          }`}
        >
          <Typography variant="h5" id="adventure-card-title">
            Adventureland
          </Typography>
          {adventureArray}
          <Button
            onClick={() => setAdventureCard(false)}
            variant="contained"
            color="secondary"
          >
            CLOSE
          </Button>
        </Card>
        <Card
          className={`${
            adventureCard ? "trip-land-card" : "trip-land-card-closed"
          }`}
        >
          <Typography variant="h5" id="adventure-card-title">
            Adventureland
          </Typography>
          {adventureArray}
          <Button
            onClick={() => setAdventureCard(false)}
            variant="contained"
            color="secondary"
          >
            CLOSE
          </Button>
        </Card>
        <Card
          className={`${
            adventureCard ? "trip-land-card" : "trip-land-card-closed"
          }`}
        >
          <Typography variant="h5" id="adventure-card-title">
            Adventureland
          </Typography>
          {adventureArray}
          <Button
            onClick={() => setAdventureCard(false)}
            variant="contained"
            color="secondary"
          >
            CLOSE
          </Button>
        </Card>
        <Card
          className={`${
            adventureCard ? "trip-land-card" : "trip-land-card-closed"
          }`}
        >
          <Typography variant="h5" id="adventure-card-title">
            Adventureland
          </Typography>
          {adventureArray}
          <Button
            onClick={() => setAdventureCard(false)}
            variant="contained"
            color="secondary"
          >
            CLOSE
          </Button>
        </Card>
        <Card
          className={`${
            adventureCard ? "trip-land-card" : "trip-land-card-closed"
          }`}
        >
          <Typography variant="h5" id="adventure-card-title">
            Adventureland
          </Typography>
          {adventureArray}
          <Button
            onClick={() => setAdventureCard(false)}
            variant="contained"
            color="secondary"
          >
            CLOSE
          </Button>
        </Card>
        <Card
          className={`${
            adventureCard ? "trip-land-card" : "trip-land-card-closed"
          }`}
        >
          <Typography variant="h5" id="adventure-card-title">
            Adventureland
          </Typography>
          {adventureArray}
          <Button
            onClick={() => setAdventureCard(false)}
            variant="contained"
            color="secondary"
          >
            CLOSE
          </Button>
        </Card>
        <Card
          className={`${
            adventureCard ? "trip-land-card" : "trip-land-card-closed"
          }`}
        >
          <Typography variant="h5" id="adventure-card-title">
            Adventureland
          </Typography>
          {adventureArray}
          <Button
            onClick={() => setAdventureCard(false)}
            variant="contained"
            color="secondary"
          >
            CLOSE
          </Button>
        </Card>
        <Card
          className={`${
            adventureCard ? "trip-land-card" : "trip-land-card-closed"
          }`}
        >
          <Typography variant="h5" id="adventure-card-title">
            Adventureland
          </Typography>
          {adventureArray}
          <Button
            onClick={() => setAdventureCard(false)}
            variant="contained"
            color="secondary"
          >
            CLOSE
          </Button>
        </Card>
      </div>
    </>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getAttractions })(Trip);
