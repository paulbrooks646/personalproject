import React, {useState, useEffect} from 'react'



export default function CountdownTimer() {




const calculateTimeLeft = () => {
    const difference = +new Date("2020-11-12") - +new Date();

    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        };
    }
    return timeLeft;
};

const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

useEffect(() => {
    setTimeout(() => {
        setTimeLeft(calculateTimeLeft())
    }, 1000)
})


const timerComponents = []

Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
        return
    }

    timerComponents.push(
        <h1 key={"time"} className='counter'>
            {timeLeft[interval]}{""}
        </h1>
        
    )
})

return (
    <div>
        <h1 className="countertitle">Day's left until your trip:</h1>
        {timerComponents.length ? timerComponents : <span>Disneyland!!!</span>}
    </div>
)
}