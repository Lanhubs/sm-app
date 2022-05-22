// newsletter handler

var newsLetterForm = document.getElementById("newsletterForm")

newsLetterForm.addEventListener("submit", e => {
    e.preventDefault()
    const email = document.querySelector("#email")
    const fullName = document.querySelector("#fullName")

    const formData = { email: email.value, fullName: fullName.value }
    fetch("/newsLetter", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(res => {
            return res.json()
        })
        .then(data => console.log(data))
})