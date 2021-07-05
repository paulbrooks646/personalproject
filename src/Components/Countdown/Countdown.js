import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAttractions } from "../../ducks/attractionReducer.js";
import { getUser } from "../../ducks/userReducer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import "./Countdown.scss";
import axios from "axios";

function Countdown(props) {
  const { id } = props.user.user;

  const [date, setDate] = useState("");
  const [tripDateCard, setTripDateCard] = useState(false);

  function selectDate() {
    axios.put(`/api/date/${id}`, { date }).then((res) => {
      props.getUser(res.data);
      setTripDateCard(false);
    });
  }

  function selectDate() {
    axios.put(`/api/date/${id}`, { date }).then((res) => {
      props.getUser(res.data);
      setTripDateCard(false)
    });
  }

  const calculateTimeLeft = () => {
    const difference = +new Date(props.user.user.date) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)) + 1,
      };
    } else {
      timeLeft = {
        days: "???",
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <Typography variant="h5" color="primary" key={"time"}>
        {timeLeft[interval]}
      </Typography>
    );
  });

  return props.user.user.date ? (
    <div className="countdown-div">
      <div className="countdown-div-section">
        <div className="countdown-div-item">
          <Typography variant="h6" color="secondary" className="nav-welcome">
            Only
          </Typography>
        </div>
        <div className="countdown-div-item">
          {timerComponents.length ? timerComponents : <div></div>}
        </div>
        <div className="countdown-div-item">
          <Typography variant="h6" color="secondary" className="nav-welcome">
            days til your trip!
          </Typography>
        </div>
      </div>
      <div className="countdown-edit-section">
        <Typography
          variant="h6"
          color="primary"
          id="countdown-edit"
          onClick={() => setTripDateCard(true)}
        >
          EDIT TRIP DATE
        </Typography>
      </div>
      <Card
        id={`${
          tripDateCard ? "trip-date-card" : "trip-date-card-closed"
        }`}
      >
        <Typography variant="h4" color="primary">
          CHOOSE TRIP DATE
        </Typography>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          variant="filled"
        ></Input>
        <Button variant="contained" color="secondary" onClick={selectDate}>
          SUBMIT
        </Button>
      </Card>
    </div>
  ) : (
    <div className="date-selector">
      <Typography variant="h6" color="secondary" className="trip-date-text">
        ADD TRIP DATE:
      </Typography>
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        variant="filled"
        className="trip-date-input"
      />
      <Button
        onClick={() => selectDate()}
        variant="contained"
        color="secondary"
        className="trip-date-button"
      >
        Submit
      </Button>
      <Card
        id={`${
          tripDateCard ? "trip-date-card" : "trip-date-card-closed"
        }`}
      >
        <Typography variant="h4" color="primary">
          CHOOSE TRIP DATE
        </Typography>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          variant="filled"
        ></Input>
        <Button variant="contained" color="secondary" onClick={selectDate}>
          SUBMIT
        </Button>
      </Card>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getAttractions, getUser })(Countdown);
