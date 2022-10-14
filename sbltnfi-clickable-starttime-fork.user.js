// ==UserScript==
// @name         SponsorBlock clickable startTime (sb.ltn.fi) fork
// @namespace    mchang-sb.ltn.fi.clickable.starttime
// @version      1.1.2
// @description  Makes the startTime clickable
// @author       Michael Chang <michael@mchang.name
// @match        https://sb.ltn.fi/*
// @updateURL    https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/sbltnfi-clickable-starttime-fork.user.js
// @downloadURL  https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/sbltnfi-clickable-starttime-fork.user.js
// @grant        none
// ==/UserScript==

const videoRegex = new RegExp(/(?:(?:video\/)|(?:videoid=))([0-9A-Za-z_-]{11})/);
const findVideoID = (str) => str.match(videoRegex)?.[1];
let videoId = findVideoID(window.location.href);

function create() {
  const table = document.querySelector("table");
  const headers = [...table.querySelectorAll('thead th')].map(item =>
    item.textContent.trim()
  );
  const startColumnIndex = headers.indexOf('Start');
  const UUIDColumnIndex = headers.indexOf('UUID');
  const videoIdColumnIndex = headers.indexOf('VideoID');
  const rows = [...table.querySelectorAll('tbody tr')];
  rows.forEach(row => {
    if (videoIdColumnIndex != -1) {
      videoId = row.children[videoIdColumnIndex].textContent.trim().slice(0, -3);
    }
    if (!videoId) return;
    const UUID = row.children[UUIDColumnIndex].querySelector("textarea").textContent.trim()
    const cellEl = row.children[startColumnIndex];
    // check for existing children
    if (cellEl.querySelector(".clickable-starttime")) return;
    const content = cellEl.textContent.trim();
    const link = document.createElement('a');
    const startTimeSeconds = content.split(/[\:\.]/)
      .map(s=>Number(s)).reverse()
      .map((val,index) => ([0, 1, 60, 3600][index] * val))
      .reduce((acc, curr)=>acc+curr, 0);
    link.textContent = content;
    link.style.color = 'inherit';
    link.classList.add("clickable-starttime");
    link.href = `https://www.youtube.com/watch?v=${videoId}&t=${Math.max(0, startTimeSeconds - 2)}s#requiredSegment=${UUID}`;
    cellEl.innerHTML = '';
    cellEl.appendChild(link);
  });
}

function wrapElement(target, el) {
  el.innerHTML = target.innerHTML;
  target.innerHTML = el.innerHTML
}

(function (){
  create()
  document.addEventListener("newSegments", (event) => create());
})();