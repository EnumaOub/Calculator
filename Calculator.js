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

function ClearData() {
    const container = document.getElementsByClassName("display")[0];
    container.textContent = `${res}`
    a = res;
    b = "";
    op = "";
}

function operate() {
    let operator;
    if (op == "+"){ 
        operator = "add";
        res = Calculator[operator](a,b);
    }
    else if (op == "-"){ 
        operator = "substract";
        res = Calculator[operator](a,b);
    }
    else if (op == "*"){ 
        operator = "multiply";
        res = Calculator[operator](a,b);
    }
    else if (op == "/"){ 
        operator = "divide";
        if (b == 0) {
            const container = document.getElementsByClassName("display")[0];
            container.textContent = `ERROR`
        }
        else {
            res = Calculator[operator](a,b);
        }
        
    }
    ClearData()
}

function Display() {
    const container = document.getElementsByClassName("display")[0];
    container.textContent = `${a} ${op} ${b}`
}

function GetVal(val) {
    if (op == "") {
        if (res == "") {
            a = val;
        }
        Display()
    }
    else {
        b = val;
        operate()
    }
}

function GetOp(op_val) {
    if (op_val == "C") {
        res = "";
        ClearData()
    }
    else if (a != ""){
        op = op_val;
        Display()
    }
}

function InitCalculator() {
    const container = document.getElementsByClassName("calculator")[0];
    const operators = ["C", "+", "-", "*", "/"]
    const value_order = [7,8,9,4,5,6,1,2,3,0]
    const pad_w_btn = 40;
    const pad_h_btn = 10;
    const nb_container = document.createElement("div");
    nb_container.style.width = `${(pad_w_btn*2-6)*4}px`
    nb_container.style.display = "flex"
    nb_container.style["flex-wrap"] = "wrap"
    for (let value of value_order) {
        let btn_nb = document.createElement("button");
        btn_nb.textContent = value.toString(10);
        btn_nb.style.padding = `${pad_h_btn}px ${pad_w_btn}px ${pad_h_btn}px ${pad_w_btn}px`;
        btn_nb.style["font-size"] = "24px"
        btn_nb.style["font-weight"] = "bold"
        btn_nb.style.background = "gray";
        btn_nb.style["border-radius"] = "8px";
        btn_nb.addEventListener("click", (event) => {
            GetVal(i);
        });
        nb_container.appendChild(btn_nb);
    }
    container.appendChild(nb_container);
    const op_container = document.createElement("div");
    op_container.style["font-size"] = "40px"
    op_container.style.display = "flex"
    op_container.style["flex-direction"] = "column"
    for (let value of operators) {
        let btn_op = document.createElement("button");
        btn_op.textContent = value;
        btn_op.style.padding = `${pad_h_btn}px ${pad_w_btn}px ${pad_h_btn}px ${pad_w_btn}px`;
        btn_op.style["font-size"] = "24px"
        btn_op.style["font-weight"] = "bold"
        btn_op.style.background = "orange"
        btn_op.style["border-radius"] = "8px";
        btn_op.addEventListener("click", (event) => {
            GetOp(value);
        });
        op_container.appendChild(btn_op);
    }
    container.appendChild(op_container);
}


window.addEventListener('load', InitCalculator);