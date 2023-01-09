// ==UserScript==
// @name         sb.ltn.fi export as #segments
// @namespace    mchang.name
// @version      1.0.7
// @description  Export sbltnfi segments into loadable URLs
// @author       michael mchang.name
// @match        https://sb.ltn.fi/*
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-export-segments.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-export-segments.user.js
// @require      https://uscript.mchang.xyz/require/stringToSec.js
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @grant        none
// ==/UserScript==

const videoRegex = new RegExp(/(?:(?:video\/)|(?:videoid=))([0-9A-Za-z_-]{11})/);
const findVideoID = (str) => str.match(videoRegex)?.[1];
let videoId = findVideoID(window.location.href);

function create() {
  const table = document.querySelector("table.table");
  const headers = [...table.querySelectorAll('thead th')].map(item =>
    item.textContent.trim()
  );
  const startColumnIndex = headers.indexOf('Start');
  const endColumnIndex = headers.indexOf('End');
  const actionTypeColumnIndex = headers.indexOf('Action');
  const videoIdColumnIndex = headers.indexOf('VideoID');
  const rows = [...table.querySelectorAll('tbody tr')];
  rows.forEach(row => {
    const appendTo = row.children[0];
    if (appendTo.querySelector(".export-segment")) return
    if (videoIdColumnIndex != -1) {
      videoId = row.children[videoIdColumnIndex].firstChild.textContent.trim();
    }
    if (!videoId) return;
    const startTime = row.children[startColumnIndex].firstChild.textContent.trim();
    const startTimeSeconds = stringToSec(startTime)
    const endTime = row.children[endColumnIndex].textContent.trim();
    const endTimeSeconds = stringToSec(endTime)
    const actionType = row.children[actionTypeColumnIndex].firstChild.title.trim().toLowerCase();
    const openLink = document.createElement('a');
    openLink.textContent = "📂";
    openLink.title = "Export segment to loadable URL"
    openLink.href = createLink(videoId, startTimeSeconds, endTimeSeconds, actionType);
    openLink.style.color = 'inherit';
    openLink.classList.add("export-segment");
    appendTo.prepend(openLink);
  });
}

function createLink(videoId, startTime, endTime, actionType) {
  const segmentObj = { actionType, category: "chooseACategory", segment: [startTime,endTime]}
  return `https://youtube.com/watch?v=${videoId}#segments=[${JSON.stringify(segmentObj)}]`
}

(function (){
  create()
  document.addEventListener("newSegments", (event) => create());
})();