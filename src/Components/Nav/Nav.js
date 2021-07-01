import React, {useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { logoutUser, getUser } from '../../ducks/userReducer'
import Button from "@material-ui/core/Button";
import axios from 'axios'
import './Nav.scss'


function Nav(props) {
   
    useEffect(() => {
        getUser()
    }, [])

    const logout = () => {
    axios.delete('/api/logout')
    .then( () => {
        props.logoutUser()
        props.history.push('/')
    })}

    
    return (
      <div className="navbar">
        
        <div>
          <h3>Welcome {props.user.user.username}</h3>
        </div>
        <div className="linkdiv">
          <Link to="/Dashboard">
            <Button color="primary" variant="contained">
              Trip Builder
            </Button>
          </Link>
          <Link to="/Map">
            <Button color="primary" variant="contained">
              Disneyland Map
            </Button>
          </Link>
          <Link to="/Survey">
            <Button color="primary" variant="contained">
              Survey
            </Button>
          </Link>
        </div>
        <div>
          <Button onClick={() => logout()} color="secondary" variant="contained">
            Logout
          </Button>
        </div>
      </div>
    );}

const mapStateToProps = reduxState => reduxState

export default withRouter(connect(mapStateToProps, {logoutUser, getUser})(Nav))