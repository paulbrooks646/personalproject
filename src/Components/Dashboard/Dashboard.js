import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getAttractions} from '../../ducks/attractionReducer'
import axios from 'axios'
import './Dashboard.css'

function Dashboard(props) {

    useEffect(() => {
        axios.get('/api/attractions')
        .then( res => {
            props.getAttractions(res.data)
        })
    }, [])

    const attractionsArray = props.attractions.attractions.map( (e, index) => {
         return <div><h2 key={index}>{e.name}</h2></div>
    })
    return (
        <div className="dashboard">{attractionsArray}</div>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {getAttractions})(Dashboard) 