
var form = document.querySelector("#createProduct_form")
var nameError = document.querySelector(".error.nameError").textContent
var priceError = document.querySelector(".error.priceError").textContent
var imageError = document.querySelector(".error.imageError").textContent
var typeError = document.querySelector(".error.typeError").textContent
var descError = document.querySelector(".error.descError").textContent



form.addEventListener("submit", async (e) => {

    e.preventDefault()
    nameError = ""
    priceError = ""
    imageError = ""
    typeError = ""
    descError = ""
    const price = form.querySelector("#price")
    const name = form.querySelector("#name")
    const description = form.querySelector("#description")
    const image = form.querySelector("#image").files[0]
    const type = form.querySelector("#type")
    var productDetails = new FormData()
    productDetails.append("price", price.value)
    productDetails.append("name", name.value)
    productDetails.append("description", description.value)
    productDetails.append("image", image)
    productDetails.append("type", type.value)

    const res = await fetch("/admin/createproduct", {
        method: "POST",
        body: productDetails
    })
    const data = await res.json()
    
    if (data.errors) {
        const errorMessage = data.errors
        nameError = errorMessage.name
        imageError = errorMessage.image
        descError = errorMessage.description
        priceError = errorMessage.price
        typeError = errorMessage.type
        console.log(data.errors)
    }
    if (data.product) {
        console.log(data)
        location.assign("/admin/products")
    }

})
// update product
const updateForm = document.querySelector("#updateProduct")
updateForm.addEventListener("submit", async (e) => {
    nameError = ""
    priceError = ""
    imageError = ""
    typeError = ""
    descError = ""
    e.preventDefault()

    const price = form.querySelector("#price")
    const name = form.querySelector("#name")
    const description = form.querySelector("#description")
    const image = form.querySelector("#image").files[0]
    const type = form.querySelector("#type")
    var productDetails = new FormData()
    productDetails.append("price", price.value)
    productDetails.append("name", name.value)
    productDetails.append("description", description.value)
    productDetails.append("image", image)
    productDetails.append("type", type.value)

    const res = await fetch("/admin/:id/update", {
        method: "PUT",
        body: productDetails
    })
    const data = await res.json()
    consol.log(data)
/*     if (data.error) {
        const errorMessage = data.error
        nameError = errorMessage.name
        imageError = errorMessage.image
        descError = errorMessage.description
        priceError = errorMessage.price
        typeError = errorMessage.type
        console.log(data.error)
    } */
    if (data.product) {
        console.log(data.product)
        location.assign("/admin/products")
    }
})


// delete product
document.querySelectorAll("button#delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const parentElement = e.target.parentElement.parentElement
        console.log(parentElement)
        const product_id = e.target.parentElement.parentElement.firstChild
        fetch("/admin/products", {
            method: 'DELETE',
            body: JSON.stringify({
                id: product_id.textContent
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        parentElement.remove()
                        console.log(data.success)
                    }
                }).catch(error => {
                    console.log(error)
                })
        })
    })



})