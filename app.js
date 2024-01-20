let URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json";

let dropDown = document.querySelectorAll(".dropdown select");
let input = document.querySelector("#input");
let button = document.querySelector(".btn");
let fromCurr = document.querySelector("#fromCurrency");
let toCurr = document.querySelector("#toCurrency");
let msg = document.querySelector(".msg");

for (let select of dropDown){
    for (currCode in countryList){
        let newoption = document.createElement("option");
        newoption.value = currCode;
        newoption.innerText = currCode;
        //by default values;
        if (select.name === "From" && currCode === "USD"){
            newoption.selected = "selected";
        }else if(select.name === "To" && currCode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(eve)=>{
        updateFlag(eve.target);
    });
}
function updateFlag(element){
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let newimg = `https://flagsapi.com/${countryCode}/flat/64.png`;
    
    let img = element.parentElement.querySelector("img");
    img.src = newimg;
}
button.addEventListener("click",async(eve)=>{
    eve.preventDefault();
    let amount = input.value;
    if (amount === "" || amount < 1){
        amount = 1;
        input.value = 1;
    }
    
    let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let ConvertedAmount = rate * amount;
    
    msg.innerText = `Information : ${amount} ${fromCurr.value} = ${ConvertedAmount.toFixed(4)} ${toCurr.value}`;

})
