// ==UserScript==
// @name         sb.ltn.fi preset page link
// @namespace    mchang.name
// @version      2.1.2
// @description  Open corresponding sb.ltn.fi link from YouTube
// @author       Deedit, michael mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-preset-video-link.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-preset-video-link.user.js
// @require      https://neuter.mchang.xyz/require/wfke.js
// @run-at       document-idle
// @grant        none
// ==/UserScript==

// custom filters for SBB
const customFilters = new URLSearchParams({
  "votes_min": 0,
  "views_min": 1,
  "sort": "starttime"
});

function setupButton() {
  if (document.getElementById("sb.ltn.fi/video/-Opener-Button") === null) {
    const x = document.getElementById("center");
    const buttonEl = document.createElement("Button");
    buttonEl.id = "sb.ltn.fi/video/-Opener-Button";
    buttonEl.textContent = "SBB";
    buttonEl.style.color = "#888888";
    buttonEl.style.background = "#202020";
    buttonEl.style.borderStyle = "solid";
    buttonEl.style.borderColor = "#303030";
    buttonEl.style.borderWidth = "1px";
    buttonEl.style.cursor = "pointer";
    x.prepend(buttonEl);
    buttonEl.onclick = () => {
      const currentID = new URL(document.URL).searchParams.get("v");
      const targetURL = new URL("https://sb.ltn.fi/video/" + currentID + "/?" + customFilters);
      window.open(targetURL);
    };
  }
}

wfke("center", setupButton);
document.body.addEventListener("yt-navigate-finish", () => setupButton());