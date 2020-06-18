import React from "react"
import {Switch, Route} from 'react-router-dom'
import Attraction from './Components/Attraction/Attraction.js'
import Auth from './Components/Auth/Auth.js'
import Dashboard from './Components/Dashboard/Dashboard.js'
import Map from './Components/Map/Map.js'
import Survey from './Components/Survey/Survey.js'


export default (
    <Switch>
        <Route exact path="/" component={Auth}/>
        <Route path="/Attraction/:attraction-id" component={Attraction}/>
        <Route path="/Dashboard" component={Dashboard}/>
        <Route path="/Map" component={Map}/>
        <Route path="/Survey" component={Survey}/>
    </Switch>
)