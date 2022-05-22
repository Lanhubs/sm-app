
var contactusForm = document.getElementById("contactusForm")
const errorMessage = document.querySelector(".newsletter-success-parent.error.invisible")
const successMessage = document.querySelector(".newsletter-success-parent.success.invisible")

document.querySelectorAll(".newsletter-success-parent").forEach(elem=>{
    elem.addEventListener("click", (e)=>{
        
        elem.style.display ="none"    
    })
})

contactusForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = document.querySelector("#email")
    const fullName = document.querySelector("#fullName")
    const subject = document.querySelector("#subject")
    const message = document.querySelector("#messageBox")
    const formData = {
        email: email.value,
        fullName: fullName.value,
        subject: subject.value,
        message: message.value
    }
    const res = await fetch("/contactus", {

        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    const data = await res.json()


    if (data.error) {

        errorMessage.classList.remove('invisible')
        setTimeout(()=>{
            location.href("/contactus")
        }, 1000)   
    }

    if (data.msg) {
        successMessage.classList.remove("invisible")
        setTimeout(()=>{
            location.href("/")
        }, 1000)
    }



})