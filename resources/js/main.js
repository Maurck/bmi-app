const elementsHTML = {
  calcButtonHTML: undefined,
  resultHTML: undefined,
  bmiHTML: undefined,
};

const parameters = [
  {
    name: "weight",
    value: 0,
    min: 0,
    errorMsg: "Error: El peso no puede ser negativo o igual a 0",
  },
  {
    name: "height",
    value: 0,
    min: 0,
    errorMsg: "Error: La altura no puede ser negativa o igual a 0",
  },
];

const getParameter = (name) => {
  return parameters.find((e) => e.name == name);
};

const classifications = [
  {
    name: "Bajo peso",
    max: 18.5,
  },
  {
    name: "Normal",
    max: 25,
  },
  {
    name: "Sobrepeso",
    max: 30,
  },
  {
    name: "Obesidad I",
    max: 35,
  },
  {
    name: "Obesidad II",
    max: 40,
  },
  {
    name: "Obesidad III",
    max: Infinity,
  },
];

const risks = [
  {
    name: "Riesgo Alto",
    conditions: ["Bajo peso", "Obesidad I", "Obesidad II", "Obesidad III"],
    color: "#d63333",
  },
  {
    name: "Riesgo Moderado",
    conditions: ["Sobrepeso"],
    color: "#cbd633",
  },
  {
    name: "Riesgo Bajo",
    conditions: ["Normal"],
    color: "#33d63b",
  },
];

const validateNumericParameters = (parameters) => {
  parameters.forEach((e) => {
    if (e.value <= e.min) {
      throw new Error(e.name);
    }
  });
};

const changeTextColor = (text, color) => {
  text.style.color = color;
};

const setTextInElement = (element, text) => {
  element.innerHTML = text;
};

const getClassification = (bmi) => {
  let classification = "Normal";

  debugger;

  classifications.some((clasif) => {
    if (bmi <= clasif.max) {
      classification = clasif.name;
      return true;
    }
    return false;
  });

  return classification;
};

const setBMIInHTML = (bmi) => {
  setTextInElement(elementsHTML.bmiHTML, `IMC: ${bmi.toFixed(2)}`);
};

const setRiskInHTML = (bmi) => {
  const classification = getClassification(bmi);

  risks.some((risk) => {
    if (risk.conditions.includes(classification)) {
      changeTextColor(elementsHTML.resultHTML, risk.color);
      changeTextColor(elementsHTML.bmiHTML, risk.color);
      setTextInElement(elementsHTML.resultHTML, `resultado: ${risk.name}`);

      return true;
    }
    return false;
  });
};

const calcButtonHTMLOnClick = () => {
  const weight = getParameter("weight").value;
  const height = getParameter("height").value;

  const bmi = (weight / (height * height)) * 10000;

  setBMIInHTML(bmi);
  setRiskInHTML(bmi);
};

const setElementsHTML = () => {
  elementsHTML.calcButtonHTML = document.getElementById("process");
  elementsHTML.resultHTML = document.getElementById("result");
  elementsHTML.bmiHTML = document.getElementById("bmi");
};

const setParamValues = () => {
  getParameter("height").value = parseInt(
    document.getElementById("height").value
  );
  getParameter("weight").value = parseInt(
    document.getElementById("weight").value
  );
};

const resetResults = () => {
  elementsHTML.resultHTML.innerHTML = "Ingrese sus datos";
  changeTextColor(elementsHTML.resultHTML, "white");

  elementsHTML.bmiHTML.innerHTML = "";
  changeTextColor(elementsHTML.bmiHTML, "white");
};

const setBtnClick = () => {
  setElementsHTML();

  elementsHTML.calcButtonHTML.addEventListener("click", () => {
    resetResults();

    setParamValues();

    try {
      validateNumericParameters(parameters);
      calcButtonHTMLOnClick();
    } catch (e) {
      setTextInElement(
        elementsHTML.resultHTML,
        getParameter(e.message).errorMsg
      );
    }
  });
};

setBtnClick();
