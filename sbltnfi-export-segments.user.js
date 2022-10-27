// ==UserScript==
// @name         sb.ltn.fi export as #segments
// @namespace    mchang.name
// @version      1.0.0
// @description  Export sbltnfi segments into loadable URLs
// @author       Michael Chang <michael@mchang.name
// @match        https://sb.ltn.fi/*
// @updateURL    https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/sbltnfi-export-segments.user.js
// @downloadURL  https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/sbltnfi-export-segments.user.js
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @grant        none
// ==/UserScript==

const videoRegex = new RegExp(/(?:(?:video\/)|(?:videoid=))([0-9A-Za-z_-]{11})/);
const findVideoID = (str) => str.match(videoRegex)?.[1];
let videoId = findVideoID(window.location.href);

const stringToSec = (str) => str
  .split(/[\:\.]/)
  .map(s=>Number(s)).reverse()
  .map((val,index) => ([0.001, 1, 60, 3600][index] * val))
  .reduce((acc, curr)=>acc+curr, 0);

function create() {
  const table = document.querySelector("table");
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
    const startTime = row.children[startColumnIndex].textContent.trim();
    const startTimeSeconds = stringToSec(startTime)
    const endTime = row.children[endColumnIndex].textContent.trim();
    const endTimeSeconds = stringToSec(endTime)
    const actionType = row.children[actionTypeColumnIndex].firstChild.title.trim().toLowerCase();
    const openLink = document.createElement('a');
    openLink.textContent = "📂";
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