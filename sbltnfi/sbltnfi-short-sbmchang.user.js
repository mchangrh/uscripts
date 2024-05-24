// ==UserScript==
// @name         sb.ltn.fi shortened sb.mchang.xyz
// @namespace    mchang.name
// @version      1.0.2
// @description  Generate shortened sb.mchang.xyz link (/video/partialHash)
// @author       michael mchang.name
// @match        https://sb.ltn.fi/*
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-short-sbmchang.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-short-sbmchang.user.js
// @require      https://uscript.mchang.xyz/require/sbltnfi-helpers.js
// @grant        none
// ==/UserScript==

const videoRegex = new RegExp(/(?:(?:video\/)|(?:videoid=))([0-9A-Za-z_-]{11})/);
const findVideoID = (str) => str.match(videoRegex)?.[1];
let videoId = findVideoID(window.location.href);

function copyTo(event) {
  const path = event.target.dataset.path;
  navigator.clipboard.writeText(`https://sb.mchang.xyz/${path}`);
}

function createButtons() {
  const uuidColumnIndex = headerKeys?.["UUID"];
  if (!uuidColumnIndex) return;
  const videoIdColumnIndex = headerKeys["VideoID"];
  rows.forEach((row) => {
    const cellEl = row.children[uuidColumnIndex];
    if (cellEl.querySelector("#mchang_shortsb")) return;
    if (!videoId) {
      videoId = row.children[videoIdColumnIndex].firstChild.textContent.trim();
    }
    if (!videoId) return;
    const UUID = cellEl.querySelector("textarea").value.substring(0, 5);
    const button = document.createElement("button");
    button.id = "mchang_shortsb";
    button.innerText = "🤏";
    button.dataset.path = videoId+"/"+UUID;
    button.addEventListener("click", copyTo);
    cellEl.appendChild(button);
  });
}

createButtons();
document.addEventListener("newSegments", () => createButtons());