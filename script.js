let no1 = 4;
let no2 = 2;
let op = "/";

// expression
function operate(no1, no2, op) {
    if (op === "+") return add(no1, no2);
    if (op === "-") return subtract(no1, no2);
    if (op === "*") return multiply(no1, no2);
    if (op === "/") return divide(no1, no2)
}

// operators
function add(no1, no2) {
    return (no1 + no2);
}

function subtract(no1, no2) {
    return (no1 - b)
}

function multiply(no1, no2) {
    return (no1 * no2)
}

function divide(no1, no2) {
    return (no1 / no2)
}

//button listener
const buttonsList = document.querySelectorAll(".button")
const buttons = Array.from(buttonsList)
console.log(buttons)
console.log(operate(no1, no2, op))