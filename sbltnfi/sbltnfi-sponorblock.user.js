// ==UserScript==
// @name         sb.ltn.fi sponsor -> sponor
// @namespace    mchang.name
// @version      1.0.0
// @description  Replaces "sponsor" with "sponor" on sb.ltn.fi
// @author       michael mchang.name
// @match        https://sb.ltn.fi/*
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-sponorblock.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-sponorblock.user.js
// @grant        none
// ==/UserScript==

// try replacing by mruy category coolours first
let mruySponsors = document.querySelectorAll('span.mruy_sbcc_sponsor')
if (mruySponsors.length) {
  mruySponsors
    .forEach((el) => el.innerText = el.innerText.replace("sponsor", "sponor"))
} else {
  const headers = [...document.querySelectorAll("thead th")]
    .map((item) => item.textContent.trim())
  const categoryIdx = headers.indexOf("Category")
  if (categoryIdx === -1) return;
  [...document.querySelectorAll("tbody tr")]
    .map((row) => row.children[categoryIdx])
    .forEach((el) => el.firstChild.textContent = el.firstChild.textContent.replace("sponsor", "sponor"))
}
