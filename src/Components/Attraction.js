import React, {useEffect, useState} from 'react'
import "./components.scss"
import axios from 'axios'
import ScrollArea from 'react-scrollbar'
import {Link} from 'react-router-dom'

function Attraction(props) {

    const [attraction, setAttraction] = useState({})

    useEffect(() => {
        const {attraction_id} = props.match.params
        axios.get(`/api/attraction/${attraction_id}`)
        .then( res => {
            setAttraction(res.data)
        })
    }, [props.match.params])

    return (
        <div>
            { attraction.comments ?
            <div className="attractionmain"> 
                <div className={`attractioncard${attraction.location}`}>
                    <h1 className="attractionname">{attraction.name}</h1>
                    <p className="attractiondescription">{attraction.description}</p>
                    <img className="attractionphoto" src={attraction.photo} alt="Attraction"/>
                    <div className="attractionratingdiv">
                        <h3>Rating:</h3>
                        <h1 className="attractionrating">     {attraction.rating}</h1>
                    </div>            
                    <h3 className="attractionlocation">Location: {attraction.location}</h3>            
                    <ScrollArea
                        speed={.8}
                        className="scroll"
                        horizontal={false}>
                        {attraction.comments.map((e) => <h2>{e}</h2>)}
                    </ScrollArea>
                </div>
            </div>
            : null
            }
            <div className="statsbuttondiv" id="attractionstatsbuttondiv">
                <h2 className="statsbuttonlink">Click here to see:</h2>
                <Link to="/Statistics">
                    <button className="statsbutton">Attraction Statistics</button>
                </Link>
            </div>
        </div>
    )
}



export default Attraction