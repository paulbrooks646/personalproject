import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getAttractions} from '../ducks/attractionReducer'
import {Link} from 'react-router-dom'
import './components.scss'
import axios from 'axios'
import Nav from './Nav'


function Map(props) {

    useEffect(() => {
        axios.get('/api/attractions')
            .then(res => {
                props.getAttractions(res.data)
            })
    }, [props.getAttractions, props.user.user])

    const attractionsArray = props.attractions.attractions.map( (e, index) => {
        return <Link key={index} to={`/Attraction/${e.attraction_id}`}><h3 className={e.name}>{e.name}</h3></Link>
   })

    return (
        <>
            <Nav/>
        <div>
            <div className="disneyland">
            </div>
            <div className="container">{attractionsArray}</div>
            <h2 className='fantasy'>Fantasyland</h2>
            <h2 className="main">Main Street USA</h2>
            <h2 className='critter'>Critter Country</h2>
            <h2 className="new">New Orleans Square</h2>
            <h2 className="adventure">Adventureland</h2>
            <h2 className="frontier">Frontierland</h2>
            <h2 className="toon">Toon Town</h2>
            <h2 className="tomorrow">Tomorrowland</h2>
            </div>   
        </>    
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {getAttractions})(Map)