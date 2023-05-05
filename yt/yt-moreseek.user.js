// ==UserScript==
// @name         Add seek precision to YouTube
// @namespace    mchang.name
// @version      1.0.3
// @description  Add additional seeking options on YouTube
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-moreseek.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-moreseek.user.js
// @grant        none
// ==/UserScript==

const seekTo = (amt) => player.seekBy(amt);
const suppress = (e) => e.preventDefault();

function listenKey(e) {
  // ignore if in search or comment box
  if (e.target.tagName == "INPUT" || e.target.getAttribute("contenteditable") == "true") return;

  // ctrl = 10
  // default = 1
  // shift = 0.1
  const key = e.key;
  const step = (e.shiftKey) ? 0.1
    : (e.ctrlKey) ? 10
    : 1;
  
  if (key == "a" || key == "A") {
    if (e.ctrlKey) suppress(e);
    seekTo(-1 * step);
  } else if (key == "d" || key == "D") {
    if (e.ctrlKey) suppress(e);
    seekTo(step);
  }
}

const player = document.querySelector("#movie_player");
document.addEventListener("keydown", listenKey);