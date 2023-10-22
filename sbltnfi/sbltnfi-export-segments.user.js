// ==UserScript==
// @name         sb.ltn.fi export as #segments
// @namespace    mchang.name
// @version      1.0.9
// @description  Export sbltnfi segments into loadable URLs
// @author       michael mchang.name
// @match        https://sb.ltn.fi/*
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-export-segments.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-export-segments.user.js
// @require      https://uscript.mchang.xyz/require/stringToSec.js
// @require      https://uscript.mchang.xyz/require/sbltnfi-helpers.js
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @grant        none
// ==/UserScript==

const videoRegex = new RegExp(/(?:(?:video\/)|(?:videoid=))([0-9A-Za-z_-]{11})/);
const findVideoID = (str) => str.match(videoRegex)?.[1];

let videoId = findVideoID(window.location.href);

function create() {
  const startColumnIndex = headerKeys?.["Start"];
  const endColumnIndex = headerKeys?.["End"];
  const actionTypeColumnIndex = headerKeys?.["Action"];
  const videoIdColumnIndex = headerKeys?.["VideoID"];
  rows.forEach(row => {
    const sanitize = (idx) => row.children[idx].firstChild.textContent.trim();
    const appendTo = row.children[0];
    if (appendTo.querySelector(".export-segment")) return;
    if (videoIdColumnIndex) videoId = sanitize(videoIdColumnIndex);
    if (!videoId) return;
    const startTimeSeconds = stringToSec(sanitize(startColumnIndex));
    const endTimeSeconds = stringToSec(sanitize(endColumnIndex));
    const actionType = row.children[actionTypeColumnIndex].firstChild.title.trim().toLowerCase();
    const openLink = document.createElement("a");
    openLink.textContent = "📂";
    openLink.title = "Export segment to loadable URL";
    openLink.href = createLink(videoId, startTimeSeconds, endTimeSeconds, actionType);
    openLink.style.color = "inherit";
    openLink.classList.add("export-segment");
    appendTo.prepend(openLink);
  });
}

function createLink(videoId, startTime, endTime, actionType) {
  const segmentObj = { actionType, category: "chooseACategory", segment: [startTime,endTime]};
  return `https://youtube.com/watch?v=${videoId}#segments=[${JSON.stringify(segmentObj)}]`;
}

create();
document.addEventListener("newSegments", () => create());