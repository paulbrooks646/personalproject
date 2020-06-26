import React from "react"
import {Switch, Route} from 'react-router-dom'
import Attraction from './Components/Attraction.js'
import Auth from './Components/Auth.js'
import Dashboard from './Components/Dashboard.js'
import Map from './Components/Map.js'
import Survey from './Components/Survey.js'
import Trip from './Components/Trip.js'
import Statistics from './Components/Statistics.js'

export default (
    <Switch>
        <Route exact path="/" component={Auth}/>
        <Route path="/Attraction/:attraction_id" component={Attraction}/>
        <Route path="/Dashboard" component={Dashboard}/>
        <Route path="/Map" component={Map}/>
        <Route path="/Survey" component={Survey}/>
        <Route path="/Trip/:trip_id" component={Trip}/>
        <Route path="/Statistics" component={Statistics}/>
    </Switch>
)