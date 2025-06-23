document.getElementById("quantity").addEventListener("input", (qtd) => {
    setButtonDisabled(verifyIfFieldQtdValid(qtd));
});

document.getElementById("for").addEventListener("change", (event) => {
    setButtonDisabled(verifyOptionsToConvert(event, "of"));
});

document.getElementById("of").addEventListener("change", (event) => {
    setButtonDisabled(verifyOptionsToConvert(event, "for"));
});

function converter() {
    const quantity = document.getElementById("quantity").value;
    const optionSelectedOf = document.getElementById("of").value;
    const optionSelectedFor = document.getElementById("for").value;

    let quantityConvertedToDefaultMeters = convertToDefaultMeters(quantity, optionSelectedOf);
    let convertToUnit = convertToSwitchedUnit(quantityConvertedToDefaultMeters, optionSelectedFor).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    document.getElementById("result").value = convertToUnit;
}

function convertToDefaultMeters(qtd, optionSelectedOf) {

    const options = { kilometer: "kilometerOf", centimeter: "centimeterOf", milimeter: "milimeterOf" }
    return switchFunctionOf(qtd, options, optionSelectedOf)
 
}

function convertToSwitchedUnit(qtd, optionSelectedFor) {

    const options = { kilometer: "kilometerFor", centimeter: "centimeterFor", milimeter: "milimeterFor" }
    return switchFunctionFor(qtd, options, optionSelectedFor)
}

function switchFunctionOf(qtd, options, selected) {
    switch (selected) {
        case options.kilometer: return qtd * 1000;
        case options.centimeter: return qtd / 100;
        case options.milimeter: return qtd / 1000;
        default: return qtd;
    }
}

function switchFunctionFor(qtd, options, selected) {
    switch (selected) {
        case options.kilometer: return qtd / 1000;
        case options.centimeter: return qtd * 100;
        case options.milimeter: return qtd * 1000;
        default: return qtd;
    }
}

function verifyOptionsToConvert(event, option) {
    const element = document.getElementById(option).selectedOptions[0].textContent;
    const optionOf = event.target.selectedOptions[0].textContent;

    return element == optionOf;
}

function verifyIfFieldQtdValid(qtd) {
    return qtd.target.value <= 0 || qtd.target.value == '';
}

function setButtonDisabled(boolean) {
    document.getElementById("submit-button").disabled = boolean;
}
