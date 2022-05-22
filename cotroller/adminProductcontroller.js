const productDetails = require("../model/createProduct")
const path = require("path")
const projRoot = path.basename(process.cwd())

const createProduct = async (req, res) => {
    const { name, price, description, type } = req.body
    let image;

    image = req.files.image
    let uploadPath;

    try {

        if (!image || Object.keys(image).length === 0) {
            res.status(405).json({ error: "no file was uploaded" })
        }
        const product = new productDetails({ name, price, description, type, image: image.name })
        if (product) {
            await product.save()
            console.log(product)

            uploadPath = __dirname + "/uploads/" + product.image
            console.log(uploadPath)

            image.mv(uploadPath, (err) => {
                if (err) {
                    res.status(405).json({
                        errors: {
                            image: err
                        }
                    })
                }
                res.redirect('/admin/products');
            })
        }
    } catch (error) {
        if (error.name == "ValidationError") {
            let errors = {}
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message
            })

            res.status(405).json({ errors })
        }
    }
}
// update product
const updateProduct = (req, res) => {
    const productId = req.params.id
    
    const image = req.files.image
    try {
        productDetails.findOneAndUpdate({ _id: productId }, { $set: { 
            name: req.body.name, 
            price: req.body.price, 
            description: req.body.description, 
            type: req.body.type
            , image: image.name } },
            { new: true }, (err, data) => {
                console.log(data)
                if (err) {
                    res.status(405).json({ error: err })
                } else {
                    if (data.image) {
                        image.mv(__dirname + "/uploads/" + image.name, (err) => {
                            if (err) {
                                res.status(405).json({ error: err })
                            }
                        })
                    } else {
                        res.json({ product: data._id })
                    }
                }
    
    
    
    
            })
    } catch (err) {
        console.log(err)
    }
    


}
// delete product
const productDeleteController = (req, res) => {
    const productId = req.body.id
    productDetails.findByIdAndDelete({ _id: productId }, (err, docs) => {
        if (err) {
            res.status(400).json({ err })
        }
        res.json({ success: "product successfully remooved from database" })
    })
}
module.exports = { updateProduct, createProduct, productDeleteController }