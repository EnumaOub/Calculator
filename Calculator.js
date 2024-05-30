const Calculator = {
    "+": function(a, b) {return a + b;},
    "-": function(a, b) {return a - b;},
    "*": function(a, b) {return a * b;},
    "/": function(a, b) {return a / b;},
}

let values = {
    a: "",
    b: "",
    op: "",
    val: "",
    id_clicked: ""
}

function ClickedOp(id) {
    if (id == "*") id = "x";
    if (values.id_clicked == ""){
        values.id_clicked = id;
        let button = document.getElementById(id);
        button.style.opacity = "0.4";
    }
    else if (id == "=") {
        let button_old = document.getElementById(values.id_clicked);
        values.id_clicked = id;
        button_old.style.opacity = "1";
    }
    else {
        let button_old = document.getElementById(values.id_clicked);
        button_old.style.opacity = "1";
        values.id_clicked = id;
        let button_new = document.getElementById(id);
        button_new.style.opacity = "0.4";
    }
}

function ClearData() {
    values.a = String(values.val);
    values.b  = "";
    values.op = "";
}

function operate(op, a, b) {
    let res;
    if (values.b  == "0" && op == "/") {
        const container = document.getElementsByClassName("display")[0];
        container.textContent = `ERROR`
        res = "ERROR"
    }
    else {
       res = Calculator[op](+a, +b); 
    }
    res = Math.round(+res*1000)/1000;
    values.val = res.toString(10);
    Display();
}

function Display() {
    const back = document.getElementById("backdisp");
    const main = document.getElementById("maindisp");
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

function DisplayVal(val) {
    const container = document.getElementsByClassName("display")[0];
    container.textContent = `${values.val}`
}

function GetVal(value) {
    if (values.op == "") {
        if (value == ".") {
            if (!(values.a.includes("."))) {
                values.a += value;
                Display();
            }
        }
        else {
            values.a += value;
            Display();
        }
        
    }
    else if (values.val == "") {
        if (value == ".") {
            if (!(values.b.includes("."))) {
                values.b  += value;
                Display();
            }
        }
        else {
            values.b  += value;
            Display();
        }
    }
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

function GetOp(op_val) {
    if (op_val == "AC") {
        values.val = "";
        ClickedOp("=") // Reset button opacity
        ClearData()
        Display()
    }
    else if (values.val != "" && op_val != "DEL") {
        values.a = (' ' + values.val).slice(1);
        values.b = "";
        values.op = op_val;
        values.val = "";
        Display();
    }
    else if (values.a != ""){
        if (op_val == "=" && values.b  != "") {
            operate(values.op, values.a, values.b)
        }
        else if (op_val == "DEL") {
            if (values.op == "") {
                values.a = values.a.slice(0, -1);
            }
            else if (values.b  == "") {
                values.op = "";
            }
            else if (values.val == "") {
                values.b  = values.b.slice(0, -1);
            }
            else {
                values.val = values.val.slice(0, -1);
            }
            Display()
        }
        
        else {
            values.op = op_val;
            Display()
        }
    }
}


function EventPadNum() {
    const btn_num = document.getElementsByClassName("num");
    for (let btn of Object.values(btn_num)) {
        let value = btn.textContent;
        
        btn.addEventListener("click", (event) => {
            GetVal(value.toString(10));
        });
        
        
    }
}



const operators = ["AC", "+", "-", "*", "/", "="]
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

function EventSpec() {
    const spec_btn = document.getElementsByClassName("spec");
    for (let btn of Object.values(spec_btn)) {
        let value = btn.id;
        btn.addEventListener("click", (event) => {
            GetOp(value);
        });
        

    }
}




function InitCalculator() {
    EventPadNum();
    EventPadOp();
    EventSpec();
    
}


window.addEventListener("keydown", (e) => {
    let num = parseInt(e.key, 10)
    if (!(isNaN(num))) {
        GetVal(num.toString(10));
    }
    else if (operators.slice(1, operators.length).includes(e.key)) {
        GetOp(e.key);
        ClickedOp(e.key);
    }
    else if (e.key == "Enter") {
        GetOp("=");
        ClickedOp("=");
    }
    else if (e.key == ".") {
        GetVal(".");
    }
    else if (e.key === "Backspace" || e.key === "Delete") {
        GetOp("DEL");
    }
    // console.log(e.key)
    // console.log(typeof(e.key))
  });


window.addEventListener('load', InitCalculator);