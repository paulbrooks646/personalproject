import React from 'react'
import {connect} from 'react-redux'
import {getAttractions} from '../ducks/attractionReducer'
import {Link} from 'react-router-dom'
import './components.scss'


function Map(props) {

    const attractionsArray = props.attractions.attractions.map( (e, index) => {
        return <Link to={`/Attraction/${e.attraction_id}`}><h3 key={index} className={e.name}>{e.name}</h3></Link>
   })

    return (
        <div><div className="disneyland">
            </div><div className="container">{attractionsArray}</div></div>        
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {getAttractions})(Map)