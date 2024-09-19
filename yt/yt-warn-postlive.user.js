// ==UserScript==
// @name         Warn on Post-Live Manifestless
// @namespace    mchang.name
// @version      1.1.6
// @description  adds a big red warning to the top of the screen when video is post-live manifestless
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-warn-postlive.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-warn-postlive.user.js
// @require      https://uscript.mchang.xyz/require/wfke.js
// @require      https://uscript.mchang.xyz/require/warn.js
// @grant        none
// ==/UserScript==

let playerDetail;
const warningId = "postlive-warning";

const reset = () => {
  document.getElementById(warningId)?.remove();
  checkRequired();
};

const checkRequired = () => {
  if (playerDetail) {
    if (playerDetail.getVideoData().isLive) displayWarning("live manifestless", warningId);
    else if (playerDetail.getVideoData().isManifestless) displayWarning("post-live manifestless", warningId);
  }
};

const hookDetail = (e) => {
  // check if on /video page
  if (!location.pathname.startsWith("/watch")) return;
  playerDetail = e.detail;
  wfke("ytd-masthead#masthead", checkRequired);
};

document.addEventListener("yt-navigate-finish", (e) => reset());
document.addEventListener("yt-player-start", (e) => reset());
document.addEventListener("yt-player-updated", hookDetail);