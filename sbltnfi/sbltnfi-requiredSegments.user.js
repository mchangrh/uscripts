// ==UserScript==
// @name         sb.ltn.fi UUID requiredSegment
// @namespace    mchang.name
// @version      2.2.6
// @description  Generate a link to requiredSegment from UUID
// @author       michael mchang.name
// @match        https://sb.ltn.fi/*
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-requiredSegments.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-requiredSegments.user.js
// @require      https://uscript.mchang.xyz/require/sbltnfi-helpers.js
// @grant        none
// ==/UserScript==

function createButtons() {
  const uuidColumnIndex = headerKeys["UUID"];
  if (!uuidColumnIndex) return;
  rows.forEach((row) => {
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
}

createButtons();
document.addEventListener("newSegments", () => createButtons());