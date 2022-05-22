// updating cart item total

var cartItems = JSON.parse(localStorage.getItem("cartList"))

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", Ready)
}else{
    Ready()
}
var totalPrice;
function updateCartTotal() {
    const cartItems = document.getElementsByClassName("cart-item")
    var total = 0;
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];

        var priceElem = cartItem.querySelectorAll(".item-details .itemPrice .Price")[0]
        var qtyElem = cartItem.querySelectorAll(".cart-controls .count-control .qty")[0]

        var price = parseFloat(priceElem.textContent.replace(",", ""))
        var qty = qtyElem.value
        total = total + (price * qty);
    }

    document.querySelector(".cart-total .total  .Total").textContent = total
    totalPrice = total

}




var cartItemsContainer = document.querySelector(".cart-items-container")

const totalQuantity = document.querySelector(".totalQuantity")

if (cartItems.length === 0) {
    cartItems.textContent += "cart is empty"

} else {
    cartItems.forEach(item => {
        const itemElement = `<li class="cart-item">
                            <div class="item-img" >
                                <img src="${item.image}"id="itemImg" alt="">
                            </div>
                            <div class="item-details">
                                <h3 class="itemName">${item.name}</h3>
                                <p id="itemPrice" class="itemPrice">&#8358; <span id="Price" class="Price">${item.price}</span></p>
                            </div>
                            <div class="cart-controls">
                                <div class="count-control">
                                    <input id="qty" class="qty" type="number" value="1" />
                                </div>
                                <button id="remove" class="remove"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </li>`

        cartItemsContainer.innerHTML += itemElement



    });
}



// remove from cart controller
















//reduce cart items


// const removeItemBtn = document.querySelectorAll("button.remove")
// removeItemBtn.forEach(btn=>{
// 	var cartItemElem = btn.parentElement.parentElement
// 	var itemName = cartItemElem.querySelector(".itemName")
	
// 	btn.addEventListener("click", ()=>{
// 		if(cartItems.find(elem => elem.name == itemName)){
// 			cartItems.splice()
// 			cartItemElem.remove()
// 		}
// 	})
// })


const reduceCartItems =(itemName)=>{
    for (let i = 0; i < cartItems.length; i++) {
        const element = cartItems[i];
        if(element.name == itemName){
            delete element;
        }
    }
    
}
localStorage.setItem("cartList", JSON.stringify(cartItems))





var cartItemsParent = document.querySelector(".cart-items-container")




function getItems() {
    var cartItem = cartItemsParent.getElementsByClassName("cart-item")
    var array = []
    
    for (let i = 0; i < cartItem.length; i++) {
        var obj = {}
        
        const itemName = cartItem[i].querySelector(".itemName")
        const itemQty = cartItem[i].querySelector(".qty")
        const itemPrice = cartItem[i].querySelector(".Price")
        const itemImg =cartItem[i].querySelector("#itemImg")

        obj.itemName =itemName.textContent
        obj.itemQty = itemQty.value
        obj.itemPrice = itemPrice.textContent
       obj.image = itemImg.src
        
        array.push(obj)
        
    }
    return array
}

console.log(getItems());
function getTotalPrice() {
    return totalPrice
}




// checkout button handling
var servData;
const checkoutBtn = document.querySelector(".checkoutBtn")
checkoutBtn.onclick = (e) => {
    TotalAmount = { totalAmount: getTotalPrice() }
	const Item = getItems()
    localStorage.setItem("totalAmount", JSON.stringify(TotalAmount))
	localStorage.setItem("orders", JSON.stringify(Item))
    location.assign("/cart/checkout")
}



function Ready() {
    const removeFromCartBtn = document.querySelectorAll(".remove")
    for (var i = 0; i < removeFromCartBtn.length; i++) {
        var btn = removeFromCartBtn[i]
        btn.addEventListener("click", (event) => {
            var btnClicked = event.target
            var btn = btnClicked.parentElement.parentElement.parentElement.parentElement
            console.log(btn);
            var prodName = btn.querySelectorAll(".item-details .itemName")[0]
            reduceCartItems(prodName.innerText)
            btn.remove();
            updateCartTotal()
        })
        // handling cartitem quantity change
        const inputQty = document.querySelectorAll(".cart-controls .count-control .qty")
        for (let e = 0; e < inputQty.length; e++) {
            const qtyInput = inputQty[e];
            qtyInput.addEventListener("change", (event) => {
                var input = event.target
                if (isNaN(input.value) || input.value <= 0) {
                    input.value = 1
                }
                updateCartTotal()
            })
        }

    }
    const numOfItems = document.querySelector("#numOfItems")
    numOfItems.textContent += " " + cartItems.length

    updateCartTotal()
}


