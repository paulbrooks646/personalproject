import React, {useEffect, useState} from 'react'
import "./components.scss"
import axios from 'axios'

function Attraction(props) {

 

    const [attraction, setAttraction] = useState([])

    useEffect(() => {
        const {attraction_id} = props.match.params
        axios.get(`/api/attraction/${attraction_id}`)
        .then( res => {
            setAttraction(res.data)
        })
    }, [props.match.params])

const info = attraction.map((e, index) => {
    return (
    <div className={`attractioncard${e.location}`} key={index}><h1>{e.name}</h1><h1>Rating: {e.rating}</h1><h2>Location: {e.location}</h2><p>{e.comments}</p></div>
    )
})


    return (
        
        <div className="attractionmain">{info}</div>
    )
}



export default Attraction