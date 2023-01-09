// ==UserScript==
// @name         Add frames to YouTube time
// @namespace    mchang.name
// @version      1.0.0
// @description  Add frames to YouTube time
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// @updateURL    https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/yt-frames.user.js
// @downloadURL  https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/yt-frames.user.js
// @require      https://neuter.mchang.xyz/require/wfke.js
// ==/UserScript==

function setFrames() {
  if (document.getElementById("mchang-ytfps") === null) {
    const video = document.querySelector('#movie_player');
    const resolution = video.getStatsForNerds().resolution;
    const fps = resolution
      .split("/")[0]
      .split("@")[1].trim();
    const spanEl = document.createElement('span');
    spanEl.id = "mchang-ytfps";
    spanEl.class = "ytp-time-duration";
    spanEl.textContent = `@${fps}fps`;
    const oldTime = document.querySelector('.ytp-time-current').parentElement;
    oldTime.append(spanEl);
  }
}

const awaitPlayer = () => wfke(".ytp-time-display", setFrames)
document.body.addEventListener("yt-navigate-finish", (event) => awaitPlayer() );