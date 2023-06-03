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

const darkWhiteMode = matchMedia('(prefers-color-scheme: dark)');

if(darkWhiteMode.matches) {
    // Is dark
    document.querySelector("link[rel='shortcut icon']").href = "../img/icons/Logo-white(64).ico";
} else {
    // Is not dark
    document.querySelector("link[rel='shortcut icon']").href = "../img/icons/LOGO(64).ico";
}