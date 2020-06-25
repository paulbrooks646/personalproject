import React, {useEffect, useState} from 'react'
import "./components.scss"
import axios from 'axios'
import ScrollArea from 'react-scrollbar'

function Attraction(props) {

 

    const [attraction, setAttraction] = useState({})

    useEffect(() => {
        const {attraction_id} = props.match.params
        axios.get(`/api/attraction/${attraction_id}`)
        .then( res => {
            setAttraction(res.data)
        })
    }, [props.match.params])

// const info = attraction.map((e, index) => {
//     return (
//     <div className={`attractioncard${e.location}`} key={index}><h1>{e.name}</h1><h1>Rating: {e.rating}</h1><h2>Location: {e.location}</h2><p>{e.comments}</p></div>
//     )
// })

console.log(attraction)
    return (
        <>
        { attraction.comments ?
        <div className="attractionmain"> 
        <div className={`attractioncard${attraction.location}`}>
            <h1>{attraction.name}</h1>
            <h2>Rating: {attraction.rating}</h2>
            <h2>{attraction.location}</h2>
            <ScrollArea
            speed={.8}
            className="scroll"
            horizontal={false}>
            {attraction.comments.map((e) => <h1>{e}</h1>)}
            </ScrollArea>
        </div>
        </div>
        : null
        }
        </>
    )
}



export default Attraction