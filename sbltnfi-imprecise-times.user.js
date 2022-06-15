// ==UserScript==
// @name         sb.ltn.fi imprecise times
// @namespace    mchang.name
// @version      1.1.0
// @description  Make all times on sb.ltn.fi imprecise
// @author       mchangrh
// @match        https://sb.ltn.fi/*
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @grant        none
// @updateURL    https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/sbltnfi-imprecise-times.user.js
// @downloadURL  https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/sbltnfi-imprecise-times.user.js
// ==/UserScript==

// replace consequtive zeros at the end with nothing
const reduceTime = time => time.replace(/(?<=\.\d+)0+$/g, '');

function findTimes() {
  const table = document.querySelector("table");
  const headers = [...table.querySelectorAll("thead th")].map((item) =>
    item.textContent.trim()
  );
  const startIndex = headers.indexOf("Start");
  const endIndex = headers.indexOf("End");
  const lengthIndex = headers.indexOf("Length")
  if (startIndex === -1) return;
  table.querySelectorAll("tbody tr").forEach((row) => {
    for (const index of [startIndex, endIndex, lengthIndex]) {
      const parentCell = row.children[index]
      const cell =  parentCell.querySelector("a") ?? parentCell;
      const oldValue = cell.innerText
      cell.innerText = reduceTime(oldValue);
    }
  });
}

(function () {
  "use strict";
  findTimes();
  document.addEventListener("newSegments", (event) => findTimes());
})();