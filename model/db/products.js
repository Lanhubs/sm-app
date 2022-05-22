const createProducts = new schema({
    name: String,
    image: {
        data: Buffer,
        contentType: String
    },
    price: String,
    description: String,
    type: String
})
// schema for orders by customer
const orders = new schema({
    
})
