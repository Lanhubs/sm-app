const UserModel = require("../model/user")
const bcrypt = require('bcrypt')
const { createToken, handleLoginError } = require("../middlewares/userAuth")
const { log } = require("npmlog")
const { USER_TOKEN_KEY } = require("./secrets/secrets")

const signupController = async (req, res) => {
    // const { fullName, email, password } = req.body
    const rounds = 10
    const salt = await bcrypt.genSalt(rounds)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    try {
        const user = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword
        })
        await user.save()
        if (user) {
            const token = createToken(user._id)
            const maxAge = 3 * 24 * 60 * 60 *1000
            res.cookie(USER_TOKEN_KEY, token, { httpOnly: true, maxAge: maxAge });
            res.status(200).json({ user: user._id })
            // console.log(user)
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

const signInController = async (req, res) => {
    const { email, password } = req.body
    

    try {
        
       const user = await UserModel.login(email, password)
       const token = createToken(user._id)
       const maxAge = 3 * 24 * 60 * 60 *1000
       res.cookie(USER_TOKEN_KEY, token, { httpOnly: true, maxAge: maxAge });
      
       res.status(200).json({user: user._id})

        
    } catch (err) {
        if(err){
           const errors = handleLoginError(err)
           res.status(405).json({errors })
           console.log(errors)
        }
        
    }



}
module.exports = { signInController, signupController }