document.addEventListener('DOMContentLoaded', ()=>{
    var total = document.querySelector('.child span')
    const prices = document.querySelectorAll('.product-details .price span')
    let Total = 0
    for(let i =0; i< prices.length; i++){
        
        Total += parseFloat(prices[i].textContent)
        total.textContent = Total
    }
    
    
})