// side navigation controller
// const openSideBar = document.querySelector(".header .displaySideNav")
const sideNav= document.querySelector(".sideNav")
const openSideBar=()=>{

    sideNav.classList.add("open")
}

const cancelSideBar=()=>{
    
    sideNav.classList.remove("open")
}
