let buttonSub = document.getElementById('buttonSub');
let inputAltura = document.getElementById('altura');
let inputPeso = document.querySelector('#peso');
let radioInpu = document.querySelector('input[name="MascFemi"]:checked');

buttonSub.addEventListener("click", () => {
    if(Verficar()){
        console.log(inputPeso.value);

    }
})

const Verficar = () => {
    if(radioInpu.value == "" || inputPeso.value == "" || inputAltura.value == "") {
        alert("Preencha todas as informações!");
        return false;
    } else {
        return true;
    }
}