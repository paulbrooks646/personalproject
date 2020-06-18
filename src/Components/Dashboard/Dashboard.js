import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getAttractions} from '../../ducks/attractionReducer'
import axios from 'axios'

function Dashboard(props) {

    useEffect(() => {
        axios.get('/api/attractions')
        .then( res => {
            props.getAttractions(res.data)
        })
    }, [])

    const attractionsArray = props.attractions.attractions.map( (e, index) => {
         return <h2 key={index}>{e.name}</h2>
    })
    return (
        <div>{attractionsArray}</div>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {getAttractions})(Dashboard) 