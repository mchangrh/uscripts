// ==UserScript==
// @name         dropout.tv timestamp sharing
// @namespace    mchang.name
// @version      1.0.0
// @description  Share dropout.tv with video timestamps
// @author       michael mchang.name
// @match        https://www.dropout.tv/*
// @icon         https://signup.dropout.tv/favicon.png
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/misc/dropout-timestamp.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/misc/dropout-timestamp.user.js
// @run-at       document-end
// @license      GPL-3.0
// ==/UserScript==

// VHXPlayer from theonlytails

const player = new VHX.Player("watch-embed");
player.on("loadeddata", e => setTimestamp());
addShareBtn();

function setTimestamp() {
    // set timestamp from URL
    const timestamp = new URL(location.href).searchParams.get("t");
    if (timestamp) player.seekToTime(parseFloat(timestamp));
}

function addShareBtn() {
    // add share button
    const url = new URL(location.href);
    const shareBtn = document.createElement("button");
    shareBtn.classList = "btn btn-transparent custom-btn-action-my-list margin-bottom-small margin-right-small"
    shareBtn.textContent = "Share Timestamp";
    shareBtn.onclick = () => {
        url.searchParams.set("t", Math.floor(player.currentTime()));
        navigator.clipboard.writeText(url.href);
    };
    document.querySelector(".contain.padding-vertical-medium.padding-horizontal-large.centered").appendChild(shareBtn);
}