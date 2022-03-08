
const processIMC = () => {
    var weight = document.getElementById("weight");
    var height = document.getElementById("height");
    var processBtn = document.getElementById("process");
    var result = document.getElementById("result");

    processBtn.onclick = ()=> {
        // variable imc is the IMC
        var imc = weight.value / (height.value * height.value) * 10000;

        result.style.color = "#2282E3"

        if(imc < 18.5){
            result.innerHTML = "Poco Riesgo";
        }else if(imc >= 18.5 && imc <= 24.9){
            result.innerHTML = "Riesgo Normal";
        }else if(imc >= 25 && imc <= 29.9){
            result.innerHTML = "Riesgo Mayor al normal";
        }else if(imc >= 30 && imc <= 34.9){
            result.innerHTML = "Riesgo Alto";
        }else if(imc >= 35 && imc <= 39.9){
            result.innerHTML = "Riesgo muy alto";
        }else if(imc >= 40){
            result.innerHTML = "Riesgo crítico";
        }
    };
}

processIMC()