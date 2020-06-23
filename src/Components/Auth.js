import React, {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {loginUser, registerUser} from '../ducks/userReducer';
import "./components.scss"

function Auth(props) {

const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [newUsername, setNewUsername] = useState("")
const [newPassword, setNewPassword] = useState("")
const [newEmail, setNewEmail] = useState("")

const login = () => {
    axios.post('/api/login', {username, password})
    .then( res => {
        props.loginUser(res.data)
        props.history.push('/Dashboard')
    })
    .catch (err => {alert('Username or password incorrect')})
}

const register = () => {
    console.log({newUsername, newPassword, newEmail})
    axios.post('/api/register', {newUsername, newPassword, newEmail})
    .then( res => {
        props.registerUser(res.data)
        props.history.push('/Dashboard')
    })
    .catch( err => { alert('Could not register')})
}

    return (
        <div className="authmain">
            <h1 className="authtitle">Disneyland Trip Planner</h1>
            <img className="authimage" src="https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2019/05/ksjfhury85ui11.jpg" alt="Disneyland Castle" />
            <h2 className="authh2">If you already have an account, login here:</h2>
            <div className="authinputdiv">
                <input
                    className="authinput" 
                    placeholder="username"
                    type="text"
                    value={username} 
                    onChange={e => setUsername(e.target.value)}/>
                <input
                    className="authinput" 
                    placeholder="password"
                    type="password"
                    value={password} 
                    onChange={e => setPassword(e.target.value)}/>
                <button className="authbutton" onClick={() => login()}>Login</button>
            </div>
            <h2 className="authh2">If you are new to Disneyland Trip Planner, register here:</h2>
            <div className="authinputdiv">
                <input
                    className="authinput" 
                    placeholder="username"
                    type="text"
                    value={newUsername} 
                    onChange={e => setNewUsername(e.target.value)}/>
                <input
                    className="authinput" 
                    placeholder="password"
                    type="password"
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)}/>
                <input
                    className="authinput" 
                    placeholder="email"
                    type="email"
                    value={newEmail} 
                    onChange={e => setNewEmail(e.target.value)}/>
                <button className="authbutton"onClick={() => register()} >Register</button>
            </div>
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

const mapDispatchToProps = {loginUser, registerUser}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)