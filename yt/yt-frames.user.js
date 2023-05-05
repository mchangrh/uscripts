// ==UserScript==
// @name         Add frames to YouTube time
// @namespace    mchang.name
// @version      1.0.3
// @description  Add frames to YouTube time
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-frames.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-frames.user.js
// @require      https://uscript.mchang.xyz/require/wfke.js
// @grant        none
// ==/UserScript==

function setFrames() {
  if (document.getElementById("mchang-ytfps") === null) {
    const video = document.querySelector("#movie_player");
    const resolution = video.getStatsForNerds().resolution;
    const fps = resolution
      .split("/")[0]
      .split("@")[1].trim();
    const spanEl = document.createElement("span");
    spanEl.id = "mchang-ytfps";
    spanEl.class = "ytp-time-duration";
    spanEl.textContent = `@${fps}fps`;
    const oldTime = document.querySelector(".ytp-time-current").parentElement;
    oldTime.append(spanEl);
  }
}

const awaitPlayer = () => wfke(".ytp-time-display", setFrames);
document.body.addEventListener("yt-navigate-finish", (e) => awaitPlayer());