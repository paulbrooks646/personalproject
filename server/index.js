require("dotenv").config()
const express = require("express")
const massive = require("massive")
const session = require("express-session")
const controller = require("./controller.js")
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

const app = express()
app.use(express.static(`${__dirname}/../build`))

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},
    secret: SESSION_SECRET
}))

app.post('/api/register', controller.register)
app.post('/api/login', controller.login)
app.get('/api/attractions', controller.retrieveAttractions)
app.get('/api/attraction/:id', controller.retrieveAttraction)
app.delete('/api/logout', controller.logout)
app.get('/api/user', controller.getUser)
app.put('/api/survey', controller.editRating)
app.get('/api/trips/:id', controller.retrieveTrips)
app.get('/api/trip/:id', controller.getTrip)
app.post('/api/trip', controller.addTrip)
app.post('/api/event', controller.addEvent)
app.delete('/api/trip/:id', controller.deleteFromTrip)
app.delete('/api/day/:id', controller.deleteDay)
app.get('/api/days/:id', controller.getDays)
app.get('/api/ratings', controller.getRatings)
app.get('/api/ratings/:id', controller.getUserRatings)
app.put('/api/date/:id', controller.tripDate)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then( db => {
    app.set("db", db)
    console.log('I eat db connections for breakfast!')
    app.listen(SERVER_PORT, () => console.log(`I'm port ${SERVER_PORT}, I'll improvise.`))
}).catch(err => console.log(err))



