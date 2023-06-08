let button = document.querySelector(".hamburguer");
let mobileNav = document.querySelector(".mobile-nav"); 
let btnNav = document.querySelectorAll(".btn-nav");

button.addEventListener("click", () => {
    button.classList.toggle("ativo");
    mobileNav.classList.toggle("ativo");
})

for(let i = 0; i < btnNav.length; i++){
    btnNav[i].addEventListener("click", () => {
        button.classList.toggle("ativo");
        mobileNav.classList.toggle("ativo");
    });
}