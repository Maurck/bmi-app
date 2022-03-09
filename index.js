// Parametros
const parameters = {
  weight: 0,
  height: 0,
};

/**
 * Obtiene el string de validación
 * @returns el string de validación
 */

const getValidationString = () => {
  if (parameters.weight <= 0) {
    return "Error: El peso no puede ser negativo o igual a 0";
  }
  if (parameters.height <= 0) {
    return "Error:  La altura no puede ser negativa o igual a 0";
  }
};

const parametersAreValid = () => {
  return parameters.height > 0 && parameters.weight > 0;
};

/**
 *
 * @param {HTMLElement} result Elemento HTML que representa el resultado del proceso
 */
const processBtnOnClick = (result) => {
  var bmi =
    (parameters.weight / (parameters.height * parameters.height)) * 10000;
  setRisk(result, bmi);
};

const changeTextColor = (text, color) => {
  text.style.color = color;
};

const setError = (result, error) => {
  result.innerHTML = error;
};

const setRisk = (result, bmi) => {
  bmiDOM = document.getElementById("bmi");

  resultString = "Resultado: ";
  classification = "";

  if (bmi <= 18.5) {
    classification = "Bajo peso";
  } else if (bmi <= 25) {
    classification = "Normal";
  } else if (bmi <= 30) {
    classification = "Sobrepeso";
  } else if (bmi <= 35) {
    classification = "Obesidad I";
  } else if (bmi <= 40) {
    classification = "Obesidad II";
  } else {
    classification = "Obesidad III";
  }

  if (
    classification === "Bajo peso" ||
    classification === "Obesidad I" ||
    classification === "Obesidad II" ||
    classification === "Obesidad III"
  ) {
    resultString += "Riesgo Alto";
    changeTextColor(result, "#d63333");
    changeTextColor(bmiDOM, "#d63333");
  } else if (classification === "Sobrepeso") {
    resultString += "Riesgo Moderado";
    changeTextColor(result, "#cbd633");
    changeTextColor(bmiDOM, "#cbd633");
  } else {
    resultString += "Riesgo Bajo";
    changeTextColor(result, "#33d63b");
    changeTextColor(bmiDOM, "#33d63b");
  }

  result.innerHTML = resultString;
  bmiDOM.innerHTML = "IMC: " + bmi.toFixed(2); 
};

const setBtnClick = () => {
  var processBtn = document.getElementById("process");

  processBtn.addEventListener("click", () => {
    var result = document.getElementById("result");

    parameters.height = parseInt(document.getElementById("height").value);
    parameters.weight = parseInt(document.getElementById("weight").value);

    if (!parametersAreValid()) {
      setError(result, getValidationString());
    } else {
      processBtnOnClick(result);
    }
  });
};

setBtnClick();
