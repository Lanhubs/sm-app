const formElem = document.querySelector("#form")
const submitBtn = document.querySelector("#submitBtn")

let emailError = document.querySelector(".email.error")
let passwordError = document.querySelector(".password.error")

passwordError.textContent = ""
emailError.textContent = ""

formElem.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = formElem.email.value
    const password = formElem.password.value
     
    /* if(email  === ""){
        emailError.textContent = " email field cannot be empty"
    }
    if(password  ===""){
        passwordError.textContent = " password field cannot be empty"
    } */
    const res = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const Data = await res.json()
    
    

    if (Data.errors) {
        passwordError.textContent = Data.errors.password
        emailError.textContent = Data.errors.email
    }
    if (Data.user) {
        
        location.assign( "/home")
    }

})