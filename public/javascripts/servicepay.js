// setting cookies function
import { PUBLIC_TEST_KEY, SECRET_TEST_KEY } from "./secrets.js"

function setCookie(email, emailValue) {
    const expireMs = 30
    document.cookie = `${email}=${emailValue}; expires=${expireMs}; path=${location.pathname}; secure; sameSite=strict`
}




document.getElementById("paymentBtn").addEventListener("click", payWithPaystack, false)

function payWithPaystack() {
    const fullName = document.getElementById("fullName")
    const courseName = document.getElementsByClassName("serviceName")[0]
    const gender = document.getElementById("gender")
    const email = document.getElementById("email")
    const phoneNo = document.getElementById("phone")
    const data = {
        courseName: courseName.textContent,
        fullName: fullName.value,
        gender: gender.value,
        email: email.value,
        phoneNo: phoneNo.value
    }
    console.log(data);
    let handler = PaystackPop.setup({
        key: PUBLIC_TEST_KEY, // Replace with your public key
        email: document.getElementById('email').value,
        amount: document.getElementById('servicePrice').textContent.replace(",", "") * 100,
        ref: '' + Math.floor(Math.random() * 1000000000 + 1),
        metadata: {
            custom_fields: [{
                display_name: "Customer Name",
                variable_name: "Customer Name",
                value: `${fullName.value}`
            }]
        },
        onClose: function () {
            alert('Window closed.');
        },
        callback: function (transaction) {

            const paymentReference = transaction.reference
            data.paymentReference = paymentReference
            fetch("/services/:service/courseregister", {
                credentials: "include",
                method: 'POST',

                headers: {
                    "Authorization": SECRET_TEST_KEY,
                    "Access-Control-Allow-Origin": '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(data => console.log(data))
                .catch(error => {
                    if (err) {
                        console.log(error)
                    }
                })
            console.log(data)


        },
    });
    handler.openIframe();
}