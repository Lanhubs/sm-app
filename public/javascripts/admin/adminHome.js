// truncate text if length persist certain amount 
/* document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".table tbody tr td").forEach(elems => {
        truncate(elems, 10)
        console.log(truncate(elems, 10))

    })
})




const truncate = (str, maxLength, { side = "end", elipsis = "..." } = {}) => {

    if (str.textContent.length > maxLength) {
        switch (side) {
            case "start":
                return elipsis + str.textContent.slice(-(maxLength - elipsis.length))
            case "end":
            default:
                return str.texContent.slice(0, maxLength - elipsis.length) + elipsis
        }
    }
} */


document.querySelector(".empty-orders button").addEventListener("click", ()=>{
    fetch(location.pathname, {
        method: "DELETE",
        
    })
})