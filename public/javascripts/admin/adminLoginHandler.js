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
     
    
    const res = await fetch("/admin/login", {
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
    if (Data.admin) {
        
        location.assign("/admin")
    }

})