// ==UserScript==
// @name         Add seek precision to YouTube
// @namespace    mchang.name
// @version      1.0.0
// @description  Add additional seeking options on YouTube
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// @updateURL    https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/yt-moreseek.user.js
// @downloadURL  https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/yt-moreseek.user.js
// ==/UserScript==

const seekTo = (amt) => player.seekBy(amt);
const suppress = (e) => e.preventDefault();

function listenKey(e) {
  // ctrl = 10
  // default = 1
  // shift = 0.1
  const key = e.key;
  const step = (e.shiftKey) ? 0.1
    : (e.ctrlKey) ? 10
    : 1;

  if (key == "a" || key == "A") {
    suppress(e);
    seekTo(-1 * step);
  } else if (key == "d" || key == "D") {
    suppress(e);
    seekTo(step);
  }
}

const video = document.querySelector('video');
const player = document.querySelector('#movie_player');
document.addEventListener("keydown", listenKey);