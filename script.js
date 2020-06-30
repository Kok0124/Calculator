
// To-Do : negativ numbers (+- -> - ...), kerekítés, foolproof, keyboard-support

let actualNumber = "";
let prevOperations = [];
let hanginAfterCalculation = false;

// When numbers are pressed I put them in a string

function addToScreen(number) {
    if (hanginAfterCalculation == true) {
        actualNumber = "";
        hanginAfterCalculation = false;
    }
    actualNumber += number.toString();
    currentOperand.innerHTML = actualNumber;
}

// When an operations is pressed I put the number-string thing + the operator in the prevScreen, az reset the current screen & stirng

function addToPrevScreen(operand) {
    prevOperations.push(Number(actualNumber), operand);
    prevOperand.innerHTML = prevOperations.join(" ");

    actualNumber = "";
    currentOperand.innerHTML = actualNumber;
}

// remove the last number

function remove() {
    actualNumber = actualNumber.slice(0, -1);
    currentOperand.innerHTML = actualNumber;
}

// self-explanatory

function clearAll() {
    actualNumber = "";
    prevOperations = [];
    currentOperand.innerHTML = "";
    prevOperand.innerHTML = "";
}

// the maths

function add(number1, number2) {
    return +number1 + +number2;
}

function substract(number1, number2) {
    return +number1 - +number2;
}

function multiply(number1, number2) {
    return +number1 * +number2;
}

// dividing with 0 is a no-no

function divide(number1, number2) {
    if (number2 == 0) {
        return "Error";
        clearAll();
    }
    return +number1 / +number2;
}

// Call this function to get part-results (see the calculate function)

function operate(operator, number1, number2) {
    return (operator === "+") ? add(number1, number2)
    : (operator === "-") ? substract(number1, number2)
    : (operator === "*") ? multiply(number1, number2)
    : (operator === "/") ? divide(number1, number2)
    : "Unexpected Error";
}

// This function is called when pressing '='

function calculate() {
    prevOperations.push(Number(actualNumber)); // push the last number into the array, so we can work with it

    let i = 0, temp = 0;
    // First we do the '*' and '/' operations. WE go through the whole array. if the array length is 1, ther is no other operations.
    // IF we reached the end , get out the loop and do the least powerful operations. 
    while (prevOperations.length != 1) { 
        if (prevOperations[i] == "*" || prevOperations[i] == "/") {
            temp = operate(prevOperations[i], prevOperations[i-1], prevOperations[i+1])
            prevOperations.splice(i-1, 3, temp);
            i--;
            continue;
        }
        i++;
        if (i == prevOperations.length) break;
    }
    i = 0; // reset the index-variable
    while (prevOperations.length != 1) {
        if (prevOperations[i] == "+" || prevOperations[i] == "-") {
            temp = operate(prevOperations[i], prevOperations[i-1], prevOperations[i+1])
            prevOperations.splice(i-1, 3, temp);
            i--;
            continue;
        }
        i++;
    }
    
    // The result is the only element of the prev... array. Only the result is shown, delete the history.
    actualNumber = prevOperations[0];

    prevOperations = [];
    currentOperand.innerHTML = actualNumber;
    prevOperand.innerHTML = prevOperations;
    hanginAfterCalculation = true; // This is needed for further using, see addToScreen function to see why.
}

// Get the variables

const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const equals = document.querySelector("[data-equals]");
const clear = document.querySelector("[data-clear]");
const del = document.querySelector("[data-delete]");
const currentOperand = document.querySelector("[data-current-operand]");
const prevOperand = document.querySelector("[data-prev-operand]");

// Get the inputs

numbers.forEach(button => {
    button.addEventListener("click", () => {
        addToScreen(button.innerText);
    });
});

operations.forEach(button => {
    button.addEventListener("click", () => {
        addToPrevScreen(button.innerText);
    });
});

del.addEventListener("click", button => {
    remove();
});

clear.addEventListener("click", button => {
    clearAll();
});

equals.addEventListener("click", button => {
    if (actualNumber.length == 0 || prevOperations.length == 0) return;
    calculate();
});