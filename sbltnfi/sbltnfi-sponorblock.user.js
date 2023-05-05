// ==UserScript==
// @name         sb.ltn.fi sponsor -> sponor
// @namespace    mchang.name
// @version      1.0.1
// @description  Replaces "sponsor" with "sponor" on sb.ltn.fi
// @author       michael mchang.name
// @match        https://sb.ltn.fi/*
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-sponorblock.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-sponorblock.user.js
// @require      https://uscript.mchang.xyz/require/sbltnfi-helpers.js
// @grant        none
// ==/UserScript==

(function () {
  // try replacing by mruy category coolours first
  let mruySponsors = document.querySelectorAll("span.mruy_sbcc_sponsor");
  if (mruySponsors.length) {
    mruySponsors
      .forEach((el) => el.innerText = el.innerText.replace("sponsor", "sponor"));
  } else {
    const categoryIdx = headerKeys?.["Category"];
    if (!categoryIdx) return;
    rows.forEach(row => {
      const el = row.children[categoryIdx].firstChild;
      el.textContent = el.textContent.replace("sponsor", "sponor");
    });
  }
})();