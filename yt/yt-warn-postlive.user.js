// ==UserScript==
// @name         Warn on Post-Live Manifestless
// @namespace    mchang.name
// @version      1.1.2
// @description  adds a big red warning to the top of the screen when video is post-live manifestless
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-warn-postlive.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-warn-postlive.user.js
// @require      https://uscript.mchang.xyz/require/wfke.js
// @grant        none
// ==/UserScript==

let playerDetail;

function warn() {
  if (document.getElementById("postlive-warning") !== null) return;
  const cont = document.querySelector('ytd-masthead#masthead');
  const spanEl = document.createElement('span');
  spanEl.id = "postlive-warning";
  spanEl.textContent = "!!!!! post-live manifestless !!!!!";
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

const checkRequired = () => {
  if (playerDetail && playerDetail.getVideoData().isManifestless) warn()
}

const reset = () => {
  document.getElementById("postlive-warning")?.remove
  checkRequired()
}

const awaitMasthead = () => wfke("ytd-masthead#masthead", checkRequired)

const hookDetail = (e) => {
  playerDetail = e.detail
  awaitMasthead()
}

document.addEventListener("yt-navigate-finish", (event) => reset() );
document.addEventListener("yt-player-updated", hookDetail)