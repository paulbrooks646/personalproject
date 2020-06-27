import React, {useState} from 'react'
import {connect} from 'react-redux'
import {getAttractions} from '../ducks/attractionReducer'
import './components.scss'
import axios from 'axios'
import {Link} from 'react-router-dom'




function Survey(props) {

const [survey, setSurvey] = useState({'Alice in Wonderland': {rating: 0, comments: ""}})

function handleChange(attractionName) {
    return (e) => setSurvey({...survey, [attractionName]: {...survey[attractionName], [e.target.name]: e.target.value}}) 

}
function submitSurvey(attraction_id, user_id, survey, name){
    const {rating, comments} = survey
    axios.put(`/api/survey`, {attraction_id, user_id, rating, comments}).then(() => 
    alert(`Thanks for you input on ${name}!`))
}

    const attractionsArray = props.attractions.attractions.map( (e, index) => {
    return (
    <div key={index} className="radio">
        <div>
            <h3 className={`trip${e.name}`}>{e.name}</h3>
        </div>
        <div>
            <label>1</label>
            <input type="radio" name='rating' value="1" onClick={handleChange(e.name)}/>
            <label>2</label>
            <input type="radio" name='rating' value="2" onClick={handleChange(e.name)}/>
            <label>3</label>
            <input type="radio" name='rating' value="3" onClick={handleChange(e.name)}/>
            <label>4</label>
            <input type="radio" name='rating' value="4" onClick={handleChange(e.name)}/>
            <label>5</label>
            <input type="radio" name='rating' value="5" onClick={handleChange(e.name)}/>
            <label>6</label>
            <input type="radio" name='rating' value="6" onClick={handleChange(e.name)}/>
            <label>7</label>
            <input type="radio" name='rating' value="7" onClick={handleChange(e.name)}/>
            <label>8</label>
            <input type="radio" name='rating' value="8" onClick={handleChange(e.name)}/>
            <label>9</label>
            <input type="radio" name='rating' value="9" onClick={handleChange(e.name)}/>
            <label>10</label>
            <input type="radio" name='rating' value="10" onClick={handleChange(e.name)}/>
        </div>
        <div>
            <input 
                className="surveycomments" placeholder="comments" 
                name="comments"
                onChange={handleChange(e.name)}></input>
        </div> 
        <div>
            <button className="surveybutton" onClick={() => submitSurvey(e.attraction_id, props.user.user.id, survey[e.name], e.name)}>Submit</button>
        </div>
    </div>)
   })   

    return (
        <div className="surveybody">
            <div>
            
                    <h1 className="surveytitle">Disneyland Attraction Survey</h1>
                
                <h2 className="surveydescription">We strive to give our users the most accurate information. We would appreciate your input on any or all rides. If you have already given feedback but would like to change your opinion, simply submit again.</h2>
                </div>
                
        
        <div className="surveyarray">{attractionsArray}</div>
        <div className="statsbuttondiv">
            <h2 className="statsbuttonlink">Click here to see:</h2>
            <Link to="/Statistics">
                <button className="statsbutton">Attraction Statistics</button>
            </Link>
        </div>

        </div>
    
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {getAttractions})(Survey)