
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
    prevOperations.push(actualNumber, operand);
    prevOperand.innerHTML = prevOperations.join(" ");

    actualNumber = "";
    currentOperand.innerHTML = actualNumber;
}

// can't call it delete or del

function remove() {
    actualNumber = actualNumber.slice(0, -1);
    currentOperand.innerHTML = actualNumber;
}

// can't name it clear :( )

function clearAll() {
    actualNumber = "";
    prevOperations = [];
    currentOperand.innerHTML = "";
    prevOperand.innerHTML = "";
}

function add(number1, number2) {
    return +number1 + +number2;
}

function substract(number1, number2) {
    return +number1 - +number2;
}

function multiply(number1, number2) {
    return +number1 * +number2;
}

function divide(number1, number2) {
    if (number2 == 0) {
        return "Error";
        clearAll();
    }
    return +number1 / +number2;
}

function operate(operator, number1, number2) {
    return (operator === "+") ? add(number1, number2)
    : (operator === "-") ? substract(number1, number2)
    : (operator === "*") ? multiply(number1, number2)
    : (operator === "/") ? divide(number1, number2)
    : "Unexpected Error";
}


function calculate() {
    prevOperations.push(actualNumber);


    
    actualNumber = operate(prevOperations[1], prevOperations[0], prevOperations[2]);



    prevOperations = [];
    currentOperand.innerHTML = actualNumber;
    prevOperand.innerHTML = prevOperations;
    hanginAfterCalculation = true;
}

function calculate2() {
    let temp = 0;
    prevOperations.push(actualNumber);
    let length = prevOperations.length;
   // console.log(prevOperations); prevOperations array looks like this: [num, op, num, op, ... ,num]
   for (let i = 0; i < length; i++) {
       if (prevOperations[i] === "*" || prevOperations[i] === "/") {
            temp = operate(prevOperations[i], prevOperations[i-1], prevOperations[i+1]);
            prevOperations.slice(i-1, 3, temp);
            length -= 2;
            
       }
   }
  for (let i = 0; i < prevOperations.length; i++) {
        if (prevOperations[i] == "+" || prevOperations[i] == "-") {
         temp = operate(prevOperations[i], prevOperations[i-1], prevOperations[i+1]);
         prevOperations.slice(i-1, 3, temp);
         i--;
        }
    }
    actualNumber = prevOperations[0];
    currentOperand.innerHTML = actualNumber;
}

const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const equals = document.querySelector("[data-equals]");
const clear = document.querySelector("[data-clear]");
const del = document.querySelector("[data-delete]");
const currentOperand = document.querySelector("[data-current-operand]");
const prevOperand = document.querySelector("[data-prev-operand]");

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