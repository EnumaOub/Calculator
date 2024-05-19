const Calculator = {
    add: function(a, b) {return a + b;},
    substract: function(a, b) {return a - b;},
    multiply: function(a, b) {return a * b;},
    divide: function(a, b) {return a / b;},
}


let a = "";
let b = "";
let op = "";
let res = "";
let id_clicked = "";
let dot_clicked = false;

function ClickedOp(id) {
    if (id_clicked == ""){
        id_clicked = id;
        let button = document.getElementById(id);
        button.style.opacity = "0.4";
    }
    else if (id == "=" || id == "C") {
        let button_old = document.getElementById(id_clicked);
        button_old.style.opacity = "1";
    }
    else {
        let button_old = document.getElementById(id_clicked);
        button_old.style.opacity = "1";
        id_clicked = id;
        let button_new = document.getElementById(id);
        button_new.style.opacity = "0.4";
    }
}

function ClearData() {
    a = String(res);
    b = "";
    op = "";
    dot_clicked = false;
}

function operate(op, a, b) {
    let operator;
    if (op == "+"){ 
        operator = "add";
        res = Calculator[operator](+a, +b);
    }
    else if (op == "-"){ 
        operator = "substract";
        res = Calculator[operator](+a, +b);
    }
    else if (op == "*"){ 
        operator = "multiply";
        res = Calculator[operator](+a, +b);
    }
    else if (op == "/"){ 
        operator = "divide";
        if (b == "0") {
            const container = document.getElementsByClassName("display")[0];
            container.textContent = `ERROR`
        }
        else {
            res = Calculator[operator](+a, +b);
        }
        
    }
    res = Math.round(+res*1000)/1000
    DisplayVal(res);
    ClearData()
}

function Display() {
    const container = document.getElementsByClassName("display")[0];
    container.textContent = `${a} ${op} ${b}`
}

function DisplayVal(val) {
    const container = document.getElementsByClassName("display")[0];
    container.textContent = `${val}`
}

function GetVal(val) {

    if (op == "") {
        if (val == ".") {
            if (!(a.includes("."))) {
                a += val;
                Display();
            }
        }
        else {
            a += val;
            Display();
        }
        
    }
    else {
        if (val == ".") {
            if (!(b.includes("."))) {
                b += val;
                Display();
            }
        }
        else {
            b += val;
            Display();
        }
        
    }
}

function GetOp(op_val) {
    if (op_val == "C") {
        res = "";
        ClearData()
        Display()
    }
    else if (a != ""){
        if (op_val == "=" && b != "") {
            operate(op, a, b)
        }
        else {
            op = op_val;
            Display()
        }
    }
}

const pad_w_btn = 40;
const pad_h_btn = 10;

function CreatePadNum() {
    const container = document.getElementsByClassName("calculator")[0];
    const value_order = [7,8,9,4,5,6,1,2,3,0]
    const nb_container = document.createElement("div");
    nb_container.style.width = `${(pad_w_btn+2+5+30)*4+20}px`
    nb_container.style.display = "flex"
    nb_container.style["flex-wrap"] = "wrap"
    for (let value of value_order) {
        let btn_nb = document.createElement("button");
        btn_nb.setAttribute("id", value.toString(10));
        btn_nb.textContent = value.toString(10);
        btn_nb.style.padding = `${pad_h_btn}px ${pad_w_btn}px ${pad_h_btn}px ${pad_w_btn}px`;
        btn_nb.style["font-size"] = "24px"
        btn_nb.style["font-weight"] = "bold"
        btn_nb.style.background = "gray";
        btn_nb.style["border-radius"] = "8px";
        if (value == 0) {
            btn_nb.style.padding = `${pad_h_btn}px ${pad_w_btn*2+15}px ${pad_h_btn}px ${pad_w_btn*2+15}px`;
        }
        btn_nb.addEventListener("click", (event) => {
            GetVal(value.toString(10));
        });
        nb_container.appendChild(btn_nb);
    }
    AddDot(nb_container);
    container.appendChild(nb_container);
}

function AddDot(nb_container) {
    let btn_nb = document.createElement("button");
    btn_nb.setAttribute("id", "dot");
    btn_nb.textContent = ".";
    btn_nb.style.padding = `${pad_h_btn}px ${pad_w_btn}px ${pad_h_btn}px ${pad_w_btn}px`;
    btn_nb.style["font-size"] = "24px"
    btn_nb.style["font-weight"] = "bold"
    btn_nb.style.background = "gray";
    btn_nb.style["border-radius"] = "8px";
    btn_nb.addEventListener("click", (event) => {
        GetVal(".");
    });
    nb_container.appendChild(btn_nb);
}

function CreatePadOp() {
    const container = document.getElementsByClassName("calculator")[0];
    const operators = ["C", "+", "-", "*", "/", "="]
    const op_container = document.createElement("div");
    op_container.style["font-size"] = "40px"
    op_container.style.display = "flex"
    op_container.style["flex-direction"] = "column"
    for (let value of operators) {
        let btn_op = document.createElement("button");
        btn_op.setAttribute("id", value);
        btn_op.textContent = value;
        btn_op.style.padding = `${pad_h_btn}px ${pad_w_btn}px ${pad_h_btn}px ${pad_w_btn}px`;
        btn_op.style["font-size"] = "24px"
        btn_op.style["font-weight"] = "bold"
        btn_op.style.background = "orange"
        btn_op.style["border-radius"] = "8px";
        btn_op.addEventListener("click", (event) => {
            GetOp(value);
            ClickedOp(value);
        });
        
        op_container.appendChild(btn_op);
    }
    container.appendChild(op_container);
}




function InitCalculator() {
    const container = document.getElementsByClassName("calculator")[0];
    CreatePadNum();
    CreatePadOp();
    
}


window.addEventListener('load', InitCalculator);