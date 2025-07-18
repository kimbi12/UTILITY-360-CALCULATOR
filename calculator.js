const display = document.getElementById("calc-display");
let degMode = true;

function insertNumber(num) {
    display.value += num;
}

function insertSymbol(symbol) {
    display.value += symbol;
}

function insertFunc(func) {
    if (func === "sqrt") {
        display.value += "sqrt(";
    } else if (func === "factorial") {
        display.value += "!";
    } else {
        display.value += func + "(";
    }
}

function insertPower() {
    display.value += "^";
}

function clearDisplay() {
    display.value = "";
}

function deleteChar() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace symbols with JavaScript functions
        let exp = display.value.replace(/÷/g, "/")
                               .replace(/×/g, "*")
                               .replace(/sqrt/g, "Math.sqrt")
                               .replace(/sin/g, degMode ? "Math.sin(toRadians(" : "Math.sin(")
                               .replace(/cos/g, degMode ? "Math.cos(toRadians(" : "Math.cos(")
                               .replace(/tan/g, degMode ? "Math.tan(toRadians(" : "Math.tan(")
                               .replace(/log/g, "Math.log10")
                               .replace(/ln/g, "Math.log");

        // Power handling (e.g., x^y)
        exp = exp.replace(/(\d+)\^(\d+)/g, "Math.pow($1, $2)");

        display.value = eval(exp + ")".repeat((exp.match(/\(/g) || []).length - (exp.match(/\)/g) || []).length));
    } catch (error) {
        display.value = "Error";
    }
}

function toggleDegRad() {
    degMode = !degMode;
    document.querySelector("button.function").innerHTML = deg/redMode ? "deg" : "rad";
}

function toRadians(angle) {
    return (angle * Math.PI) / 180;
}

