const ordersModel = require("../model/orders")


const ordersController = (req, res) => {

    const user = req.user
    console.log(user)


    ordersModel.find({ where: { _id: user._id } }).lean().exec((err, items) => {
        // res.render("")
        if (err) {
            console.log(err)
        }
        res.render("customerOrders", {
            fullName: user.fullName,
            email: user.email,
            items: items,
            customerDetails: {
                address: items[0].address,
                phoneNo: items[0].phoneNo,
                deliveryDate: items[0].deliveryDate,
                orderDate: items[0].orderDate}
            })
    })
}


module.exports = { ordersController }