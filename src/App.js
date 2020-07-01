import React, {useEffect} from 'react';
import './App.scss';
import Routes from './routes.js'
import Nav from './Components/Nav.js'
import axios from 'axios';
import {loginUser} from './ducks/userReducer.js'
import {connect} from 'react-redux'

function App(props) {

useEffect(() => {
  axios.get('/api/user')
  .then(res => {
    props.loginUser(res.data)
  })
  .catch(err => console.log(err))
}, [])

  return (
    <div className="App">
      <div>
      <Nav/>
      </div>
      <div className="routes">
      {Routes}
      </div>
    </div>
  );
}
const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, {loginUser})(App)
