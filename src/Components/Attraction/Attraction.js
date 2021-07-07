import React, {useEffect, useState} from 'react'
import "./Attraction.scss"
import axios from 'axios'
import ScrollArea from 'react-scrollbar'
import { Link } from 'react-router-dom'

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
                    <h1 className="attraction-name">{attraction.name}</h1>
                    <p className="attraction-description">{attraction.description}</p>
                    <img className="attraction-image" src={attraction.photo} alt="Attraction"/>
                    <div className="attractionratingdiv">
                        <h4 className="attraction-rating-subtitle">Rating:</h4>
                        <h1 className="attractionrating">     {attraction.rating}</h1>
                    </div>            
                    <h3 className="attraction-location">Location: {attraction.location}</h3>            
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
           
        </div>
    )
}



export default Attraction