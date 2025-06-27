// Global Variables

let inputArray = [];
let opIndex = 0;

// Global Constants
const resultbutton  = document.querySelector(".resultbutton");
const resetbutton  = document.querySelector(".resetbutton");
const buttonsList = document.querySelectorAll(".button")

//button listener for all buttons except reset and result
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

resultbutton.addEventListener("click", () => {  // Start Calc
        console.log("Result clicked")
        calculate(inputArray)

    });


resetbutton.addEventListener("click", () => {         // Wipe all
    inputArray.length = 0;

    const outputtoreset = document.querySelector(".output");
    outputtoreset.textContent = "";
})


function fixNumbers(inputArray) {           // Fixing Numbers 5 5 5 to 555
    const result = [];
    let numberBuffer = [];

    for (let item of inputArray) {
        if (typeof item === "number") {
            numberBuffer.push(item);
        } else if (typeof item === "string") {
            if (numberBuffer.length > 0) {
                const number = parseInt(numberBuffer.join(""), 10);
                result.push(number);
                numberBuffer = [];
            }
            result.push(item); // add Operator
        }
    }

    // Push last Number
    if (numberBuffer.length > 0) {
        const number = parseInt(numberBuffer.join(""), 10);
        result.push(number);
    }
    
    return result;
}




function calculate(inputArray) {
    const fixedNumbers = fixNumbers(inputArray); // ← Ziffern zu Zahlen zusammensetzen

    const firstPass = [];

    let i = 0;
    while (i < fixedNumbers.length) {
        const current = fixedNumbers[i];

        if (typeof current === "number") {
            firstPass.push(current);
            i++;
        } else if (current === "*" || current === "/") {
            const left = firstPass.pop();
            const right = fixedNumbers[i + 1];

            if (typeof right !== "number") {
                throw new Error("ERROR: Operator ohne rechte Zahl.");
            }

            const result = current === "*" ? left * right : left / right;
            firstPass.push(result);
            i += 2;
        } else {
            firstPass.push(current);
            i++;
        }
    }

    let result = firstPass[0];
    for (let j = 1; j < firstPass.length; j += 2) {
        const op = firstPass[j];
        const next = firstPass[j + 1];

        if (op === "+") result += next;
        else if (op === "-") result -= next;
    }

    console.log("Ergebnis:", result);
    return result;
}




const result = calculate(inputArray);
console.log(calculate(inputArray))


