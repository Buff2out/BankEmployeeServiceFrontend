import * as baseFs from '/commonFunctions.js';
class accountsItemsForHtmlClass {
    constructor(codeParam, ownerParam, balanceParam) {
        this.code = codeParam;
        this.owner = ownerParam;
        this.balance = balanceParam;
    }
}

function setValsToHtml(value) {
    let bro = new accountsItemsForHtmlClass(
        document.querySelectorAll(".acc-code"),
        document.querySelectorAll(".acc-name"),
        document.querySelectorAll(".acc-balance")
    );
    for (let i = 0; i < value.length; i++) {
        bro.code[i].textContent = value[i].code;
        bro.owner[i].textContent = value[i].owner;
        bro.balance[i].textContent = value[i].balance;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let pms = new Promise(function (resolve){
        resolve(baseFs.sendRequest("GET", ["core", "showAll"]));
    });
    pms.then(function (value){
        console.log(value);
        setValsToHtml(value);
    });
});