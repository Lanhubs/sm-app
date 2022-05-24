const mongoose = require("mongoose")
const dotenv = require("dotenv")
require('dotenv').config()
const mongoURI = process.env.DB_CONNECTION_URI


mongoose.connect("mongodb+srv://olanrewaju:habeeb2001@metechdb.qjtgb.mongodb.net/mydb?retryWrites=true&w=majority")
    .then(() => {
        console.log("database connected")
    })
    .catch(error => {
        if (error)
            console.log(error.reason)
    })


const schema = mongoose.Schema


module.exports = schema


