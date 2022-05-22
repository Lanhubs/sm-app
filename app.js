const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const fileUpload = require("express-fileupload")
const exphbs = require("express-handlebars")
const route = require("./routes/routes")
const adminRoute = require("./routes/adminRoutes")
const cors = require("cors")
const path = require("path")
const userLoginReg = require("./routes/userRoutes")
const { checkUser, AuthenticateUser } = require("./middlewares/userAuth")




require("dotenv").config()

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))
app.engine(".hbs", exphbs.engine({
    defaultLayout: "main",
    extname: '.hbs',
    
}))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "uploads")))
app.use(fileUpload({
    createParentPath: true
}))
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
/* app.use((req, res, next) => {
    res.header(
        {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials": true
        }
    )
    next()
}) */
// routes

app.use( route)
app.use(adminRoute)
app.use(userLoginReg)



app.listen(3030 || process.env.PORT, () => {
    console.log("app listening at port 3030")
})

