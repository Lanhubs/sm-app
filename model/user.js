const { mongoose } = require("mongoose")
const schema = require("./db/dbConnection")
const bcrypt = require("bcrypt")
const uniqueValidator = require("mongoose-unique-validator")
const User = new schema({
    fullName: {
        type: String,
        required: [true, "full name is required"]
    },


    email: {
        type: String,
        required: [true, "email field cannot be empty"],
        index: true,
        unique: true

    }, password: {
        type: String,
        required: [true, "password is required"],
        minlength: [8, "password length must be 8 minimum "]
    },
})

User.path('email').validate(async (value) => {
    const countEmail = await mongoose.models.users.countDocuments({ email: value });
    return !countEmail
}, "Email already used by another user")

User.statics.login = async function (email, password) {
    if (email) {
        if (password) {
            const user = await this.findOne({ email })

            if (user) {
                const auth = await bcrypt.compare(password, user.password)
                if (auth) {
                    return user
                }
                throw Error("incorrect password")
            }
            throw Error('incorrect email')
        }
        throw Error("password required")

    }
    throw Error("email is required")

}

module.exports = mongoose.model("users", User)