import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { getAttractions } from '../../ducks/attractionReducer.js'
import "./Countdown.scss"


function Countdown(props) {

const calculateTimeLeft = () => {

    const difference = +new Date(props.user.user.date) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        };
    } else {
        timeLeft = {
            days: "???"
        }
    }
    return timeLeft;
};

const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

useEffect(() => {
    setTimeout(() => {
        setTimeLeft(calculateTimeLeft())
    }, 1000)
})

const timerComponents = []

Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
        return
    }

    timerComponents.push(
        <h1 key={"time"} className='counter'>
            {timeLeft[interval]}{""}
        </h1>
        
    )
})

return (
    <div className="countdown-div">
        <h1 className="countertitle">Days until your trip:</h1>
        {timerComponents.length ? timerComponents : <span></span>}
    </div>
)
}


const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, { getAttractions })(Countdown)