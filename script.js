

let inputArray = []
let opIndex = 0;

// expression
function result(no1, no2, op) {
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
buttonsList.forEach((button) => {
    button.addEventListener("click", (event) => {
        const input = event.target.value;
        //check for Number
        if(!isNaN(input)){
            inputArray.push(Number(input));
        } else {
            inputArray.push(input);
        }
        
        document.querySelector(".output").innerText = inputArray.join("")
        opIndex = inputArray.indexOf(6)
    })
});

function getNoOne(inputArray) {     // Get first Numbers
    const noOne = [];

    
    while (typeof inputArray[0] === "number") {
        noOne.push(inputArray.shift());
    }

    console.log("noOne:", noOne);
    getOp(inputArray);
    return noOne;
}

function getOp(inputArray) {           // Get Operator
    const op = [];

    
    if (typeof inputArray[0] !== "number") {
        op.push(inputArray.shift());
        console.log("op:", op);
        getNoTwo(inputArray);
    }
}

function getNoTwo(inputArray) {         // Get second Number
    const noTwo = [];  

    while (typeof inputArray[0] === "number") {
        noTwo.push(inputArray.shift());
    }

    console.log("noTwo:", noTwo);

}



