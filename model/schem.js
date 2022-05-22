const schema =require("./db/dbConnection.js")
const mongoose =require("mongoose")
const message = new schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    }
})
module.exports = mongoose.model("productList", createProducts)