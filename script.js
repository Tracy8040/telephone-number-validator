const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");
let numberArr = [];
let unfilteredArr = [];
let numberStr = "";
let specialChar = /[^0-9\(\)\-\s]/;

function invalidMessage() {
  resultsDiv.innerHTML += `<p>Invalid US number: ${userInput.value}</p>`
  userInput.value = "";
}


const checkNumber = () => {
  if (!userInput.value) {
    alert("Please provide a phone number");
    return;
  }

  numberStr = userInput.value;
  unfilteredArr = numberStr.split('');
  numberArr = numberStr.split('').filter(char => char.match(/[0-9]/));

  let leftPar = unfilteredArr.includes("(");
  let rightPar = unfilteredArr.includes(")");
  let thereIsSpecialChar = unfilteredArr.some(char => specialChar.test(char));


  if ((!leftPar && rightPar) || (leftPar && !rightPar)) { 
    invalidMessage();
    return;
  }  

  if (numberArr.length > 11 || numberArr.length < 10) {
    invalidMessage();
    return;
  } 

  if (numberArr.length === 11 && numberArr[0] !== "1") {
     invalidMessage();
     return;
  }

  if (unfilteredArr[0] === "-") {
    invalidMessage();
    return;
  }

  if (thereIsSpecialChar) {
    invalidMessage();
    return;
  }

  if (unfilteredArr[unfilteredArr.length - 1] === ")") {
    invalidMessage();
    return;
  }

  if (unfilteredArr[2] === " ") {
    invalidMessage();
    return;
  }

  resultsDiv.innerHTML += `<p>Valid US number: ${userInput.value}</p>`
  userInput.value = "";



  

 
}


checkBtn.addEventListener("click", checkNumber);

clearBtn.addEventListener("click", () => resultsDiv.innerHTML = "");

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkNumber();
  }
});