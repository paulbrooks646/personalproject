import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {getAttractions} from '../ducks/attractionReducer'
import axios from 'axios'
import './components.scss'
import {Link} from 'react-router-dom'
//import Trip from './Trip'

function Dashboard(props) {

    const [trips, setTrips] = useState("duck")
    

    useEffect(() => {
        getRides();
        getTrips();
    }, [])

    

function getRides() {
    axios.get('/api/attractions')
        .then( res => {
            props.getAttractions(res.data)
        })
}

function getTrips() {
    
    axios.get(`/api/trips/1`)
        .then( res => 
            setTrips([...trips, res.data])
            
        )
        console.log(trips)
}
    
    function newlist(user_id) {
        console.log(user_id)
        console.log(props.user.user.id)
        axios.post('/api/trip', {user_id}) ;
    }

    
    // const currentTrip = trips.map()

    const attractionsArray = props.attractions.attractions.map( (e, index) => {
         return <div className="dashboarddiv" key={index}><Link to={`/Attraction/${e.attraction_id}`}><h2 className="dashboardattraction">{e.name}</h2></Link><button className="dashboardbutton">Add to Trip</button></div>
    })
    return (

        <div className="dashboardmain"><div className="dashboard">{attractionsArray}</div><div className="dashboardlist"><button className="dashboardbutton" onClick={() => newlist(props.user.user.id)}>Create a Trip</button></div></div>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {getAttractions})(Dashboard) 