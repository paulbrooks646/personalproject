import {createStore, applyMiddleware, combineReducers} from 'redux'
import reducer from './userReducer'
import attractionReducer from './attractionReducer'
import promiseMiddleware from 'redux-promise-middleware'

const rootReducer = combineReducers({
    user: reducer,
    attractions: attractionReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))