// ==UserScript==
// @name         sb.ltn.fi refresh segment
// @namespace    mchang.name
// @version      1.2.3
// @description  Refresh a single segment
// @author       michael mchang.name
// @match        https://sb.ltn.fi/*
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-refresh.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-refresh.user.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

function refreshRow(event) {
  const uuid = event.target.dataset.uuid;
  event.target.innerText = "⏲️";
  GM_xmlhttpRequest({
    method: "GET",
    url: `https://sponsor.ajay.app/api/segmentInfo?UUID=${uuid}`,
    responseType: "json",
    timeout: 10000,
    onload: (res) => updateRow(res.response[0], uuid),
    onerror: (res) => updateRow(false, uuid),
    ontimeout: (res) => updateRow(false, uuid)
  });
}

function createButtons() {
  const table = document.querySelector("table.table");
  const headers = [...table.querySelectorAll("thead th")].map((item) =>
    item.textContent.trim()
  );
  const uuidColumnIndex = headers.indexOf("UUID");
  if (uuidColumnIndex === -1) return;
  table.querySelectorAll("tbody tr").forEach((row) => {
    const cellEl = row.children[uuidColumnIndex];
    // check if refresh button exists
    if (cellEl.querySelector("#mchang_refresh")) return;
    const UUID = cellEl.querySelector("textarea").value;
    const button = document.createElement("button");
    button.id = "mchang_refresh";
    button.innerText = "🔄";
    button.dataset.uuid = UUID;
    button.addEventListener("click", refreshRow);
    cellEl.appendChild(button);
  });
}

const oldChildrenFind = (children, textMatch) =>
  Array.from(children).find((elem) => elem.innerText == textMatch);

function updateRow(data, uuid) {
  const table = document.querySelector("table");
  const headers = [...table.querySelectorAll("thead th")].map((item) =>
    item.textContent.trim()
  );
  const uuidColumnIndex = headers.indexOf("UUID");
  if (uuidColumnIndex === -1) return;
  table.querySelectorAll("tbody tr").forEach((row) => {
    const rowChildren = row.children;
    const cellEl = rowChildren[uuidColumnIndex];
    if (cellEl.querySelector("textarea").value === uuid) {
      if (!data) return cellEl.querySelector("#mchang_refresh").innerText = "⚠️";
      cellEl.querySelector("#mchang_refresh").innerText = "✅";
      // update data
      // votes
      const votesColumnIndex = headers.indexOf("Votes");
      const oldChildren = rowChildren[votesColumnIndex].children;
      let newVotes = data.votes;
      if (data.votes === -2 && !oldChildrenFind(oldChildren, "❌")) {
        newVotes += "❌";
      }
      if (data.locked === 1 && !oldChildrenFind(oldChildren, "🔒")) {
        newVotes += "🔒";
      }
      rowChildren[votesColumnIndex].childNodes[0].nodeValue = newVotes;
      // views
      rowChildren[headers.indexOf("Views")].textContent = data.views;
      // workaround for colour categories
      const categoryColumn = rowChildren[headers.indexOf("Category")];
      const categorySpan = categoryColumn.querySelector(".mruy_sbcc");
      if (categorySpan) {
        categorySpan.textContent = data.category;
      } else {
        categoryColumn.innerText = data.category;
      }
      // shadowhidden
      const shadowHiddenColumn = rowChildren[headers.indexOf("Shadowhidden")];
      if (data.shadowHidden === 0) {
        shadowHiddenColumn.innerText = "—";
      } else {
        shadowHiddenColumn.innerText = "❌";
      }
    }
  });
}

(function () {
  "use strict";
  createButtons();
  document.addEventListener("newSegments", (event) => createButtons());
})();