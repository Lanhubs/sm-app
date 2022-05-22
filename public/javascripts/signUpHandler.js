const formElem = document.querySelector("#form")
const submitBtn = document.querySelector("#submitBtn")
let fullNameError = document.querySelector(".fullName.error")
let emailError = document.querySelector(".email.error")
let passwordError = document.querySelector(".password.error")

fullNameError.textContent = ""
passwordError.textContent = ""
emailError.textContent = ""

formElem.addEventListener("submit", async (e) => {
    e.preventDefault()
    const fullName = formElem.fullName.value
    const email = formElem.email.value
    const password = formElem.password.value
     
    const res = await fetch("/register", {
        method: "POST",
        body: JSON.stringify({
            fullName: fullName,
            email: email,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const Data = await res.json()
    
    

    if (Data.errors) {
        console.log(Data.errors)
        fullNameError.textContent = Data.errors.fullName
        passwordError.textContent = Data.errors.password
        emailError.textContent = Data.errors.email
    }
    if (Data.user) {
        location.assign(document.referrer || "/home")
    }

})