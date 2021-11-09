"use strict";
const display = document.querySelector(".display");
const storage = document.querySelector(".storage");
const numBtns = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");
const deleteNum = document.querySelector(".delete");
let operatorOn = false;
let operatorOnVal = "";

document.addEventListener("keydown", logKey);
function logKey(e) {
  numBtns.forEach((val) => {
    if (e.key == val.value) {
      e.target.value = e.key;
      checkInputNum(e);
    }
  });

  operatorBtn.forEach((val) => {
    if (display.textContent) {
      if (e.key == val.value) {
        checkInputOperator(e);
      }

      if (storage.textContent && !display.textContent) {
        if (e.key == val.value) {
          e.target.value = e.key;
          checkInputOperator(e);
        }
      }
    }
  });

  if (e.key == "=" || e.key == "Enter") {
    equalInputVal(e);
  }

  if (e.key == ".") {
    decimalInputVal(e);
  }

  if (e.key == "Backspace") {
    deleteInputVal(e);
  }
}

numBtns.forEach((val) =>
  val.addEventListener("click", (e) => checkInputNum(e))
);

function checkInputNum(e) {
  if (!storage.textContent.includes("=") && operatorOn == false) {
    display.textContent += e.target.value;
  }

  if (storage.textContent.includes("=")) {
    display.textContent += e.target.value;
  }

  if (operatorOn && !storage.textContent.includes("=")) {
    storage.textContent = `${display.textContent} ${operatorOnVal}`;
    display.textContent = e.target.value;
  }
}

operatorBtn.forEach((val) => {
  val.addEventListener("click", (e) => {
    if (display.textContent) {
      checkInputOperator(e);
    }

    if (storage.textContent && !display.textContent) {
      checkInputOperator(e);
    }
  });
});

function checkInputOperator(e) {
  if (
    display.textContent == "" &&
    storage.textContent !== "" &&
    !storage.textContent.includes("=")
  ) {
    let [a, b] = storage.textContent.split(" ");
    b = e.target.value;
    const finalArr = [a, b];
    storage.textContent = finalArr.join(" ");
    return;
  }

  if (storage.textContent == "") {
    storage.textContent = `${display.textContent} ${e.target.value}`;
    display.textContent = "";
    return;
  }

  if (display.textContent !== "" && storage.textContent.includes("=")) {
    storage.textContent = `${display.textContent} ${e.target.value}`;
    display.textContent = "";
    return;
  }

  if (
    (display.textContent !== "" &&
      !storage.textContent.includes("=") &&
      storage.textContent.includes("-")) ||
    storage.textContent.includes("*") ||
    storage.textContent.includes("/") ||
    storage.textContent.includes("+")
  ) {
    storage.textContent = `${checkOperator(storage.textContent)} ${
      e.target.value
    }`;
    display.textContent = "";

    return;
  }
}

decimal.addEventListener("click", (e) => decimalInputVal(e));

function decimalInputVal(e) {
  if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
}

deleteNum.addEventListener("click", (e) => {
  deleteInputVal(e);
});

function deleteInputVal() {
  if (display.textContent !== "") {
    let newDisplay = display.textContent.slice(0, -1);
    display.textContent = newDisplay;
  }
}

equal.addEventListener("click", function (e) {
  equalInputVal(e);
});

function equalInputVal(e) {
  if (
    storage.textContent &&
    display.textContent &&
    !storage.textContent.includes("=")
  ) {
    display.textContent = checkOperator(storage.textContent);
  }
}

clear.addEventListener("click", function (e) {
  clearing();
});

function clearing() {
  display.textContent = "";
  storage.textContent = "";
  display.innerHTML = "";
  storage.innerHTML = "";
}

function checkOperator(content) {
  let [a, b] = content.split(" ");
  let c = display.textContent;
  if (b == "+") {
    storage.textContent += ` ${display.textContent} =`;
    return add(+a, +c);
  }
  if (b == "-") {
    storage.textContent += ` ${display.textContent} =`;
    return subtract(+a, +c);
  }
  if (b == "*") {
    storage.textContent += ` ${display.textContent} =`;
    return multiply(+a, +c);
  }
  if (b == "/") {
    storage.textContent += ` ${display.textContent} =`;
    return divide(+a, +c);
  }
}

function add(a, b) {
  let returnedNum = a + b;
  if (returnedNum.toString().includes(".")) {
    return roundingDecimals(returnedNum);
  } else {
    return returnedNum;
  }
}

function subtract(a, b) {
  let returnedNum = a - b;
  if (returnedNum.toString().includes(".")) {
    return roundingDecimals(returnedNum);
  } else {
    return returnedNum;
  }
}

function multiply(a, b) {
  let returnedNum = a * b;
  if (returnedNum.toString().includes(".")) {
    return roundingDecimals(returnedNum);
  } else {
    return returnedNum;
  }
}

function divide(a, b) {
  let returnedNum = a / b;
  if (returnedNum.toString().includes(".")) {
    return roundingDecimals(returnedNum);
  } else {
    return returnedNum;
  }
}

function operate(operator, a, b) {
  if (operator == "+") {
    return add(a, b);
  } else if (operator == "-") {
    return subtract(a, b);
  } else if (operator == "*") {
    return multiply(a, b);
  } else if (operator == "/") {
    return divide(a, b);
  }
}

function roundingDecimals(num) {
  let numStr = num.toString();
  let [a, b] = numStr.split(".");
  let strB = "0." + b;
  let numB = +strB;
  let finalStr;
  let retunedArr = [a];
  let finalNum;

  if (strB.length >= 5) {
    finalNum = numB.toFixed(3);
    finalStr = finalNum.toString();
  } else if (strB.length == 4) {
    finalNum = numB.toFixed(2);
    finalStr = finalNum.toString();
  } else if (strB.length == 3) {
    finalNum = numB.toFixed(1);
    finalStr = finalNum.toString();
  }
  let [, d] = finalStr.split(".");
  retunedArr.push(d);
  return +retunedArr.join(".");
}
