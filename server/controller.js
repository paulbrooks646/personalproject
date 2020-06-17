const bcrypt = require('bcrypt')

module.exports = {

    register: async (req, res) => {
        const db = req.app.get('db')
        const { username, password, email} = req.body
        
        const existingUser = await db.check_user(username)
        if(existingUser[0]) {
            return res.status(409).send("User already exists!")
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        
        const newUser = await db.register_user([username, hash, email])
        
        req.session.user = {
            id: newUser[0].id,
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
                        id: user[0].id,
                        username: user[0].id,
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
            const {newArray} = req.body

            db.new_survey([...newArray])
            .then( () => res.sendStatus(200))
            },

        editSurvey: (req, res) => {
            const db = req.app.get('db')
            const {id} = req.params
            const {newArray} = req.body

            db.edit_survey([...newArray], id)
            .then( () => res.sendStatus(200))
        },

        retrieveTrip: (req, res) => {
            const db = req.app.get('db')
            const {tripId} = req.body

            db.get_trip(tripId)
            .then( trip => res.status(200).send(trip))
        },

        addToTrip: (req, res) => {
            const db = req.app.get('db')
            const {tripId, userId, attraction_id} = req.body

            db.add_to_trip([tripId, userId, attraction_id])
            .then(res.sendStatus(200))
        },

        deleteFromTrip: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.remove_attraction(id)
        .then( () => res.sendStatus(200))
        }         
}