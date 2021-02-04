import React, { useEffect, useState } from "react";
import "./components.scss";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { getAttractions } from "../ducks/attractionReducer";
import Nav from "./Nav";

function Statistics(props) {
  const [ratings, setRatings] = useState([]);
  const [userratings, setUserRatings] = useState([]);

  useEffect(() => {
    getRatings();
    getUserRatings();
  });

  function getRatings() {
    axios.get("/api/ratings").then((res) => setRatings(res.data));
  }

  function getUserRatings() {
    const { id } = props.user.user;
    axios.get(`/api/ratings/${id}`).then((res) => setUserRatings(res.data));
  }

  let attractionArr = ratings.map((e) => {
    return e.name;
  });

  let ratingArr = ratings.map((e) => {
    return e.rating;
  });

  let userAttractionArr = userratings.map((e) => {
    return e.name;
  });

  let userRatingArr = userratings.map((e) => {
    return e.rating;
  });

  let userRatings = {
    labels: userAttractionArr,
    datasets: [
      {
        label: "Rating",
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 2,
        data: userRatingArr,
      },
    ],
  };

  let overallRatings = {
    labels: attractionArr,
    datasets: [
      {
        label: "Rating",
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 2,
        data: ratingArr,
      },
    ],
  };

  return (
    <>
      <Nav />
      <div className="statsmain">
        <div className="overallbarchart">
          <Bar
            data={overallRatings}
            options={{
              title: {
                display: true,
                text: "Overall Attraction Ratings",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
        <div className="userbarchart">
          <Bar
            data={userRatings}
            options={{
              title: {
                display: true,
                text: "Your Attraction Ratings",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getAttractions })(Statistics);
