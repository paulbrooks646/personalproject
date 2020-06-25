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


    // for (let i = 0; i<trips.length; i++) 
    const currentTrip = days.map((e, index) => {
        
        return (
    <div key={index}><Link to={`/Trip/${e.trip_id}`}><h1>Day {index+1}</h1></Link>{e.events.map((event) => <h3>{event}</h3>
        )}<button onClick={() => deleteDay(e.trip_id)}>Delete Day</button></div> )})

    const tripsList = trips.map( (e, index) => <Link to={`/Trip/${e.trip_id}`}><h5 key={index}>Day {index+1}</h5></Link>)

           


    return (

    <div className="dashboardmain"><div className="dashboardupper"><h1 className="dashboardtitle">Your Trip</h1><button className="dashboardbutton" onClick={() => newlist()}>Add a Day</button><h2>Click on a day to edit it.</h2><h2>{tripsList}</h2></div><div className="dashboardlist">{currentTrip}</div></div>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, { getAttractions })(Dashboard) 