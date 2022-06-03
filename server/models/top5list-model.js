const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('top5list', top5ListSchema)
