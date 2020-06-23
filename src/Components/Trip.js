import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAttractions } from '../ducks/attractionReducer'
import axios from 'axios'
import './components.scss'
import { Link } from 'react-router-dom'
//import Trip from './Trip'

function Dashboard(props) {

    const [trip, setTrip] = useState([])

    useEffect(() => {
        axios.get('/api/attractions')
            .then(res => {
                props.getAttractions(res.data)
            })

        getTrip();
    }, [props.getAttractions])


    function getTrip() {
       axios.get(`/api/trip/${props.match.params.trip_id}`)
       .then(res =>
        setTrip(res.data)) 
    }

   function newEvent(trip_id, attraction_id, user_id) {
       console.log(trip_id, attraction_id, user_id)
        axios.post('/api/event', {trip_id, attraction_id, user_id})
        getTrip()
        }

    function removeFromTrip(id) {
        axios.delete(`/api/trip/${id}`)
        getTrip()
    }
    
const tripArray = trip.map((e) => <div><h1>{e.name}</h1><button onClick={() => removeFromTrip(e.event_id)}>Remove From Trip</button></div>)



    const attractionsArray = props.attractions.attractions.map((e, index) => {
        return <div className="dashboarddiv" key={index}><Link to={`/Attraction/${e.attraction_id}`}><h2 className="dashboardattraction">{e.name}</h2></Link><button className="dashboardbutton" onClick={() => newEvent(props.match.params.trip_id, e.attraction_id, props.user.user.id)}>Add to Trip</button></div>
    })
    return (

        <div className="dashboardmain"><div className="dashboard">{attractionsArray}</div><div className="triptrip">{tripArray}</div></div>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, { getAttractions })(Dashboard) 