import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAttractions } from "../../ducks/attractionReducer";
import axios from "axios";
import "./Dashboard.scss";
import { Link } from "react-router-dom";
import { getUser } from "../../ducks/userReducer";
import Button from "@material-ui/core/Button";
import Carousel from "react-material-ui-carousel";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

function Dashboard(props) {
  const { id } = props.user.user;

  useEffect(() => {
    axios.get("/api/attractions").then((res) => {
      props.getAttractions(res.data);
    });

    getDayLinks();
    // getDays();
  }, [props.getAttractions, props.user.user]);

  const [dayLinks, setDayLinks] = useState([]);
  // const [days, setDays] = useState([]);
  const [tripIDs, setTripIDs] = useState([])

  // function getDays() {
  //   axios.get(`/api/days/${id}`).then((res) => {
  //     setDays(res.data);
  //   });
  // }

  function getDayLinks() {
    axios.get(`/api/trips/${id}`).then((res) => {
      
      setDayLinks(res.data[0]);
      setTripIDs(res.data[1])
    });
  }

  function newlist() {
    axios.post("/api/trip", { id });
    // getDays();
    getDayLinks();
  }

  function deleteDay(trip_id) {
    axios.delete(`/api/day/${trip_id}`);
    // getDays();
    getDayLinks();
  }

  // const filledDays = days.map((e, index) => {
  //   return (
  //     <Card key={index} id="filled-day">
  //       <Typography variant="h4" color="primary" className="filled-day-title">
  //         Day {index + 1}
  //       </Typography>
  //       {e.events.map((event, index) => (
  //         <Link to={`/Attraction/${event[2]}`}>
  //           <h3 key={index} className={`dashboard${event[1]}`}>
  //             {event[0]}
  //           </h3>
  //         </Link>
  //       ))}
  //       <div className="filled-day-button-div">
  //         <Link to={`/Trip/${tripIDs[index]}`}>
  //           <Button variant="contained" color="primary">
  //             Edit Day
  //           </Button>
  //         </Link>
  //         <Button
  //           variant="contained"
  //           color="secondary"
  //           onClick={() => deleteDay(tripIDs[index])}
  //         >
  //           Delete Day
  //         </Button>
  //       </div>
  //     </Card>
  //   );
  // });

  const emptyDays = dayLinks.map((e, index) => {
    return (
    <Card key={index} id="filled-day">
      <Typography variant="h4" color="primary" className="filled-day-title">
        Day {index + 1}
      </Typography>
      {e.map((event, index) => (
        <Link to={`/Attraction/${event.attraction_id}`}>
          <h3 key={index} className={`dashboard${event.location}`}>
            {event.name}
          </h3>
        </Link>
      ))}
      <div className="filled-day-button-div">
        <Link to={`/Trip/${tripIDs[index]}`}>
          <Button variant="contained" color="primary">
            Edit Day
          </Button>
        </Link>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => deleteDay(tripIDs[index])}
        >
          Delete Day
        </Button>
      </div>
    </Card>
    )
    
  });

  return (
    <>
      <div className="dashboardmain">
        <div className="dashboarddays">
         
          <Button variant="contained" color="primary" onClick={() => newlist()}>
            Add Day to Trip
          </Button>
        </div>

        <Carousel
          autoPlay={false}
          navButtonsAlwaysVisible={true}
          navButtonsAlwaysInvisible={false}
          fullHeightHover={false}
          className="dashboard-carousel"
        >
          {emptyDays}
        </Carousel>
      </div>
    </>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getAttractions, getUser })(Dashboard);
