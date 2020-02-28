
const mongoose = require('mongoose')

const Schema = mongoose.Schema

//const Category = require('./category')

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
})

//model - a fancy constructor
const Note = mongoose.model('Note',noteSchema)

module.exports = Note