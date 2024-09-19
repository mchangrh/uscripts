// ==UserScript==
// @name         Warn on Required Segments
// @namespace    mchang.name
// @version      1.1.5
// @description  adds a big red warning to the top of the screen when requiredSegment is present
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-warn-reqseg.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-warn-reqseg.user.js
// @require      https://uscript.mchang.xyz/require/wfke.js
// @require      https://uscript.mchang.xyz/require/warn.js
// @grant        none
// ==/UserScript==

const warningId = "reqseg-warning";

const reset = () => {
  document.getElementById(warningId)?.remove();
  checkRequired();
};

function checkRequired() {
  const hash = new URL(document.URL)?.hash;
  if (!hash) return;
  const hasReqSegm = hash.startsWith("#requiredSegment");
  if (hasReqSegm) {
    const segmentID = hash.match(/=([\da-f]+)/)?.[1];
    displayWarning(`!!!!! Required Segment: ${segmentID} !!!!!`, warningId)
  }
}

wfke("ytd-masthead#masthead", checkRequired);
document.addEventListener("yt-navigate-finish", (e) => reset());
document.addEventListener("yt-player-start", (e) => reset());