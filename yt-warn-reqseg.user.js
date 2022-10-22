// ==UserScript==
// @name         Warn on Required Segments
// @namespace    mchang.name
// @version      1.0.3
// @description  adds a big red warning to the top of the screen when requiredSegment is present
// @author       michael@mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// @updateURL    https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/yt-warn-reqseg.user.js
// @downloadURL  https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/yt-warn-reqseg.user.js
// ==/UserScript==

function awaitMasthead() {
  const ready = document.querySelector('ytd-masthead#masthead');
  if (ready) return checkRequired()
  else return setTimeout(awaitMasthead, 100)
}
awaitMasthead()

document.body.addEventListener("yt-navigate-finish", (event) => checkRequired() );

function checkRequired() {
  const hash = new URL(document.URL)?.hash
  if (!hash) return
  const hasReqSegm = hash.startsWith("#requiredSegment");
  if (hasReqSegm) {
    const segmentID = hash.match(/=([\da-f]{64,65})/)?.[1]
    setupButton(segmentID)
  }
}

function setupButton(segmentID) {
  if (document.getElementById("reqseg-warning") === null) {
      const cont = document.querySelector('ytd-masthead#masthead');
      const spanEl = document.createElement('span');
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
        height: 30px;`
      cont.prepend(spanEl);
  }
}