const jwt = require("jsonwebtoken")
const user = require("../model/user")
require("dotenv").config()
const User = require("../model/user")
const createToken = (id) => {
    return jwt.sign({ id },
        process.env.USER_TOKEN_KEY,
        { algorithm: "HS256", expiresIn: 60 * 60 * 1 })
}
// FORMAT OR TOKEN
// Authorization Bearer access_token

// handle login errors
var handleLoginError = (err) => {
    let errors = {}
    if (err.message === "password required") {
        errors.password = "password field cannot be empty"
    }
    if (err.message === "email is required") {
        errors.email = "email field cannot be empty"
    }
    if (err.message === "incorrect email") {
        errors.email = "email is not registered"
    }
    if (err.message === "incorrect password") {
        errors.password = "incorrect password"
    }
    return errors
}


// verify token

const AuthenticateUser = (req, res, next) => {
    const token = req.cookies.ME_TECH
    // check for jsonwebtoken existence
    if (token) {
        jwt.verify(token, process.env.USER_TOKEN_KEY, (err, decodedToken) => {
            if (err) {

                res.redirect("/login")
            } else {

                next()
            }
        })
    } else {
        res.redirect("/login")
    }
}
// checking user existence
const checkUser = (req, res, next) => {
    const token = req.cookies.ME_TECH
    if (!token) {
        next()
    }

    jwt.verify(token, process.env.USER_TOKEN_KEY, async (err, dedcodedToken) => {
        if (err) {
            console.log(err)
            next(err)
        }
        var user = await User.findById(dedcodedToken.id);
        
        req.user = user;
        next();

    })
    

}
module.exports = { createToken, handleLoginError, AuthenticateUser, checkUser }
