const _d = document;
const inputBoxes = _d.querySelectorAll(".input-box");
const errClassName = 'incorrect-value';

const generateErrorLabel = (fieldId) => {
    const id = `${fieldId}--incorrect`
    const isButton = fieldId == "button"
    const qSymbol = (isButton ? '.' : '#');
    if (!_d.querySelector('#' + id) && _d.querySelector(qSymbol + fieldId)) {
        const errorLabel = _d.createElement('label');
        errorLabel.id = id;
        errorLabel.innerHTML = isButton ? 'все поля должны быть заполнены' : 'некорректное значение';
        errorLabel.classList.add(errClassName);

        const parentElement = _d.querySelector(qSymbol + fieldId);
        parentElement.appendChild(errorLabel);
    }
}

const fieldNotValide = (fieldId, returnObj) => {
    const errorLabel = _d.querySelector(`#${fieldId}--incorrect`);
    const className = `${errClassName}--show`;
    const hasError = errorLabel.classList.contains(className);
    return returnObj ? {
        hasError: hasError,
        errorLabel: errorLabel,
        className: className
    } : hasError;
}

const toggleValidationError = (fieldId, action = 'SHOW') => {
    const { hasError, errorLabel, className } = fieldNotValide(fieldId, true);
    console.log('action', action, 'error', hasError);
    if (hasError && action === "HIDE")
        errorLabel.classList.remove(className);
    else if (!hasError && action === "SHOW")
        errorLabel.classList.add(className);
}

(function () {
    generateErrorLabel('button');
    inputBoxes.forEach(element => {
        generateErrorLabel(element.id);

        element.addEventListener('input', (e) => {
            switch (element.id) {
                case "name-field":
                    break;
                case "email-field":
                    if (e.target.value.length == 0) {
                        toggleValidationError(element.id, "HIDE");
                        break;
                    }
                    const reg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
                    if (!reg.test(e.target.value)) toggleValidationError(element.id, "SHOW");
                    else toggleValidationError(element.id, "HIDE");
                    break;
                case "phone-field":
                    break;
                case "text-field":
                    break;
            }
        })
    })
}())

export function IsAllFieldsFilled() {
    let succsess = true;
    inputBoxes.forEach(parent => {
        const input = parent.children[0]
        const hasErr = fieldNotValide(parent.id);
        if (input.value.length == 0 || hasErr) succsess = false;
    })
    if (!succsess) toggleValidationError('button');
    else toggleValidationError('button', "HIDE");
    return succsess;
}