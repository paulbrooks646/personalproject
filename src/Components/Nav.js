import React, {useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser, getUser} from '../ducks/userReducer'
import axios from 'axios'
import './components.scss'


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

    const pathname = props.location.pathname
    if (pathname === "/") {
    return (
        <div></div>
    )}

    else if (pathname === "/Map") {

        return (
            <div className="mapnav">
                <div className="buttons">
                   <Link to="/Dashboard">
                       <button>Trip Builder</button>
                   </Link>
                   <Link to="/Map">
                       <button>Disneyland Map</button>
                   </Link>
                   <Link to="/Survey">
                       <button>Survey</button>
                   </Link>
                    <button onClick={() => logout()}>Logout</button>
                </div>
            </div>            
        )}    
    
    else {

    return (
        <div className="navbar">
            <div className="imagediv">
                <img src="https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2019/05/ksjfhury85ui11.jpg" alt="Disneyland Castle" />
            </div>
            <div>
                <h3>Welcome {props.user.user.username}</h3>
            </div>
            <div className="linkdiv">
               <Link to="/Dashboard">
                   <button>Trip Builder</button>
               </Link>
               <Link to="/Map">
                   <button>Disneyland Map</button>
               </Link>
               <Link to="/Survey">
                   <button>Survey</button>
               </Link>
            </div>
            <div>
                <button onClick={() => logout()}>Logout</button>
            </div>
        </div>            
    )}}

const mapStateToProps = reduxState => reduxState

export default withRouter(connect(mapStateToProps, {logoutUser, getUser})(Nav))