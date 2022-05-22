import { PUBLIC_TEST_KEY, SECRET_TEST_KEY } from "./secrets.js"





function setCookie(email, emailValue) {
    const expireMs = 30
    document.cookie = `${email}=${emailValue}; expires=${expireMs}; path=${location.pathname}; secure; sameSite=strict`
}
var url = location.pathname

var orders = JSON.parse(localStorage.getItem("orders"))

var TotalAmount = JSON.parse(localStorage.getItem("totalAmount"))
console.log(TotalAmount)
// payment button
const payBtn = document.querySelector(".payBtn")
payBtn.addEventListener('click', payNow, false)
function payNow() {
    const customerName = document.getElementById("customerName")
    const Address = document.getElementById("address")
    const phoneNo = document.getElementById("phoneNo")
    const email = document.getElementById("email")
    var Orders = orders


    for (let k = 0; k < Orders.length; k++) {

        Orders[k].customerName = customerName.value
        Orders[k].Address = Address.value
        Orders[k].phoneNo = phoneNo.value
        Orders[k].email = email.value
    }
    let handler = PaystackPop.setup({
        key: PUBLIC_TEST_KEY, // Replace with your public key
        email: email.value,
        amount: TotalAmount.totalAmount * 100,
        ref: '' + Math.floor(Math.random() * 1000000000 + 1),
        metadata: {
            custom_fields: [{
                display_name: "Customer Name",
                variable_name: "Customer Name",
                value: `${customerName.value}`
            }]
        },
        onClose: function () {
            alert('Window closed.');
        },
        callback: function (transaction) {

            Orders.forEach(od => {
                od.paymentReference = transaction.reference
            })

            fetch("/cart/checkout", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Authorization": SECRET_TEST_KEY,
                    "Access-Control-Allow-Origin": '*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Orders)
            })
                
                .then(data => {
                    location.assign("/cart/orders")
                    localStorage.clear()
                }).catch(e => {
                    console.log(e)
                })

        },
    });
    handler.openIframe();

}