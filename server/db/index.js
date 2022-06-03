const mongoose = require('mongoose')
/*
    This initializes the connection to our database so that we can do CRUD.
    
    @author McKilla Gorilla
*/
mongoose
    .connect('mongodb://127.0.0.1:27017/top5lists', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db

