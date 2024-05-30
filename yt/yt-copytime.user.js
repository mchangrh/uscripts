// ==UserScript==
// @name         YT copy timestamp
// @namespace    mchang.name
// @version      0.0.1
// @description  Copy exact timestamp on youtube
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-copytime.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-copytime.user.js
// @run-at       document-start
// ==/UserScript==

// copy timestamp
const copyTime = () =>
    navigator.clipboard.writeText(document.querySelector("video").currentTime);

window.onkeyup = e => {
    if (e.key == "\\" && e.ctrlKey) copyTime();
};