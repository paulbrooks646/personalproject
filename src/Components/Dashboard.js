import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAttractions } from '../ducks/attractionReducer'
import axios from 'axios'
import './components.scss'
import { Link } from 'react-router-dom'


function Dashboard(props) {



    useEffect(() => {
        axios.get('/api/attractions')
            .then(res => {
                props.getAttractions(res.data)
            })
            getTrips()
            getDays()
    }, [props.getAttractions])

    const [trips, setTrips] = useState([])
    const [days, setDays] = useState([])


    function getDays() {
        const {id} = props.user.user
        axios.get(`/api/days/${id}`)
        .then(res =>
            setDays(res.data)
        )
    }

    function getTrips() {  
        const {id} = props.user.user
        axios.get(`/api/trips/${id}`)
            .then(res =>
                setTrips(res.data)
            )
    }

    function newlist() {
        const {id} = props.user.user
        axios.post('/api/trip', { id });
        getDays()
        getTrips()
    }

    function deleteDay(trip_id) {
        axios.delete(`/api/day/${trip_id}`)
        getDays()
        getTrips()
    }

    const currentTrip = days.map((e, index) => {
        
        return (
    <div key={e.name}><Link to={`/Trip/${e.trip_id}`}><h1>Day {index+1}</h1></Link>{e.events.map((event) => <h3 className="dashboardattraction">{event}</h3>
        )}<button className="dashboarddelete" onClick={() => deleteDay(e.trip_id)}>Delete Day</button></div> )})

    const tripsList = trips.map( (e, index) => <Link to={`/Trip/${e.trip_id}`} key={index}><h6>Day {index+1}</h6></Link>)

           


    return (

    <div className="dashboardmain">
        <h1 className="dashboardtitle">Plan Your Trip</h1>
        <div className="dashboarddays">
            <h6>Click a day to edit</h6>
            <h6 className="dashboardtest">{tripsList}</h6>
            <h6>or</h6>
            <button 
                className="dashboardbutton" onClick={() => newlist()}>Add Day to Trip
            </button>
        </div>
        <h2 className="dashboardsofar">Your trip so far:</h2>
    <div className="dashboardlist">{currentTrip}</div>
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
export default connect(mapStateToProps, { getAttractions })(Dashboard) 