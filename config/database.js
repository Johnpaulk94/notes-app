const mongoose = require('mongoose')

const setupDB = () => {
    // mongodb connection configuration - protocol 
    mongoose.connect('mongodb://localhost:27017/oct-notes-app', {useNewUrlParser: true, useUnifiedTopology: true} )
    .then(()=> {
        console.log('connected to db')
    })
    .catch((err)=> {
        console.log('error',err)
    })
}

module.exports = setupDB