import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAttractions } from '../ducks/attractionReducer'
import axios from 'axios'
import './components.scss'
import { Link } from 'react-router-dom'
//import Trip from './Trip'

function Dashboard(props) {



    useEffect(() => {
        axios.get('/api/attractions')
            .then(res => {
                props.getAttractions(res.data)
            })

    }, [props.getAttractions])

    const [trips, setTrips] = useState([])

    useEffect(() => {

        getTrips();
    }, [])


    function getTrips() {
        console.log(props.user.user.id)
        const {id} = props.user.user
        console.log(id)
        axios.get(`/api/trips/${id}`)
            .then(res =>
                setTrips(res.data)
            )
    }

    function newlist(user_id) {
        axios.post('/api/trip', { user_id });
        getTrips()
    }

    function deleteDay(trip_id) {
        axios.delete(`/api/day/${trip_id}`)
        getTrips()
    }


    let i = 0
    const currentTrip = trips.map((e, index) => {
        i++
        return (
    <div key={e.trip_id}><Link to={`/Trip/${e.trip_id}`}><h1>Day {i}</h1></Link><button onClick={() => deleteDay(e.trip_id)}>Delete Day</button></div> )})

        


    return (

        <div className="dashboardmain"><div className="dashboardlist"><button className="dashboardbutton" onClick={() => newlist(props.user.user.id)}>Create a Trip</button></div><div className="triptrip">{currentTrip}</div></div>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, { getAttractions })(Dashboard) 