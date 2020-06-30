// Öszeadás, kivonás, szorzás. osztás  -> 4 gomb, 10 szám, clear, 

const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const equals = document.querySelector("[data-equals]");
const clear = document.querySelector("[data-clear]");
const del = document.querySelector("[data-delete]");
const currentOperand = document.querySelector("[data-current-operand]");
const prevOperand = document.querySelector("[data-prev-operand]");