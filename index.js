const express = require('express')
const setupDB = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')
const app = express()
const port = 3015

app.use(express.json())
app.use(cors())
setupDB()

app.get('/', (req,res)=>{
    //res.send('Welcome to Notes-App')
    res.json({
        notice: 'Welcome to Notes App'
    })
})

app.use('/',router)
app.listen(port,()=> {
    console.log('listening on port',port)
})