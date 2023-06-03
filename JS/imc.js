let buttonSub = document.getElementById('buttonSub');

buttonSub.addEventListener("click", () => {
    let inputAltura = document.getElementById('altura').value;
    let inputPeso = document.getElementById('peso').value;
    let radioInpu = document.querySelectorAll('.testeInpu').attributes.value;

    let numPeso, numAltura;

    if(Verify(inputAltura, inputPeso, radioInpu)){
        numPeso = Number(numPeso);
        numAltura = Number(numAltura);
        console.log(inputAltura, inputPeso, radioInpu);
        console.log(numAltura, numPeso)

    } else {
        alert("[ERROR] Preencha todos os campos antes de enviar!");
    }
});

const Verify = (height, weight, radio) => {
    if(height == "" || weight == "" || radio == ""){
        return false;
    } else {
        return true;
    }
}

const Convert = (height, weight) => {
    if(isNaN(Number(height)) && isNaN(Number(weight))){
        return false;
    } else {
        return true;
    }
}