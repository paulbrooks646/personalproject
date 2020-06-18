import React from 'react'
import {connect} from 'react-redux'
import {getAttractions} from '../../ducks/attractionReducer'
import './Survey.css'



function Survey(props) {


    const attractionsArray = props.attractions.attractions.map( (e, index) => {
    return (
    <div>
        <h2 key={index}>{e.name}</h2>
        <label>1</label>
        <input type="radio" name={index} value="1"/>
        <label>2</label>
        <input type="radio" name={index} value="2"/>
        <label>3</label>
        <input type="radio" name={index} value="3"/>
        <label>4</label>
        <input type="radio" name={index} value="4"/>
        <label>5</label>
        <input type="radio" name={index} value="5"/>
        <label>6</label>
        <input type="radio" name={index} value="6"/>
        <label>7</label>
        <input type="radio" name={index} value="7"/>
        <label>8</label>
        <input type="radio" name={index} value="8"/>
        <label>9</label>
        <input type="radio" name={index} value="9"/>
        <label>10</label>
        <input type="radio" name={index} value="10"/>
        <label>Haven't tried it.</label>
        <input type="radio" name={index} value="null" />
        
    </div>)
   })   

    return (
        <div>{attractionsArray}</div>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {getAttractions})(Survey)