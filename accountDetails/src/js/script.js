import * as baseFs from '/commonFunctions.js';
class historyItemsForHtmlClass {
    constructor(codeParam, ownerParam, balanceParam) {
        this.code = codeParam;
        this.owner = ownerParam;
        this.balance = balanceParam;
    }
}

function setValsToHtml(value, codeAcc) {
    let bro = new historyItemsForHtmlClass(
        document.querySelectorAll(".acc-code"),
        document.querySelectorAll(".acc-name"),
        document.querySelectorAll(".acc-balance")
    );
    bro.code[0].textContent = value.code;
    bro.owner[0].textContent = value.owner;
    bro.balance[0].textContent = value.balance;
    document.querySelector(".closeAccount").addEventListener("click", () => {
        let pms = new Promise(function (resolve) {
            resolve(baseFs.sendRequest("DELETE", ["core", "deleteAccount", codeAcc]));
        });
        pms.then(function (valueP) {
            console.log(valueP);
        }).catch(function (err){
            setTimeout(() => {
                window.location.replace("http://localhost:8848/listAccountsPage");
            }, 1000)
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let codeAcc = baseFs.parseGetParams().code[0];
    let pms = new Promise(function (resolve) {
        resolve(baseFs.sendRequest("GET", ["core", "get", codeAcc]));
    });
    pms.then(function (value) {
        console.log(value);
        setValsToHtml(value, codeAcc);
    });
});