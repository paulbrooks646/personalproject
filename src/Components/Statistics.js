import React, {useEffect, useState} from 'react'
import "./components.scss"
import axios from 'axios'
import {Bar, Pie, Donut, Line} from 'react-chartjs-2'


export default function Statistics() {

    const [ratings, setRatings] = useState([])
    

    useEffect(() => {
        getRatings()
    }, [])

    function getRatings() {
        axios.get('/api/ratings').then( res =>
            setRatings(res.data)
        )
    }
    console.log(ratings)
    // let first = ratings[0].name
    let pig = {
        
        labels: ['first', "cow", "duck"],
        datasets: [
            {
                label: "animals",
                backgroundColor: "blue",
                borderColor: "black",
                borderWidth: 2,
                data: [5, 3, 7]
            }
        ]
    }

    return (
    
        <div>
            <Bar
                data={pig}
                options={{
                    title:{
                        display: true,
                        text: "animals",
                        fontSize: 20
                    },
                    legend:{
                        display:true,
                        position:"right"
                    }
                }}
                />
        </div>)
}
