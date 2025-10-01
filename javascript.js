let num1 = ""
let num2 = ""
let op = ""
let storedValue = ""
let final = ""
let swapStoredValue = false
let finalCalculated = false

const subDisplay = document.getElementById("subDisplay") //subDisplay
const mainDisplay = document.getElementById("mainDisplay") //mainDisplay

const intBtn = document.querySelectorAll(".int") // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
const opBtn = document.querySelectorAll(".op") // +, -, x, /
const comp = document.getElementById("compute") // =
const clear = document.querySelectorAll(".clear")

const zero = document.getElementById("zero") // 0
const decimal = document.getElementById("decimal") //.

decimal.disabled = false
zero.disabled = true

function operate(n1, n2, operator) {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    let result = 0;

    if (operator === "+") {
        result = firstNum + secondNum;
    } else if (operator === "-") {
        result = firstNum - secondNum;
    } else if (operator === "x") {
        result = firstNum * secondNum;
    } else if (operator === "/") {
        result = firstNum / secondNum;
    }

    // round to 8 decimal places, then remove trailing zeros
    console.log(result.toPrecision(6))
    return parseFloat(result.toPrecision(8))
}

function formatNumber(number, decimals){
    const one = number.toFixed(decimals)
    return parseFloat(one)

}

function removeTrailingZeros(number){
    if (parseFloat(number) !== number){
        return parseFloat(number)
    }
    return number
}

intBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        
        if (mainDisplay.textContent == "0" || mainDisplay.textContent == final){
            mainDisplay.textContent = ""
        }
        
        if (e.target.textContent !== 0){
            zero.disabled = false
        }

        storedValue += e.target.textContent

        if (!swapStoredValue){
            num1 = storedValue
        }
        else if (swapStoredValue) {
            num2 = storedValue
        }

        mainDisplay.textContent += btn.textContent
        console.log("num1: " + num1)
        console.log("num2: " + num2)
        console.log("op: " + op)
        console.log("storedValue: " + storedValue)
        console.log("final: " + final)
    })

})

opBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        
        decimal.disabled = false
        zero.disabled = true
        storedValue = ""
        swapStoredValue = true

        if (mainDisplay.textContent == final){
            num1 = final
            swapStoredValue = true
        }
        //Operates num1 and num2 if operating 3 or more numbers
        if (num1 !== "" && num2 !== "") {
            if (typeof operate(num1, num2, op) === "number" && !isNaN(operate(num1, num2, op))){
                if (!finalCalculated){
                    final = operate(num1, num2, op);
                    mainDisplay.textContent = final;
                    num1 = final;
                }
            }
        }
        //Changes operator if swapped
        if ("+-x/".includes(mainDisplay.textContent.slice(-1))) {
            mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
        }
        
        op = e.target.textContent
        mainDisplay.textContent += btn.textContent
    })
})

compute.addEventListener("click", function (e) {
    removeTrailingZeros(num1)
    removeTrailingZeros(num2)
    decimal.disabled = false
    zero.disabled = true

    if(op !== "" && num2 == ""){
        num2 = num1
        final = operate(num1, num2, op)
        mainDisplay.textContent = final
        storedValue = ""
        finalCalculated = true
        swapStoredValue = false
        console.log("1")
    }
    //has all num1, num2, and op
    else if (finalCalculated == false && num1 !== "" && num2 !== "") {
        //repeatedly operates final if cotinually pressing =
        final = operate(num1, num2, op)
        mainDisplay.textContent = final
        storedValue = ""
        finalCalculated = true
        swapStoredValue = false
        console.log("2")
    }
    // only num1 and final
    else if (finalCalculated == true){
        if (storedValue == ""){
            num1 = final
        }
        final = operate(num1, num2, op)
        mainDisplay.textContent = final
        storedValue = ""
        finalCalculated = true
        swapStoredValue = false
        console.log("3")
    }
})

clear.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        mainDisplay.textContent = "0"
        num1 = ""
        num2 = ""
        op = ""
        storedValue = ""
        final = ""
        swapStoredValue = false
        finalCalculated = false
        decimal.disabled = false
        zero.disabled = true
    })
})

decimal.addEventListener("click", function (e) {
    decimal.disabled = true
    if (storedValue === "" && mainDisplay.textContent !== "0"){
        
        mainDisplay.textContent += "0"
    }
    storedValue += e.target.textContent
    mainDisplay.textContent += e.target.textContent

})

// console.log(add(num1, num2))
// console.log(subtract(num1, num2))
// console.log(multiply(num1, num2))
// console.log(divide(num1, num2))
// console.log(operate(num1, num2, "+"))