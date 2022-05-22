const jwt = require("jsonwebtoken")
const Admin = require("../model/admin.js")
const bcrypt = require("bcrypt")
const {createToken, handleLoginError} = require("../middlewares/adminAuth")
require("dotenv").config()


const adminSignUpController = async (req, res) => {
    // const { fullName, email, password } = req.body
    const rounds = 10
    const salt = await bcrypt.genSalt(rounds)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    try {
        const admin = new Admin({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword
        })
        await admin.save()
        if (admin) {
            const token = createToken(admin._id)
            const maxAge = 3 * 24 * 60 * 60 *1000
            res.cookie(process.env.ADMIN_TOKEN_KEY, token, { httpOnly: true, maxAge: maxAge, secure: true });
            res.status(200).json({ admin: admin._id })
            // console.log(admin)
        }
    } catch (error) {
        if (error.name == "ValidationError") {
            let errors = {}
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message
            })
            console.log(errors)
            res.status(422).json({ errors })
        } else {
            res.status(500).json(error)
        }
    }
}


var adminSignInController = async (req, res) => {
    const { email, password } = req.body
    

    try {
        
       const admin = await Admin.login(email, password)
       const token = createToken(admin._id)
       const maxAge = 3 * 24 * 60 * 60 *1000
       res.cookie(process.env.ADMIN_TOKEN_KEY, token, { httpOnly: true, maxAge: maxAge, secure: true });
      if(admin){
       res.status(200).json({admin: admin._id})
        // res.redirect('/admin');
      }
    } catch (err) {
        if(err){
           const errors = handleLoginError(err)
           res.status(405).json({errors })
           console.log(errors)
        }
        
    }

}

module.exports = { adminSignUpController, adminSignInController }