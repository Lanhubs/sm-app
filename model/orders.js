const mongoose = require("mongoose")
const orderId  = require("order-id")

const schema = require("./db/dbConnection.js")

var orders = new schema({
    customerName: {
        type: String
    },
    itemName: {
        type: String
    },
    image: {
        type: String
    },
    email: {
        type: String
    },
    price: {
        type: String
    },
    quantity: {
        type: Number
    },
    address: {
        type: String
    },
    phoneNo: {
        type: String
    },
    OrderId: {
        type: String,
        unique: true
    },
    orderDate: {
        type: String,
        default: new Date().toDateString()
    },
    deliveryDate:{
        type: String,
        default: new Date(new Date().getTime()+(5*24*60*60*1000)).toDateString()
    },
    paymentReference:{
        type: String
    }
})

module.exports = mongoose.model("orders", orders)