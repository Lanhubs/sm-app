const mongoose = require("mongoose")
const dotenv = require("dotenv")
const { DB_CONNECTION_URI } = require("../../cotroller/secrets/secrets")
require('dotenv').config()
// const mongoURI = process.env.DB_CONNECTION_URI


mongoose.connect( DB_CONNECTION_URI)
    .then(() => {
        console.log("database connected")
    })
    .catch(error => {
        if (error)
            console.log(error.reason)
    })


const schema = mongoose.Schema


module.exports = schema


