import React from "react"
import {Switch, Route} from 'react-router-dom'
import Attraction from './Components/Attraction/Attraction'
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'
import Map from './Components/Map/Map'
import Survey from './Components/Survey/Survey'
import Trip from './Components/Trip/Trip'
import Statistics from './Components/Statistics/Statistics'

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