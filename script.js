class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperand = previousOperandTextElement;
        this.currentOperand = currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.currentOperand !== '') {
            this.compute();
        }
        this.operation=operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
                default:
                    return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDigits.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        }
        else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}


let currentOperandTextElement = document.querySelector('[data-current-operand]');
let previousOperandTextElement = document.querySelector('[data-previous-operand]');
let numberBtn = document.querySelectorAll('[data-number]');
let operationBtn = document.querySelectorAll('[data-operation]');
let deleteBtn = document.querySelector('[data-delete]');
let allClearBtn = document.querySelector('[data-all-clear]');
let equalsBtn = document.querySelector('[data-equals]');

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberBtn.forEach(button =>{
    button.addEventListener('click', () => {
       calculator.appendNumber(button.innerText);
       calculator.updateDisplay();
    }) 
});



equalsBtn.addEventListener('click', () =>{
    calculator.compute();
    calculator.updateDisplay();
    });

    allClearBtn.addEventListener('click', () =>{
        calculator.clear();
        calculator.updateDisplay();
     }); 
     deleteBtn.addEventListener('click', () =>{
        calculator.delete();
        calculator.updateDisplay();
     });  
