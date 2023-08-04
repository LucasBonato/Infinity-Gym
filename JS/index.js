let button = document.querySelector(".hamburguer");
let mobileNav = document.querySelector(".mobile-nav"); 
let btnNav = document.querySelectorAll(".btn-nav");
let out = document.querySelector("main");

button.addEventListener("click", openNav)

out.addEventListener("click", () => { 
    mobileNav.classList.remove("ativo"); 
    button.classList.remove("ativo");
});

for(let i = 0; i < btnNav.length; i++){
    btnNav[i].addEventListener("click", openNav);
}

function openNav() { 
    mobileNav.classList.toggle("ativo");
    button.classList.toggle("ativo");
}