import React from 'react'
import {connect} from 'react-redux'
import {getAttractions} from '../ducks/attractionReducer'
import './components.scss'


function Map(props) {

    const attractionsArray = props.attractions.attractions.map( (e, index) => {
        return <div key={index} className={e.name} mapattraction><div className="mapattraction"><h3>{e.name}</h3></div></div>
   })

    return (
        <div><div className="disneyland">
            </div>{attractionsArray}
            </div>
            /* <div className="starwars"></div>
            <div className="toontown"></div>
            <div className="crittercountry"></div>
            <div className="lake"></div>
            <div className="frontierland"></div>
            <div className="fantasyland"></div>
            <div className="neworleanssquare"></div>
            <div className="adventureland"></div>
            <div className="mainstreet"></div>
            <div className="tomorrowland"></div> */
        
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {getAttractions})(Map)