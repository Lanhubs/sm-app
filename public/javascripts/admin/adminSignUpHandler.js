const form = document.querySelector("form")
console.log(form);
const btn = form.querySelector("#signInBtn")

btn.onclick = function () {
    var adminName = form.querySelector("#adminName")
    var  password = form.querySelector("#adminPwd")
    
   
    const data = {
        adminName: adminName.value,
        password: password.value
    }
    fetch("/api/user/setAdmin", {
        method: 'POST',
        headers: {
            
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res=> {
        return res.json()
    }).then(details=>{
        console.log(details)
    }).catch(e=>{
        if(e){
            console.log(e.message);
        }
    })
}


