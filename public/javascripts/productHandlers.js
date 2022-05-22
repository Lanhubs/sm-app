const cartStorage = window.localStorage
if (!cartStorage.getItem("cartList")) {
    cartStorage.setItem("cartList", "[]")
}




if (document.readyState === 'loading') {
    document.addEventListener('DOMcontentLoaded', () => {
        // cart items amount

    })
}




const cart = JSON.parse(cartStorage.getItem("cartList"))
console.log(cart)
// product item storing  in cart
const addToCartBtn = document.querySelectorAll("button.addToCart")
for (var x = 0; x < addToCartBtn.length; x++) {
    addToCartBtn[x].addEventListener("click", event => {
        var btn = event.target
        var productItem = btn.parentElement.parentElement.parentElement.parentElement
        
        var productName = productItem.querySelector(" .product-name")
        var productImg = productItem.querySelector("img")
        var productPrice = productItem.querySelector(" .product-price .Price")
        var productDesc = productItem.querySelector(".product-description")
        console.log(productName.textContent, productImg.src, productDesc.textContent, productPrice.textContent)
        const data = {
            name: productName.textContent,
            price: productPrice.innerText,
            description: productDesc.innerText,
            image: productImg.src
        }
        
        if (!cart.find(item => item.name === data.name)) {
            cart.push(data)
            cartStorage.setItem("cartList", JSON.stringify(cart))
            console.log(cart)
        } else {
            alert("item already exists")
            return
        }


    })

}


var amount = document.querySelectorAll(" .cartAmounts .cartAmount")[0]
var cartAmount = JSON.parse(cartStorage.getItem("cartList"))
amount.textContent = cartAmount.length
