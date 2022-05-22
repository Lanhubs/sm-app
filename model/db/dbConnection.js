const mongoose = require("mongoose")
const dotenv = require("dotenv")
require('dotenv').config()
const mongoURI = process.env.DB_CONNECTION_URI


mongoose.connect(process.env.DB_CONNECTION_URI)
    .then(() => {
        console.log("database connected")
    })
    .catch(error => {
        if (error)
            console.log(error.reason)
    })


const schema = mongoose.Schema


module.exports = schema


