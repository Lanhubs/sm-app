const { mongoose } = require("mongoose")
const schema = require("./db/dbConnection")
const bcrypt = require("bcrypt")
// const uniqueValidator = require("mongoose-unique-validator")
const Admin = new schema({
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

Admin.path('email').validate(async (value) => {
    const countEmail = await mongoose.models.Admin.countDocuments({ email: value });
    return !countEmail
}, "Email already used by another Admin")

Admin.statics.login = async function (email, password) {
    if (email) {
        if (password) {
            const Admin = await this.findOne({ email })

            if (Admin) {
                const auth = await bcrypt.compare(password, Admin.password)
                if (auth) {
                    return Admin
                }
                throw Error("incorrect password")
            }
            throw Error('incorrect email')
        }
        throw Error("password required")

    }
    throw Error("email is required")

}

module.exports = mongoose.model("Admin", Admin)