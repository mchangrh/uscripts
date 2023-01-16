// ==UserScript==
// @name         sb.ltn.fi shortened sb.mchang.xyz
// @namespace    mchang.name
// @version      1.0.1
// @description  Generate shortened sb.mchang.xyz link (/video/partialHash)
// @author       michael mchang.name
// @match        https://sb.ltn.fi/*
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-short-sbmchang.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-short-sbmchang.user.js
// @grant        none
// ==/UserScript==

const videoRegex = new RegExp(/(?:(?:video\/)|(?:videoid=))([0-9A-Za-z_-]{11})/);
const findVideoID = (str) => str.match(videoRegex)?.[1];
let videoId = findVideoID(window.location.href);

function copyTo(event) {
  const path = event.target.dataset.path
  navigator.clipboard.writeText(`https://sb.mchang.xyz/${path}`);
}

function createButtons() {
  document.querySelectorAll("table.table").forEach((table) => {
    const headers = [...table.querySelectorAll("thead th")].map((item) =>
      item.textContent.trim()
    );
    const uuidColumnIndex = headers.indexOf("UUID");
    if (uuidColumnIndex === -1) return;
    const videoIdColumnIndex = headers.indexOf('VideoID');
    table.querySelectorAll("tbody tr").forEach((row) => {
      const cellEl = row.children[uuidColumnIndex];
      if (cellEl.querySelector("#mchang_shortsb")) return;
      if (videoIdColumnIndex != -1) {
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
  });
}

(function () {
  "use strict";
  createButtons();
  document.addEventListener("newSegments", (event) => createButtons());
})();