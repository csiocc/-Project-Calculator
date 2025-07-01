// Global Variables

let inputArray = [];
let opIndex = 0;

// Global Constants
const resultbutton  = document.querySelector(".resultbutton");
const resetbutton  = document.querySelector(".resetbutton");
const buttonsList = document.querySelectorAll(".button")
const backspace = document.querySelector(".backspace")


buttonsList.forEach((button) => {                                                   //button listener for all buttons except reset and result dot and backspace
    button.addEventListener("click", (event) => {
        const input = event.target.value;
        
        if(!isNaN(input)){                                                          //check for Number
            inputArray.push(Number(input));
        } else {
            inputArray.push(input);
        } 
        document.querySelector(".output").innerText = inputArray.join("")
        opIndex = inputArray.indexOf(6)
    })
});

resetbutton.addEventListener("click", () => {                                       // Wipe all
    inputArray.length = 0;
    document.querySelector(".output").innerText = inputArray.join("")

})

backspace.addEventListener("click", () => {                                       // Delete last input
    const ix = inputArray.length;
    inputArray.pop();
    document.querySelector(".output").innerText = inputArray.join("")

})


function fixNumbers(inputArray) {
    const result = [];
    let numberBuffer = [];

    for (let item of inputArray) {
        if (typeof item === "number" || item === ".") {
            numberBuffer.push(item);
        } else if (typeof item === "string") {
            if (numberBuffer.length > 0) {
                const joined = numberBuffer.join("");
                const parsed = parseFloat(joined);                                  // 💡 parseFloat for non integers
                if (isNaN(parsed)) {
                    throw new Error("ERROR");
                }
                result.push(parsed);
                numberBuffer = [];
            }
            result.push(item);                                                      // Operator
        }
    }

    
    if (numberBuffer.length > 0) {                                                  // Letzte Zahl anhängen
        const joined = numberBuffer.join("");
        const parsed = parseFloat(joined);
        if (isNaN(parsed)) {
            throw new Error("ERROR");
        }
        result.push(parsed);
    }

    return result;
}


function calculate(inputArray) {                                                    // Calc
    try {
        const fixedNumbers = fixNumbers(inputArray);                                // Numbers to fixed Numbers 5 5 -> 55

        const firstPass = [];

        let i = 0;
        while (i < fixedNumbers.length) {
            const current = fixedNumbers[i];
            const second = fixedNumbers[i +1]
            if (typeof current === "number") {
                firstPass.push(current)
                i++;
            } 
            else if (current === "%") {
                const left = firstPass.pop();
                const right = fixedNumbers[i + 1];

                if (typeof left !== "number") {
                    throw new Error("ERROR")
                }

                if (typeof right === "number") {
                    firstPass.push((left / 100) * right);                           // If 2 Numbers
                    i += 2;
                } else {                       
                    firstPass.push(left / 100);
                    i += 1;
                }
            }
            else if (current === "pi") {
                const left = firstPass.pop()
                const pi = 3.1415;
                firstPass.push(left * pi)
                i += 1;
            }    
            else if (current ==="*" && second === "pi") {
                const left = firstPass.pop()
                const pi = 3.1415;
                firstPass.push(left * pi / pi)
                i += 1;
            }
            else if (current === "*" || current === "/") {
                const left = firstPass.pop();
                const right = fixedNumbers[i + 1];
            
                
            if (typeof left !== "number" || typeof right !== "number") {            // Error check
                throw new Error("ERROR");
            }

            if (right === 0) {
                alert("dont divide by 0")
                throw new Error("dont divide by 0")
                
            }

                const result = current === "*" ? left * right : left / right;       // Muli and Div
                firstPass.push(result);
                i += 2;
            } else if (current === "+" || current === "-") {
                firstPass.push(current);
                i++;
            } else {
                throw new Error("ERROR");
            }
        
        }
        
        for (let j = 0; j < firstPass.length; j += 2) {                                // Valid Form check
            if (typeof firstPass[j] !== "number") {
                throw new Error("ERROR");
            }
        }

        let result = firstPass[0];
        for (let j = 1; j < firstPass.length; j += 2) {
            const op = firstPass[j];
            const next = firstPass[j + 1];

            if (typeof next !== "number") {
                throw new Error("ERROR");
            }
            if (op === "+") result += next;
            else if (op === "-") result -= next;
            else throw new Error("ERROR");
        }

        return result;

    } catch (err) {
        console.error("Error:", err.message);
        return "ERROR";
    }
}



resultbutton.addEventListener("click", () => {                                                 // Result
        
        const outputResult = calculate(inputArray);

        if (outputResult === "ERROR") {
            document.querySelector(".output").innerText = "ERROR";
            } else {
            const format = Number.isInteger(outputResult) 
            ? outputResult.toString()                                                           // If Integer 
            : outputResult.toFixed(4);                                                          // If non Integer
            document.querySelector(".output").innerText = format;
        }

        inputArray = [];
});                                                        
   