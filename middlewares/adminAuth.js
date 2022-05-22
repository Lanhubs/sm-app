const jwt = require("jsonwebtoken")
const Admin = require("../model/admin")
require("dotenv").config()
const createToken = (id) => {
    return jwt.sign({ id },
        process.env.ADMIN_TOKEN_KEY,
        { algorithm: "HS256", expiresIn: 60 * 60 * 24 })
}
// FORMAT OR TOKEN
// Authorization Bearer access_token

// handle login errors
var handleLoginError = (err) => {
    let errors = {}
    if (err.message === "password required") {
        errors.password = "admin password field cannot be empty"
    }
    if (err.message === "email is required") {
        errors.email = "admin email field cannot be empty"
    }
    if (err.message === "incorrect email") {
        errors.email = "admin email is not registered"
    }
    if (err.message === "incorrect password") {
        errors.password = "incorrect admin password"
    }
    return errors
}


// verify token

const authenticateAdmin = (req, res, next) => {
    const token = req.cookies.ADMIN
    // check for jsonwebtoken existence
    if (token) {
        jwt.verify(token, process.env.ADMIN_TOKEN_KEY, (err, decodedToken) => {
            if (err) {

                res.redirect("/admin/login")
            } else {

                next()
            }
        })
    } else {
        res.redirect("/admin/login")
    }

}
// checking user existence
const checkAdmin = (req, res, next) => {
    const token = req.cookies.ADMIN
    if (!token) {
        next()
    }

    jwt.verify(token, process.env.ADMIN_TOKEN_KEY, async (err, dedcodedToken) => {
        if (err) {
            console.log(err)
            next(err)
        }
        var admin = await Admin.findById(dedcodedToken.id);

        req.admin = admin;
        next();

    })


}


const chainAdminMiddlewares = (req, res, next) => {
    return [authenticateAdmin(req, res, next), checkAdmin(req, res, next)]
}
module.exports = { createToken, handleLoginError, authenticateAdmin, checkAdmin }
