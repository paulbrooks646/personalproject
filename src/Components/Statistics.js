import React, {useEffect, useState} from 'react'
import "./components.scss"
import axios from 'axios'
import {Bar, Pie, Donut, Line} from 'chart.js'


export default function Statistics() {

    let [ratings, setRatings] = useState([])
    let [sorted, setSorted] = useState([])

    useEffect(() => {
        getRatings()
    }, [])

    function getRatings() {
        axios.get('/api/ratings').then( res =>
            setRatings(res.data)
        )
    }

    ratings.map((e, index) => {
        
    })



console.log(ratings)
  

    return (
    
        <div>
    <div className="statsmain"><h1>Statistics</h1></div></div>)
}
