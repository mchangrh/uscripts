// ==UserScript==
// @name         sb.ltn.fi UUID requiredSegment
// @namespace    mchang.name
// @version      2.2.2
// @description  Generate a link to requiredSegment from UUID
// @author       mchangrh
// @updateURL    https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/sbltnfi-requiredSegments.user.js
// @downloadURL  https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/sbltnfi-requiredSegments.user.js
// @match        https://sb.ltn.fi/*
// @icon         https://sb.ltn.fi/static/browser/logo.png
// ==/UserScript==

function createButtons() {
  document.querySelectorAll("table").forEach((table) => {
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