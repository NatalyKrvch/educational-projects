"use strict"

let items = localStorage.getItem('items') === null ? [] : localStorage.getItem('items').split(',');

function init() {
    items.forEach(item => drawItem(item));
}

init();

function addItem() {
    const input = document.querySelector('input');
    const inputValue = input.value;
    drawItem(inputValue);
    items.push(inputValue);
    localStorage.setItem('items', items);
    input.focus();
}

function addByEnter(event) {
    const x = event.key;
    if (x == "Enter") {
        addItem();
    }
}

function updateCounter() {
    const matches = document.querySelectorAll(".item").length
    const counter = document.querySelector(".counter-number");
    counter.innerHTML = matches;
    const plural = document.querySelector(".plural");
    matches === 1 ? plural.innerHTML = "" : plural.innerHTML = "s";
    const element = document.querySelector(".body-div");
    if (matches === 0) {
        counter.innerHTML = 'no';
        plural.innerHTML = "s";
    } else { counter.innerHTML = matches }

    (matches >= 7) ? element.style.padding = "50px 0" : element.style.padding = "0" 
}

function drawItem(str) {
    if (str !== '') {
        const container = document.querySelector(".container");
        container.innerHTML += `<div class="item"><div class="label">${str}</div><div class="delete-action"><button class="trash-button" onclick="removeItem(this)"><img class="trash-button-image" src="images/trash.png" alt="Delete"></button></div></div>`;
        updateCounter();
    }
    document.querySelector(".text").value = "";
}

function removeItem(target) {
    const item = target.parentElement.parentElement;
    const txt = item.textContent;
    const index = items.indexOf(txt);
    items.splice(index, 1);
    localStorage.setItem('items', items);
    item.remove();
    updateCounter();
    const input = document.querySelector('input');
    input.focus();
}

function removeAllItems() {
    const container = document.querySelector(".container");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    updateCounter();
    items = [];
    localStorage.setItem('items', items);
    const input = document.querySelector('input');
    input.focus();
}