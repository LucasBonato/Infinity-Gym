let buttonSub = document.getElementById('buttonSub');
let res = document.getElementById('res');

const inputPeso = document.getElementById('peso');
const inputAltura = document.getElementById('altura');

let radioMasc = document.getElementById('M');
let radioFem = document.getElementById('F');

var radioGlo;

buttonSub.addEventListener("click", () => {
    res.innerHTML = "";

    let peso = inputPeso.value;
    let altura = inputAltura.value;
    peso = peso.replace(",", ".");
    altura = altura.replace(",", ".");


    if(Verify(peso, altura) && RadioCheck(radioMasc, radioFem)) {
        if(isNaN(peso) || isNaN(altura)) {
            alert("[ERROR]Só preencha os campos com números!");
        } else {
            const numPeso = Number(peso);
            const numAltura = Number(altura);

            Resposta(numPeso, numAltura);
        }
    } else {
        alert("[ERROR]Preencha todos os campos antes de continuar!")
    }

});

const Verify = (height, weight) => {
    if(height === "" || weight === ""){
        return false;
    } else {
        return true;
    }
}

const RadioCheck = (masc, fem) => {
    if (masc.checked) {
        radioGlo = masc.value;
        return true;
    } else if (fem.checked) {
        radioGlo = fem.value;
        return true;
    } else {
        return false;
    }
}

const Resposta = (P, H) => {
    let imc = P / (H * H);

    if (radioGlo == "M") {
        if(imc > 39.9){
            res.innerHTML = "Obesidade Morbida";
        } else if (imc > 29.9) {
            res.innerHTML = "Obesidade Moderada";
        } else if (imc > 24.9) {
            res.innerHTML = "Obesidade Leve";
        } else if (imc > 19.9){
            res.innerHTML = "Normal";
        } else {
            res.innerHTML = "Abaixo do normal";
        }
    } else {
        if(imc > 38.9){
            res.innerHTML = "Obesidade Morbida";
        } else if (imc > 28.9) {
            res.innerHTML = "Obesidade Moderada";
        } else if (imc > 23.9) {        
            res.innerHTML = "Obesidade Leve";
        } else if (imc > 18.9){
            res.innerHTML = "Normal";
        } else {
            res.innerHTML = "Abaixo do normal";
        }
    }
}