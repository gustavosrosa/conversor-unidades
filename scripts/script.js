document.addEventListener("DOMContentLoaded", () => {

    const state = {
        quantityValid: false,
        parametersValid: false
    }

    document.getElementById("quantity").addEventListener("input", (e) => {
        state.quantityValid = verifyIfFieldQtdValid(e);
        tryShowItems();
    });

    document.getElementById("for").addEventListener("change", (e) => {
        state.parametersValid = verifyOptionsToConvert(e, "of");
        tryShowItems();
    });

    document.getElementById("of").addEventListener("change", (e) => {
        state.parametersValid = verifyOptionsToConvert(e, "for");
        tryShowItems();
    });

    function tryShowItems() {
        const valid = state.quantityValid || state.parametersValid;
        showItems(valid);
    }

});

function converter() {
    const quantity = document.getElementById("quantity").value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const optionSelectedOf = document.getElementById("of").value;
    const optionSelectedFor = document.getElementById("for").value;

    let quantityConvertedToDefaultMeters = convertToDefaultMeters(quantity, optionSelectedOf);
    let convertToUnit = convertToSwitchedUnit(quantityConvertedToDefaultMeters, optionSelectedFor).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    document.getElementById("result").value = convertToUnit;

    innerResultInFull(quantity, convertToUnit);
}

function convertToDefaultMeters(qtd, optionSelectedOf) {
    const options = { kilometer: { id: "kilometerOf", op: qtd * 1000 }, centimeter: { id: "centimeterOf", op: qtd / 100 }, milimeter: { id: "milimeterOf", op: qtd / 1000 } }
    return switchFunction(qtd, options, optionSelectedOf)
}

function convertToSwitchedUnit(qtd, optionSelectedFor) {
    const options = { kilometer: { id: "kilometerFor", op: qtd / 1000 }, centimeter: { id: "centimeterFor", op: qtd * 100 }, milimeter: { id: "milimeterFor", op: qtd * 1000 } }
    return switchFunction(qtd, options, optionSelectedFor)
}

function switchFunction(qtd, options, selected) {
    switch (selected) {
        case options.kilometer.id: return options.kilometer.op;
        case options.centimeter.id: return options.centimeter.op;
        case options.milimeter.id: return options.milimeter.op;
        default: return qtd;
    }
}

function verifyOptionsToConvert(event, option) {
    const element = document.getElementById(option).selectedOptions[0].textContent;
    const optionOf = event.target.selectedOptions[0].textContent;

    return element == optionOf;
}

function verifyIfFieldQtdValid(qtd) {
    return (qtd.target.value <= 0 || qtd.target.value == '');
}

function showItems(boolean) {
    document.getElementById("submit-button").disabled = boolean;
    
    showResultFooter(boolean);
}

function innerResultInFull(initial, final) {
    const optionOf = document.getElementById("of").selectedOptions[0].textContent;
    const optionFor = document.getElementById("for").selectedOptions[0].textContent;
    document.getElementById("inFull").innerHTML = `<p>Ou seja, ${initial} ${optionOf.toLowerCase()} são ${final} ${optionFor.toLowerCase()}!</p>`;
}

function showResultFooter(boolean) {
    if (boolean) document.getElementById("inFull").style.display = "none";
    else document.getElementById("inFull").style.display = "block";
}
