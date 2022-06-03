/*
    This is our back-end server, which employs some middleware
    to make sure data is received in the proper format (i.e. JSON)
    and hooks up all of our pieces.
    
    @author McKilla Gorilla
*/

// THESE ARE NODE APIs WE WISH TO USE
const express = require('express')
const cors = require('cors')

// CREATE OUR SERVER
const app = express()    //app is our express object
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const top5listRouter = require('./routes/top5lists-router')
app.use('/api', top5listRouter)

// INITIALIZE OUR DATABASE OBJECT
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// PUT THE SERVER IN LISTENING MODE
const apiPort = 4000
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))


