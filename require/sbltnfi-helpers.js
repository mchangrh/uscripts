// gets headers from sbltnfi table
let headerKeys = {};
[...document.querySelector("table.table").querySelectorAll("thead th")].forEach((value, index) => headerKeys[value.textContent.trim()] = index);

const rows = [...document.querySelector("table.table").querySelectorAll("tbody tr")];