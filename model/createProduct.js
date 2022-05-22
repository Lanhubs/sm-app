const { default: mongoose } = require("mongoose")
const schema = require("../model/db/dbConnection")
const productDetails = new schema({
    name:{
        type: String,
        required: [true, "product must have a name"],
        unique: true
    },
    price:{
        type: String,
        required: [true, 'price tag must be set']
    },
    image:{
        type: String,
        required:[true, "product must have an image"]
    },
    description:{
        type: String,
        required: [true, "the product description is required"]
    },
    type:{
        type: String,
        required: [true, " the product type must be specified"]
    },
})
productDetails.path('name').validate(async (value) => {
    const productName = await mongoose.models.productDetails.countDocuments({ name: value });
    return !productName
}, "product with the same name already exists")

module.exports = mongoose.model("productDetails", productDetails)