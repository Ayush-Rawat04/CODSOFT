const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    display.value = currentInput;
}

function inputNumber(number) {
    if (waitingForSecondOperand === true) {
        currentInput = number;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
}

function inputDecimal(dot) {
    if (waitingForSecondOperand === true) return;
    if (!currentInput.includes(dot)) {
        currentInput += dot;
    }
    updateDisplay();
}

function clearCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function performCalculation(op, secondOperand) {
    const first = parseFloat(firstOperand);
    const second = parseFloat(secondOperand);

    if (isNaN(first) || isNaN(second)) return;

    if (op === 'add') return first + second;
    if (op === 'subtract') return first - second;
    if (op === 'multiply') return first * second;
    if (op === 'divide') {
        if (second === 0) {
            alert("Error: Division by zero is not allowed!");
            return 'Error';
        }
        return first / second;
    }
    return secondOperand;
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation(operator, inputValue);
        
    
        currentInput = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}


buttons.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.matches('button')) return; 

    if (target.classList.contains('btn-number')) {
        inputNumber(target.dataset.value);
        return;
    }

    if (target.classList.contains('btn-operator')) {
        const action = target.dataset.action;
        if (action === 'delete') {
            deleteLast();
        } else {
            handleOperator(action);
        }
        return;
    }
    
    if (target.classList.contains('btn-equal')) {
        handleOperator('calculate'); 
        return;
    }

    if (target.classList.contains('btn-clear')) {
        clearCalculator();
        return;
    }
});

updateDisplay();