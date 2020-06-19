import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getAttractions} from '../ducks/attractionReducer'
import axios from 'axios'
import './components.scss'
import {Link} from 'react-router-dom'

function Dashboard(props) {

    useEffect(() => {
        axios.get('/api/attractions')
        .then( res => {
            props.getAttractions(res.data)
        })
    }, [])

    const attractionsArray = props.attractions.attractions.map( (e, index) => {
         return <div className="dashboarddiv" key={index}><Link to={`/Attraction/${e.attraction_id}`}><h2>{e.name}</h2></Link><button className="dashboardbutton">Add to Trip</button></div>
    })
    return (
        <div className="dashboard">{attractionsArray}</div>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {getAttractions})(Dashboard) 