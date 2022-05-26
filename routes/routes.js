
const express = require("express")

const { AuthenticateUser, checkUser } = require("../middlewares/userAuth.js")
const ordersModel = require("../model/orders.js")
const studentsModel = require("../model/students")
const route = express.Router()
const { foodProduct, electronicProducts, images
} = require('./data/productDetails.js')
const electronics = electronicProducts
const Foods = foodProduct
const { kitchen, computerClasses } = require("./data/servicesDetails")
const Images = images
const { contactUsController } = require("../cotroller/contactusController")
const { ordersController } = require("../cotroller/orderPageController.js")
const orderId = require("order-id")
const studentRegisterController = require("../cotroller/studentRegisterController.js")
require('dotenv').config()


/* GET home page. */
route.get("/", (req, res) => {
  res.render("index")


})
route.get("/home", AuthenticateUser, checkUser, (req, res) => {
  try {
    const user = req.user.fullName

    console.log(user)
    if (user) {
      res.render("index", { user })

    }
  } catch (e) {
    if (e) {
      res.render("index")
    }
  }


})
route.get("/errorpage", (req, res)=>{
  res.render("pageUnderDev")
})
// products list page
route.get("/products", (req, res) => {


  res.render("products", { Foods, electronics })

})

route.get("/products/:id", AuthenticateUser, checkUser, (req, res) => {

  req.params.id = req.user._id
  res.render("products", { Foods, electronics, user: req.user.fullName })

})

// cart route
route.get("/cart", AuthenticateUser, checkUser, (req, res) => {
  const user = req.user.fullName;
  console.log(user)
  res.render("cart", { user })
})
// newsletter route
route.get("/newsletter", (req, res) => {
  res.render("newsletter")
})

route.post("/newsletter", (req, res) => {
  const { email, fullName } = req.body
  res.send({ email, fullName })
})


// contact us route
route.get("/contactus", (req, res) => {
  res.render("contactus")
})
route.post("/contactus", contactUsController)

// services routes
route.get("/services", (req, res) => {

  res.render("services", { kitchen, computerClasses })
})


route.get("/cart/checkout", AuthenticateUser, checkUser, (req, res) => {
  res.setHeader("Authorization", process.env.SECRET_KEY)
  res.setHeader('Access-Control-Allow-Origin','*')
  const user = req.user
  console.log(user.fullName)
  res.render("orderPage", { user: user.fullName })
})
route.post("/cart/checkout", (req, res) => {
  // req.headers.authorization = process.env.SECRET_KEY
  try {
    const data = req.body
    console.log(data)
    ordersModel.insertMany(data.map(item => {
      return {
        customerName: item.customerName,
        email: item.email,
        price: item.itemPrice,
        image: item.image,
        quantity: item.itemQty,
        address: item.Address,
        phoneNo: item.phoneNo,
        itemName: item.itemName,
        OrderId: orderId(new Date().toLocaleString()).generate(),
        paymentReference: item.paymentReference
      }
    })
    )
    console.log(ordersModel)
    res.status(200).json(ordersModel)

  } catch (e) {
    if (e) {
      res.status(400).json(e.message)
    }
  }
})
// customers orders routes

route.get("/cart/orders/", AuthenticateUser, checkUser, ordersController)
// services register route

route.get("/services/:service/courseregister", (req, res) => {

  const url = req.url.split("/")[2].replaceAll("%20", " ")
  try {
    for (var i = 0; i < computerClasses.length; i++) {
      if (computerClasses[i].service === url) {
        res.render("courseRegister", { course: computerClasses[i], key: process.env.PUBLISHABLE_KEY })
      }
    }
  } catch (e) {
    console.log(e)
  }

});

route.post("/services/:service/courseregister", studentRegisterController)

// route.get("*", checkUser)

module.exports = route