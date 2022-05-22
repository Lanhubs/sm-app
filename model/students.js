
const mongoose = require("mongoose")
const schema = require("./db/dbConnection.js")
const student = new schema({
    fullName: {
        type: String,
        required: true, 
    },
    courseName: {
        type: String,
    },
    gender: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        
    },
    phoneNo: {
        type: String,
        required: true, 
        unique: true
    },
    
})

const studentsModel = mongoose.model("students", student)
module.exports = studentsModel

