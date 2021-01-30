import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAttractions } from "../ducks/attractionReducer";
import { Link } from "react-router-dom";
import "./components.scss";
import axios from "axios";
import Nav from "./Nav";

function Map(props) {
  useEffect(() => {
    axios.get("/api/attractions").then((res) => {
      props.getAttractions(res.data);
    });
  }, [props.getAttractions, props.user.user]);

  const adventureArray = props.attractions.attractions.map((e, index) => {
    if (e.location === "Adventureland") {
      return (
        <Link key={index} to={`/Attraction/${e.attraction_id}`}>
          <h3 className={e.name}>{e.name}</h3>
        </Link>
      );
    }
  });

  const critterArray = props.attractions.attractions.map((e, index) => {
    if (e.location === "Critter Country") {
      return (
        <Link key={index} to={`/Attraction/${e.attraction_id}`}>
          <h3 className={e.name}>{e.name}</h3>
        </Link>
      );
    }
  });

  const tomorrowArray = props.attractions.attractions.map((e, index) => {
    if (e.location === "Tomorrowland") {
      return (
        <Link key={index} to={`/Attraction/${e.attraction_id}`}>
          <h3 className={e.name}>{e.name}</h3>
        </Link>
      );
    }
  });

  const fantasyArray = props.attractions.attractions.map((e, index) => {
    if (e.location === "Fantasyland") {
      return (
        <Link key={index} to={`/Attraction/${e.attraction_id}`}>
          <h3 className={e.name}>{e.name}</h3>
        </Link>
      );
    }
  });

  const frontierArray = props.attractions.attractions.map((e, index) => {
    if (e.location === "Frontierland") {
      return (
        <Link key={index} to={`/Attraction/${e.attraction_id}`}>
          <h3 className={e.name}>{e.name}</h3>
        </Link>
      );
    }
  });

  const mainArray = props.attractions.attractions.map((e, index) => {
    if (e.location === "Main St. USA") {
      return (
        <Link key={index} to={`/Attraction/${e.attraction_id}`}>
          <h3 className={e.name}>{e.name}</h3>
        </Link>
      );
    }
  });

  const newArray = props.attractions.attractions.map((e, index) => {
    if (e.location === "New Orleans Square") {
      return (
        <Link key={index} to={`/Attraction/${e.attraction_id}`}>
          <h3 className={e.name}>{e.name}</h3>
        </Link>
      );
    }
  });

  const toonArray = props.attractions.attractions.map((e, index) => {
    if (e.location === "Toon Town") {
      return (
        <Link key={index} to={`/Attraction/${e.attraction_id}`}>
          <h3 className={e.name}>{e.name}</h3>
        </Link>
      );
    }
  });

  const attractionArray = props.attractions.attractions.map((e, index) => {
    return (
      <Link key={index} to={`/Attraction/${e.attraction_id}`}>
        <h3 className={`map${e.name}`}>{e.name}</h3>
      </Link>
    );
  });

  return (
    <>
      <Nav />
      <div className="map-main">
        <div className="disneyland">
          <div className="adventure-array">{adventureArray}</div>
          <div className="critter-array">{critterArray}</div>
          <div className="fantasy-array">{fantasyArray}</div>
          <div className="frontier-array">{frontierArray}</div>
          <div className="main-array">{mainArray}</div>
          <div className="new-array">{newArray}</div>
          <div className="tomorrow-array">{tomorrowArray}</div>
          <div className="toon-array">{toonArray}</div>
        </div>
      </div>
        <div className="land-div">
          <h2 className="adventure">Adventureland</h2>
          <h2 className="critter">Critter Country</h2>
          <h2 className="fantasy">Fantasyland</h2>
          <h2 className="frontier">Frontierland</h2>
          <h2 className="main">Main Street USA</h2>
          <h2 className="new">New Orleans Square</h2>
          <h2 className="tomorrow">Tomorrowland</h2>
          <h2 className="toon">Toon Town</h2>
          {attractionArray}
        </div>
    </>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getAttractions })(Map);
