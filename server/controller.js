const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

function main(email, username) {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {

            user: 'micksamize@gmail.com',
            pass: 'Weaselicious77@'
        },
        tls: {
            rejectUnauthorized: false
        }
    })


    const mailOptions = {
        from: '"micksamize" <micksamize@gmail.com>',
        to: email,
        subject: 'Welcome to Disneyland trip planner!',
        text: 'This is our first message with Nodemailer ;)',
        html: `<body style="text-align: center;background-color:#ffff66">
        <h1 style="color: blue;">Welcome ${username}!</h1>
          <img style="background-color: transparent;width:200px;position:relative;top:10px;" src="https://img.pngio.com/filemickey-mouse-head-and-earspng-wikimedia-commons-mickey-head-transparent-background-450_371.png"/>
        <h2 style="color:green; position:relative;top:0px;">Thank you for joining Disneyland Trip Planner!</h2>
        <h3 style="color:red;position:relative;top:0px;">So you have decided to go to Disneyland? Great decision! We look forward to helping you make the most of your trip!</h3>
        <img src="https://cdn1.parksmedia.wdprapps.disney.com/media/blog/wp-content/uploads/2019/05/ksjfhury85ui11.jpg" style="width:200px;height:200px; position:relative;top:30px;"/>
         </body>`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)

        } else {
            console.log('email sent:' + info.response)
        }
    });
}

module.exports = {

    register: async (req, res) => {
        const db = req.app.get('db')
        const { newUsername, newPassword, newEmail } = req.body
        const existingUser = await db.check_user(newUsername)
        if (existingUser[0]) {
            return res.status(409).send("User already exists!")
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(newPassword, salt)

        const newUser = await db.register_user([newUsername, hash, newEmail])

        req.session.user = {
            id: newUser[0].user_id,
            username: newUser[0].username,
            email: newUser[0].email,
            date: user[0].trip_date
        }
        res.status(200).send(req.session.user);
        main(newEmail, newUsername)
    },

    login: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body
        const user = await db.check_user(username)

        if (!user[0]) {
            return res.status(404).send("User doesn't exist!")
        }
        else {
            const authenticated = bcrypt.compareSync(password, user[0].password)
            if (authenticated) {
                req.session.user = {
                    id: user[0].user_id,
                    username: user[0].username,
                    email: user[0].email,
                    date: user[0].trip_date
                }
                res.status(200).send(req.session.user)
            }
            else {
                res.status(403).send("Username or password incorrect!")
            }
        }

    },

    retrieveAttractions: (req, res) => {
        const db = req.app.get('db')

        db.get_attractions()
            .then(attractions => res.status(200).send(attractions))
    },

    retrieveAttraction: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        db.get_attraction(id)
            .then(attraction => {
                let total = 0
                let combined = { name: attraction[0].name, location: attraction[0].location, description: attraction[0].description, photo: attraction[0].photo, comments: [] }
                attraction.forEach(element => {
                    total += element.rating
                    combined.comments.push(element.comments)
                });
                combined.rating = (total / attraction.length).toFixed(1)
                res.status(200).send(combined)
            })
    },

    logout: async (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    getUser: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    },

    editRating: async (req, res) => {
        const db = req.app.get('db')
        const { attraction_id, user_id, rating, comments } = req.body

        const existingRating = await db.check_rating([user_id, attraction_id])

        if (existingRating[0]) {

            db.edit_survey([user_id, attraction_id, rating, comments]).then(() => res.sendStatus(200))
        }
        else {

            db.new_survey([attraction_id, user_id, rating, comments])
                .then(() => res.sendStatus(200))
        }
    },

    retrieveTrips: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        db.get_trips(id)
            .then(trip => res.status(200).send(trip))
    },

    addTrip: (req, res) => {
        const db = req.app.get('db')
        console.log(req.body)
        const { id } = req.body

        db.add_trip(id)
            .then(res.sendStatus(200))
    },

    addEvent: (req, res) => {
        const db = req.app.get('db')
        const { trip_id, attraction_id, user_id } = req.body

        db.add_event([trip_id, attraction_id, user_id])
            .then(res.sendStatus(200))
    },

    getTrip: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        db.get_trip([id])
            .then(trip => res.status(200).send(trip))

    },

    deleteFromTrip: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        db.remove_attraction(id)
            .then(() => res.sendStatus(200))
    },

    deleteDay: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        db.delete_day(id)
            .then(() =>
                res.sendStatus(200)
            )
    },

    getDays: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        db.get_days([id])
            .then(events => {
                const formattedEvents = events.reduce((acc, curr) => {
                    const index = acc.findIndex(e => {
                        return e.trip_id === curr.trip_id
                    })
                    if (index === -1) {
                        acc.push({ trip_id: curr.trip_id, events: [curr.name] })
                    }
                    else {
                        acc[index].events.push(curr.name)
                    }
                    return acc
                }, [])
                res.status(200).send(formattedEvents)
            })

    },

    getRatings: (req, res) => {
        const db = req.app.get('db')

        db.get_ratings()
            .then(ratings => {
                let newArr = []

                for (let i = 1; i < ratings.length; i++) {
                  let total = 0
                  let avg = 0
                  let combined = { 
                    name: ratings[i].name, 
                    location: ratings[i].location, 
                    comments: [] 
                  }
                  
                    ratings.forEach(element => {
                      if (ratings[i].name === element.name) {
                        avg +=1
                        total += element.rating
                        combined.comments.push(element.comments)
                      }
                  });
            
                combined.rating = (total / avg).toFixed(1)
            
                newArr.push(combined)
              }
            
              for (let i = 0; i < newArr.length; i++) {
                 
                  for (let j = newArr.length-1; j > i; j--) {
                      
                    if (newArr[i].name === newArr[j].name) {
                        newArr.splice(j, 1)
                    }
                  }
              }
              newArr.sort((a,b) => (a.rating.length > b.rating.length) ? -1 : (a.rating < b.rating ? 1 : -1))
              res.status(200).send(newArr)
            })
            },

            getUserRatings: (req, res) => {
                const db = req.app.get('db')
                const { id } = req.params
        
                db.get_user_ratings(id)
                    .then(ratings => {
                        ratings.sort((a,b) => (a.rating.length > b.rating.length) ? -1 : (a.rating < b.rating ? 1 : -1))
                        res.status(200).send(ratings)})
            },

            tripDate: async (req, res) => {
                const db = req.app.get('db')
                console.log(req.params)
                console.log(req.body)
                const {id} = req.params
                const {date} = req.body

                db.edit_trip_date([id, date])
                .then(user => {
                    req.session.user = {
                        id: user[0].user_id,
                        username: user[0].username,
                        email: user[0].email,
                        date: user[0].trip_date
                    }
                    res.sendStatus(200)})
                
            }
        }