// ==UserScript==
// @name         sb.ltn.fi sbc warn
// @namespace    mchang.name
// @version      1.0.0
// @description  Export userID and videoIDs to SBC for warnings
// @author       michael mchang.name
// @match        https://sb.ltn.fi/userid/*
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-sbc-warn.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-sbc-warn.user.js
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @grant        GM_setClipboard
// ==/UserScript==

const getVideoIDs = () =>
  [...document.querySelectorAll("a[href^='/video/']")]
    .map(item => `${item.href}${item.href.includes(item.innerText) ? "" : ` | ${item.innerText}`}`)

const getUserID = () => document.location.pathname.split("/")[2]

function warnUser() {
  const userID = getUserID()
  const videoIDs = [...new Set(getVideoIDs())].join("\n")
  // open sbc in new tab
  window.open(`https://mruy.github.io/sponsorBlockControl-sveltekit/warnuser?userID=${userID}`)
  // copy videoIDs to clipboard
  const clipboard = `Warning for https://sb.ltn.fi/userid/${userID}/ \n\n` + videoIDs 
  GM_setClipboard(clipboard)
}

const btn = document.createElement('button');
btn.className = 'btn btn-primary';
btn.style.margin = '20px';
btn.innerText = 'Warn User';
btn.onclick = warnUser
const element = document.getElementsByClassName('list-group-horizontal')[0];
if (element) {
  element.appendChild(btn);
}