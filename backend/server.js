require('dotenv').config()
const express = require('express')
const mongoose = require ('mongoose')
const workOut = require('./routes/workout')

const app = express()

app.use(express.json())

app.use((req, res, next) => {

    console.log(req.path, req.method)
    next()

})

app.use('/api/worouts',workOut)

mongoose.connect('mongodb://127.0.0.1:27017/nodetut')
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("port listen at", process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })




