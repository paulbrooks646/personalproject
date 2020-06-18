import React from 'react'
import {connect} from 'react-redux'
import {getAttractions} from '../../ducks/attractionReducer'
import './Map.css'


function Map(props) {

    const attractionsArray = props.attractions.attractions.map( (e, index) => {
        return <div key={index} className="attraction"></div>
   })

    return (
        <div className="disneyland">
            {attractionsArray}

            {/* <div className="starwars"></div>
            <div className="toontown"></div>
            <div className="crittercountry"></div>
            <div className="lake"></div>
            <div className="frontierland"></div>
            <div className="fantasyland"></div>
            <div className="neworleanssquare"></div>
            <div className="adventureland"></div>
            <div className="mainstreet"></div>
            <div className="tomorrowland"></div> */}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, {getAttractions})(Map)