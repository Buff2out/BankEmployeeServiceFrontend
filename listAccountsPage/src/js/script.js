import * as baseFs from '/commonFunctions.js';
import {reloadToAddressLine} from "/commonFunctions.js";
class accountsItemsForHtmlClass {
    constructor(codeParam, ownerParam, balanceParam, cardV) {
        this.code = codeParam;
        this.owner = ownerParam;
        this.balance = balanceParam;
        this.card = cardV;
    }
}

function setValsToHtml(value) {
    let bro = new accountsItemsForHtmlClass(
        document.querySelectorAll(".acc-code"),
        document.querySelectorAll(".acc-name"),
        document.querySelectorAll(".acc-balance"),
        document.querySelectorAll(".linkToProfile")
    );
    for (let i = 0; i < value.length && i < bro.code.length; i++) {
        bro.code[i].textContent = value[i].code;
        bro.owner[i].textContent = value[i].owner;
        bro.balance[i].textContent = value[i].balance;
        bro.card[i].classList.remove("visually-hidden");
        bro.card[i].addEventListener("click", () => {
            reloadToAddressLine(`/accountDetails?code=${value[i].code}`);
        });
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