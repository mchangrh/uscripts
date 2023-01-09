// ==UserScript==
// @name         Add milliseconds to YouTube time
// @namespace    mchang.name
// @version      1.1.1
// @description  add exact milliseconds to YouTube time
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-mstime.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-mstime.user.js
// @require      https://neuter.mchang.xyz/require/wfke.js
// @grant        none
// ==/UserScript==

function setMs() {
  if (document.getElementById("mchang-ytms") === null) {
    const video = document.querySelector('video');
    const ms = (video.duration+"").split(".").pop() ?? 0
    const oldTime = document.querySelector('.ytp-time-duration');
    const spanEl = document.createElement('span');
    spanEl.id = "mchang-ytms";
    spanEl.class = "ytp-time-duration"
    spanEl.textContent = "."+ms
    oldTime.after(spanEl);
  }
}

const awaitPlayer = () => wfke(".ytp-time-display", setMs)
document.body.addEventListener("yt-navigate-finish", (event) => awaitPlayer() );