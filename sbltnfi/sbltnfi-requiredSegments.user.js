// ==UserScript==
// @name         sb.ltn.fi UUID requiredSegment
// @namespace    mchang.name
// @version      2.2.5
// @description  Generate a link to requiredSegment from UUID
// @author       michael mchang.name
// @match        https://sb.ltn.fi/*
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-requiredSegments.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-requiredSegments.user.js
// @grant        none
// ==/UserScript==

function createButtons() {
  document.querySelectorAll("table.table").forEach((table) => {
    const headers = [...table.querySelectorAll("thead th")].map((item) =>
      item.textContent.trim()
    );
    const uuidColumnIndex = headers.indexOf("UUID");
    if (uuidColumnIndex === -1) return;
    table.querySelectorAll("tbody tr").forEach((row) => {
      const cellEl = row.children[uuidColumnIndex];
      if (cellEl.querySelector("#mchang_requiredsegments")) return;
      const UUID = cellEl.querySelector("textarea").value;
      const button = document.createElement("button");
      button.id = "mchang_requiredsegments";
      button.innerText = "sb/";
      button.addEventListener("click", () =>
        navigator.clipboard.writeText(`https://sb.mchang.xyz/${UUID}`)
      );
      cellEl.appendChild(button);
    });
  });
}

(function () {
  "use strict";
  createButtons();
  document.addEventListener("newSegments", (event) => createButtons());
})();