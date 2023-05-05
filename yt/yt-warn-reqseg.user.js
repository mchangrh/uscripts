// ==UserScript==
// @name         Warn on Required Segments
// @namespace    mchang.name
// @version      1.1.3
// @description  adds a big red warning to the top of the screen when requiredSegment is present
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-warn-reqseg.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-warn-reqseg.user.js
// @require      https://uscript.mchang.xyz/require/wfke.js
// @grant        none
// ==/UserScript==

function setupButton(segmentID) {
  if (document.getElementById("reqseg-warning")) return;
  const cont = document.querySelector("ytd-masthead#masthead");
  const spanEl = document.createElement("span");
  spanEl.id = "reqseg-warning";
  spanEl.textContent = "!!!!! Required Segment: " + segmentID + " !!!!!";
  spanEl.style = `
    font-size: 16px;
    text-align: center;
    padding-top: 5px;
    display: block;
    color: #fff;
    background: #f00;
    width: 100%;
    height: 30px;`;
  cont.prepend(spanEl);
}

const reset = () => {
  document.getElementById("reqseg-warning")?.remove;
  checkRequired();
};

function checkRequired() {
  const hash = new URL(document.URL)?.hash;
  if (!hash) return;
  const hasReqSegm = hash.startsWith("#requiredSegment");
  if (hasReqSegm) {
    const segmentID = hash.match(/=([\da-f]+)/)?.[1];
    setupButton(segmentID);
  }
}

wfke("ytd-masthead#masthead", checkRequired);
document.body.addEventListener("yt-navigate-finish", (e) => reset());