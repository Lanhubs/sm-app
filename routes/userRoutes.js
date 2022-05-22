// user sign in and login
const express = require("express")
const route = express.Router()
const { signupController, signInController } = require("../cotroller/userController")

route.get("/login", (req, res) => {

    res.render("login")
})

route.get("/logout", (req, res) => {
    res.cookie("ME_TECH", { httpOnly: true, maxAge: 1 })
    res.redirect("/login")
})
route.get("/register", (req, res) => {
    res.render("register")
})
// user sign up
route.post("/register", signupController)
// user login
route.post("/login", signInController)

module.exports = route