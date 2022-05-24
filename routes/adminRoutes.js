const Admin = require('../model/admin.js')
const mongoose = require("mongoose")
const express = require('express')
const { adminSignUpController, adminSignInController } = require('../cotroller/adminSignIncontroller.js')

const ordersModel = require('../model/orders.js')
const studentsModel = require('../model/students.js')
const { authenticateAdmin, checkAdmin } = require('../middlewares/adminAuth.js')
const { createProduct, updateProduct, productDeleteController } = require('../cotroller/adminProductcontroller.js')
const productDetails = require('../model/createProduct')

const router = express.Router()

// admin routes ++

router.get("/api/admin/setAdmin", (req, res) => {
    res.send("adminSignUp")
})
router.post("/api/admin/setAdmin", adminSignUpController)

router.get("/admin/login", (req, res) => {
    res.render("adminLogin")
})
router.post("/admin/login", adminSignInController)

// admin panels

router.get("/admin", authenticateAdmin, checkAdmin, (req, res) => {
    const admin = req.admin
    try {
        ordersModel.find({}).lean().exec((err, content) => {
            res.render("admin", { contents: content, admin: admin.fullName })
        })
    } catch (e) {
        if (e) {
            res.status(401).json(e.message)
            console.log(e.message);
        }
    }
})
router.get("/admin/dashboard", authenticateAdmin, checkAdmin, (req, res) => {
    const admin = req.admin
    res.render("dashboard", { admin: admin.fullName })
})

router.get("/admin/createproduct", authenticateAdmin, checkAdmin, (req, res) => {
    const admin = req.admin
    res.render("createProduct", { admin: admin.fullName })
})
router.get("/admin/products", authenticateAdmin, checkAdmin, (req, res) => {
    const admin = req.admin
    productDetails.find({}).lean().exec((err, detail)=>{
        if(detail){
            res.render("productList", { admin: admin.fullName, productDetails: detail} )
        }
    })
   
})

router.delete("/admin/products", productDeleteController)

router.get("/admin/students", authenticateAdmin, checkAdmin, (req, res) => {
    const admin = req.admin
    try {
        studentsModel.find({}).lean().exec((err, students) => {
            res.render("adminStudents", { students, admin: admin.fullName })
        })
    } catch (error) {
        if (error) {
            console.log(error.message)
            res.status(400).json(error.message)
        }
    }
})
// product upload post request
router.post("/admin/createproduct", createProduct)


// product update routes
router.get("/admin/:id/update",authenticateAdmin, checkAdmin,  (req, res) => {
    const admin = req.admin
    productDetails.findOne({ _id: req.params.id }, (err, data)=>{
        res.render("updateProduct", { admin: admin.fullName, product: {
            name: data.name,
            description: data.description,
            image: data.image,
            price: data.price,

        } })
    })
    
})
router.put("/admin/:id/update", updateProduct)
module.exports = router