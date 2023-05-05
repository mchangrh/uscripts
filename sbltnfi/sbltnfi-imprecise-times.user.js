// ==UserScript==
// @name         sb.ltn.fi imprecise times
// @namespace    mchang.name
// @version      1.1.7
// @description  Make all times on sb.ltn.fi imprecise
// @author       michael mchang.name
// @match        https://sb.ltn.fi/*
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-imprecise-times.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-imprecise-times.user.js
// @require      https://uscript.mchang.xyz/require/sbltnfi-helpers.js
// @grant        none
// ==/UserScript==

// replace consequtive zeros at the end (that also follows a .) with nothing
const reduceTime = time => time.replace(/(?<=\.\d+)0+$/g, "");

function findTimes() {
  // get all header indexes
  const startIndex = headerKeys?.["Start"];
  const endIndex = headerKeys?.["End"];
  const lengthIndex = headerKeys?.["Length"];
  rows.forEach((row) => {
    for (const index of [startIndex, endIndex, lengthIndex]) {
      // skip if index is -1
      if (index === -1) continue;
      let cell = row.children[index];
      // loop into the deepest element to not break any other scripts
      while (cell.firstChild) cell = cell.firstChild;
      // replace value
      const oldValue = cell.textContent;
      cell.textContent = reduceTime(oldValue);
    }
  });
}

findTimes();
document.addEventListener("newSegments", () => findTimes());