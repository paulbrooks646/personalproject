import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAttractions } from "../../ducks/attractionReducer";
import "./Survey.scss";
import axios from "axios";

function Survey(props) {
  useEffect(() => {
    axios.get("/api/attractions").then((res) => {
      props.getAttractions(res.data);
    });
  }, [props]);

  const [survey, setSurvey] = useState({
    "Alice in Wonderland": { rating: 0, comments: "" },
  });

  function handleChange(attractionName) {
    return (e) =>
      setSurvey({
        ...survey,
        [attractionName]: {
          ...survey[attractionName],
          [e.target.name]: e.target.value,
        },
      });
  }
  function submitSurvey(attraction_id, user_id, survey, name) {
    const { rating, comments } = survey;
    axios
      .put(`/api/survey`, { attraction_id, user_id, rating, comments })
      .then(() => alert(`Thanks for you input on ${name}!`));
  }

  const attractionsArray = props.attractions.attractions.map((e, index) => {
    return (
      <div key={index} className="radio">
        <div>
          <h3 className={`trip${e.name}`}>{e.name}</h3>
        </div>
        <div>
          <label>1</label>
          <input
            type="radio"
            name="rating"
            value="1"
            onClick={handleChange(e.name)}
          />
          <label>2</label>
          <input
            type="radio"
            name="rating"
            value="2"
            onClick={handleChange(e.name)}
          />
          <label>3</label>
          <input
            type="radio"
            name="rating"
            value="3"
            onClick={handleChange(e.name)}
          />
          <label>4</label>
          <input
            type="radio"
            name="rating"
            value="4"
            onClick={handleChange(e.name)}
          />
          <label>5</label>
          <input
            type="radio"
            name="rating"
            value="5"
            onClick={handleChange(e.name)}
          />
          <label>6</label>
          <input
            type="radio"
            name="rating"
            value="6"
            onClick={handleChange(e.name)}
          />
          <label>7</label>
          <input
            type="radio"
            name="rating"
            value="7"
            onClick={handleChange(e.name)}
          />
          <label>8</label>
          <input
            type="radio"
            name="rating"
            value="8"
            onClick={handleChange(e.name)}
          />
          <label>9</label>
          <input
            type="radio"
            name="rating"
            value="9"
            onClick={handleChange(e.name)}
          />
          <label>10</label>
          <input
            type="radio"
            name="rating"
            value="10"
            onClick={handleChange(e.name)}
          />
        </div>
        <div>
          <input
            className="surveycomments"
            placeholder="comments"
            name="comments"
            onChange={handleChange(e.name)}
          ></input>
        </div>
        <div>
          <button
            onClick={() =>
              submitSurvey(
                e.attraction_id,
                props.user.user.id,
                survey[e.name],
                e.name
              )
            }
          >
            Submit
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="surveymain">
        {/* <div className="survey-introduction">
          <h1>Disneyland Attraction Survey</h1>
          <h2>
            We strive to give our users the most accurate information. We would
            appreciate your input on any or all rides. If you have already given
            feedback but would like to change your opinion, simply submit again.
          </h2>
        </div>
        <div className="surveyarray">{attractionsArray}</div> */}
        <div className="turtle">
          <div className="michaelangelo">
            <div className="turtle-eye">
              <div className="turtle-pupil"></div>
            </div>
            <div className="turtle-eye">
              <div className="turtle-pupil"></div>
            </div>
          </div>

          <div className="turtle-mouth"></div>
        </div>
        <div className="turtle">
          <div className="donatello">
            <div className="turtle-eye">
              <div className="turtle-pupil"></div>
            </div>
            <div className="turtle-eye">
              <div className="turtle-pupil"></div>
            </div>
          </div>

          <div className="turtle-mouth"></div>
        </div>
        <div className="turtle">
          <div className="raphael">
            <div className="turtle-eye">
              <div className="turtle-pupil"></div>
            </div>
            <div className="turtle-eye">
              <div className="turtle-pupil"></div>
            </div>
          </div>

          <div className="turtle-mouth"></div>
        </div>
        <div className="turtle">
          <div className="leonardo">
            <div className="turtle-eye">
              <div className="turtle-pupil"></div>
            </div>
            <div className="turtle-eye">
              <div className="turtle-pupil"></div>
            </div>
          </div>

          <div className="turtle-mouth"></div>
        </div>
        <div className="lily">
          <div className="lily-head">
            <div className="lily-hair-left"></div>
            <div className="lily-face">
              <div className="lily-eyes">
                <div className="lily-eye">
                  <div className="lily-iris">
                    <div className="lily-pupil"></div>
                  </div>
                </div>
                <div className="lily-eye">
                  <div className="lily-iris">
                    <div className="lily-pupil"></div>
                  </div>
                </div>
              </div>
              <div className="lily-nose"></div>
              <div className="lily-mouth"></div>
            </div>
            <div className="lily-hair-right"></div>
          </div>
          <div className="lily-body"></div>
          <div className="lily-legs"></div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (reduxState) => reduxState;
export default connect(mapStateToProps, { getAttractions })(Survey);
