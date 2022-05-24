// update product
const updateForm = document.querySelector("#updateProduct")
var nameError = document.querySelector(".error.nameError").textContent
var priceError = document.querySelector(".error.priceError").textContent
var imageError = document.querySelector(".error.imageError").textContent
var typeError = document.querySelector(".error.typeError").textContent
var descError = document.querySelector(".error.descError").textContent

updateForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    nameError = ""
    priceError = ""
    imageError = ""
    typeError = ""
    descError = ""
    console.log("clicked")
    const price = updateForm.querySelector("#price")
    const name = updateForm.querySelector("#name")
    const description = updateForm.querySelector("#description")
    const image = updateForm.querySelector("#image").files[0]
    const type = updateForm.querySelector("#type")
    var productDetails = new FormData()
    productDetails.append("price", price.value)
    productDetails.append("name", name.value)
    productDetails.append("description", description.value)
    productDetails.append("image", image)
    productDetails.append("type", type.value)

    const res = await fetch(`/admin/${location.pathname.split("/")[2]}/update`, {
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
