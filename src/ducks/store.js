import {createStore, applyMiddleware, combineReducers} from 'redux'
import userReducer from './userReducer'
import attractionReducer from './attractionReducer'
import promiseMiddleware from 'redux-promise-middleware'

const rootReducer = combineReducers({
    user: userReducer,
    attractions: attractionReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))