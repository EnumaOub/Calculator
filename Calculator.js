// Calculator object allowing to realise our calculation
const Calculator = {
    "+": function(a, b) {return a + b;},
    "-": function(a, b) {return a - b;},
    "*": function(a, b) {return a * b;},
    "/": function(a, b) {return a / b;},
}

// Object which will contain our value
// a: first element
// op: operator
// b: second element
// val: final result
// id_clicked: last clicked operator
let values = {
    a: "",
    b: "",
    op: "",
    val: "",
    id_clicked: ""
}

// List of operators
const operators = ["AC", "+", "-", "*", "/", "="]


// Add some opacity on operator when pressed
function ClickedOp(id) {
    if (id == "*") id = "x"; // Change name of * to x
    if (values.id_clicked == ""){
        values.id_clicked = id;
        let button = document.getElementById(id);
        button.style.opacity = "0.4";
    }
    // Reset the opacity when we press equal
    else if (id == "=") {
        let button_old = document.getElementById(values.id_clicked);
        values.id_clicked = id;
        button_old.style.opacity = "1";
    }
    // Reduce opacity of operator
    else {
        let button_old = document.getElementById(values.id_clicked);
        button_old.style.opacity = "1";
        values.id_clicked = id;
        let button_new = document.getElementById(id);
        button_new.style.opacity = "0.4";
    }
}


// Clear data when "AC" is pressed
function ClearData() {
    values.a = (' ' + values.val).slice(1);
    values.b  = "";
    values.op = "";
}


// Operate the different element when "=" is pressed
function operate(op, a, b) {
    let res;
    // We can't divide by 0
    if (values.b  == "0" && op == "/") {
        const container = document.getElementsByClassName("display")[0];
        container.textContent = `ERROR`
        res = "ERROR"
    }
    else {
       res = Calculator[op](+a, +b); 
    }
    // Calculate while rounding
    res = Math.round(+res*1000)/1000;
    values.val = res.toString(10);
    Display();
}


// Allow to display result
function Display() {
    const back = document.getElementById("backdisp"); // Secondary display
    const main = document.getElementById("maindisp"); // Main display
    let operator;
    if (values.op == "*") {
        operator = "x";
    }
    else {
        operator = values.op;
    }
    if (values.op == "") {
        back.textContent = ``
        main.textContent = `${values.a}`
    }
    else if (values.b  == "") {
        back.textContent = `${values.a}`
        main.textContent = `${operator}`
    }
    else if (values.val == "") {
        back.textContent = `${values.a} ${operator}`
        main.textContent = `${values.b}`
    }
    else {
        back.textContent = `${values.a} ${operator} ${values.b}`
        main.textContent = `${values.val}`
    }

}


// Add value to "a" and "b" values
function AddValue(value, num) {
    if (value == ".") {
        if (!(num.includes("."))) {
            num += value;
        }
    }
    else {
        num += value;
        
    }
    return num;
}


// Get value when pad numeric is pressed
function GetVal(value) {
    // Check if operator is not yet pressed to add to "a"
    if (values.op == "") {
        values.a = AddValue(value, values.a);
        Display();
        
    }
    // Check if we have final result in order to add to "b" to allow to modify final result afterward
    else if (values.val == "") {
        values.b = AddValue(value, values.b);
        Display();
    }
    // We reset final value
    else {
        values.val = ""
        values.b = ""
        values.op = ""
        if (value == ".") {
            values.a  = "0" + value;
            Display();
            
        }
        else {
            values.a = value
            Display();
        }
    }
}


// Delete element of value when delete button is pressed
function DelVal() {
    if (values.op == "") {
        values.a = values.a.slice(0, -1);
    }
    else if (values.b  == "") {
        values.op = "";
        ClickedOp("=") // Reset button opacity
    }
    else if (values.val == "") {
        values.b  = values.b.slice(0, -1);
    }
    else {
        values.val = values.val.slice(0, -1);
    }
}


// Get operator value when pressed
function GetOp(op_val) {
    if (op_val == "AC") {
        values.val = "";
        ClickedOp("=") // Reset button opacity
        ClearData() // Reset all values
        Display()
    }
    // Allow to operate on previous result
    else if (values.val != "" && op_val != "DEL") {
        ClearData();
        values.op = op_val;
        values.val = "";
        Display();
    }
    else if (values.a != ""){
        // If "=" operate
        if (op_val == "=" && values.b  != "") {
            operate(values.op, values.a, values.b)
        }
        else if (op_val == "DEL") {
            DelVal()
            Display()
        }
        
        else {
            values.op = op_val;
            Display()
        }
    }
}


// Initalise events of numeric pad
function EventPadNum() {
    const btn_num = document.getElementsByClassName("num");
    for (let btn of Object.values(btn_num)) {
        let value = btn.textContent;
        btn.addEventListener("click", (event) => {
            GetVal(value.toString(10));
        });
    }
}


// Initalise events of operator pad
function EventPadOp() {
    const op_btn = document.getElementsByClassName("op");
    for (let btn of Object.values(op_btn)) {
        let value = btn.id;
        if (value == "x") value = "*";
        btn.addEventListener("click", (event) => {
            GetOp(value);
            ClickedOp(value);
        });
    }
}


// Initalise events of special pad 
function EventSpec() {
    const spec_btn = document.getElementsByClassName("spec");
    for (let btn of Object.values(spec_btn)) {
        let value = btn.id;
        btn.addEventListener("click", (event) => {
            GetOp(value);
        });
    }
}


// Initialise the buttons with their listener
function InitCalculator() {
    EventPadNum();
    EventPadOp();
    EventSpec();
}


// Part that allow to use key buttons in order to use the calculator
window.addEventListener("keydown", (e) => {
    // try to get integer from the key and check if is not nan
    let num = parseInt(e.key, 10) 
    if (!(isNaN(num))) {
        GetVal(num.toString(10));
    }
    // check if key if in the list of container setted
    else if (operators.slice(1, operators.length).includes(e.key)) {
        GetOp(e.key);
        ClickedOp(e.key);
    }
    // If we push the key "Enter" we get equal
    else if (e.key == "Enter") {
        GetOp("=");
        ClickedOp("=");
    }
    // Detect dot 
    else if (e.key == ".") {
        GetVal(".");
    }
    // detect delete key
    else if (e.key === "Backspace" || e.key === "Delete") {
        GetOp("DEL");
    }
});


window.addEventListener('load', InitCalculator);