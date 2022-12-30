// ==UserScript==
// @name         SponsorBlock clickable startTime (sb.ltn.fi) fork
// @namespace    mchang-sb.ltn.fi.clickable.starttime
// @version      1.1.10
// @description  Makes the startTime clickable
// @author       michael mchang.name
// @match        https://sb.ltn.fi/*
// @updateURL    https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/sbltnfi-clickable-starttime-fork.user.js
// @downloadURL  https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/sbltnfi-clickable-starttime-fork.user.js
// @require      https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/stringToSec.js
// @grant        none
// ==/UserScript==

const videoRegex = new RegExp(/(?:(?:video\/)|(?:videoid=))([0-9A-Za-z_-]{11})/);
const findVideoID = (str) => str.match(videoRegex)?.[1];
let pageVideoID = findVideoID(window.location.href);
let videoId;

function create() {
  const table = document.querySelector("table.table");
  const headers = [...table.querySelectorAll('thead th')].map(item =>
    item.textContent.trim()
  );
  const startColumnIndex = headers.indexOf('Start');
  const UUIDColumnIndex = headers.indexOf('UUID');
  const videoIdColumnIndex = headers.indexOf('VideoID');
  const rows = [...table.querySelectorAll('tbody tr')];
  rows.forEach(row => {
    if (!pageVideoID) {
      videoId = row.children[videoIdColumnIndex].firstChild.textContent.trim()
    } else {
      videoId = pageVideoID
    }
    if (!videoId) return;
    const UUID = row.children[UUIDColumnIndex].querySelector("textarea").textContent.trim()
    const cellEl = row.children[startColumnIndex];
    // check for existing children
    if (cellEl.querySelector(".clickable-starttime")) return;
    const content = cellEl.textContent.trim();
    const link = document.createElement('a');
    let startTimeSeconds = stringToSec(content, false)
    // -2s to have time before skip
    startTimeSeconds-=2;
    link.textContent = content;
    link.style.color = 'inherit';
    link.classList.add("clickable-starttime");
    const timeParam = startTimeSeconds > 0 ? `&t=${startTimeSeconds}s` : ""
    link.href = `https://www.youtube.com/watch?v=${videoId}${timeParam}#requiredSegment=${UUID}`;
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