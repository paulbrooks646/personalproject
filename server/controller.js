const bcrypt = require('bcrypt')

module.exports = {

    register: async (req, res) => {
        const db = req.app.get('db')
        const { newUsername, newPassword, newEmail} = req.body
        const existingUser = await db.check_user(newUsername)
        if(existingUser[0]) {
            return res.status(409).send("User already exists!")
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(newPassword, salt)
        
        const newUser = await db.register_user([newUsername, hash, newEmail])
        
        req.session.user = {
            id: newUser[0].user_id,
            username: newUser[0].username,
            email: newUser[0].email
        }
        res.status(200).send(req.session.user)
        },

        login: async (req, res) => {
            const db = req.app.get('db')
            const {username, password} = req.body
            const user = await db.check_user(username)
            
            if (!user[0]) {
                return res.status(404).send("User doesn't exist!")}
                else { const authenticated = bcrypt.compareSync(password, user[0].password)
                if (authenticated) {
                    req.session.user = {
                        id: user[0].user_id,
                        username: user[0].username,
                        email: user[0].email
                    }
                    res.status(200).send(req.session.user)}
                    else {
                        res.status(403).send("Username or password incorrect!")
                    }}},

        retrieveAttractions: (req, res) => {
            const db = req.app.get('db')

            db.get_attractions()
            .then( attractions => res.status(200).send(attractions))
        },

        retrieveAttraction: (req, res) => {
            const db = req.app.get('db')
            const {id} = req.params

            db.get_attraction(id)
            .then ( attraction => res.status(200).send(attraction))            
        },

        logout: async (req, res) => {
            req.session.destroy()
            res.sendStatus(200)
        },

        getUser: (req, res) => {
            if (req.session.user) {
                res.status(200).send(req.session.user)
            } else {
                res.sendStatus(404)}
            },

        newSurvey: (req, res) => {
            const db = req.app.get('db')
            const {attraction_id, user_id, rating, comments} = req.body

            db.new_survey([attraction_id, user_id, rating, comments])
            .then( () => res.sendStatus(200))
            },

        editSurvey: (req, res) => {
            const db = req.app.get('db')
            const {id} = req.params
            const {attraction_id, rating, comments} = req.body

            db.edit_survey(id, attraction_id, rating, comments)
            .then( () => res.sendStatus(200))
        },

        retrieveTrips: (req, res) => {
            const db = req.app.get('db')
            const {id} = req.params

            db.get_trips(id)
            .then( trip => res.status(200).send(trip))
        },

        addTrip: (req, res) => {
            const db = req.app.get('db')
            const {user_id} = req.body

            db.add_trip(user_id)
            .then(res.sendStatus(200))
        },

        addEvent: (req, res) => {
            const db = req.app.get('db')
            const {trip_id, attraction_id} = req.body

            db.add_event([trip_id, attraction_id])
                .then(res.sendStatus(200))
        },

        getTrip: (req, res) => {
            const db = req.app.get('db')
            const {id} = req.params
            
            db.get_trip([id])
            .then(trip => res.status(200).send(trip))

        },

        deleteFromTrip: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.remove_attraction(id)
        .then( () => res.sendStatus(200))
        }         
}