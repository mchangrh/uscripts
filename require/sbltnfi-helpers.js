// gets headers from sbltnfi table
let headerKeys = {};
[...document.querySelector("table.table").querySelectorAll("thead th")].forEach((value, index) => headerKeys[value.textContent.trim()] = index);

const rows = [...document.querySelector("table.table").querySelectorAll("tbody tr")];

const GM_xmlhttpRequestPromise = (url, options = {}) => new Promise((resolve, reject) => GM_xmlhttpRequest({
    method: "GET",
    url,
    ...options,
    onload: response => resolve(response),
    onerror: error => reject(error)
  })
);