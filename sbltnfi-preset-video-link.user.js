// ==UserScript==
// @name         sb.ltn.fi preset page link
// @namespace    mchang.name
// @version      2.0.0
// @description  Open corresponding sb.ltn.fi link from YouTube
// @author       Deedit, michael@mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
  var intv = setInterval(function() {
    const x = document.getElementById('center');
    if (x === null) return false;
    //when element is found, clear the interval.
    setupButton();
    clearInterval(intv);
  }, 100);
})();

// custom filters for SBB
const customFilters = new URLSearchParams({
  "votes_min": 0,
  "views_min": 1,
  "sort": "starttime"
})

document.body.addEventListener("yt-navigate-finish", function(event) {
  setupButton();
});

function setupButton() {
  'use strict';
  if (document.getElementById("sb.ltn.fi/video/-Opener-Button") === null) {
    const x = document.getElementById('center');
    const buttonEl = document.createElement('Button');
    buttonEl.id = "sb.ltn.fi/video/-Opener-Button";
    buttonEl.textContent = 'SBB';
    buttonEl.style.color = '#888888';
    buttonEl.style.background = '#202020';
    buttonEl.style.borderStyle = 'solid';
    buttonEl.style.borderColor = '#303030';
    buttonEl.style.borderWidth = '1px';
    buttonEl.style.cursor = 'pointer';
    x.prepend(buttonEl);
    buttonEl.onclick = () => {
      const currentID = new URL(document.URL).searchParams.get("v");
      const targetURL = new URL("https://sb.ltn.fi/video/" + currentID + "/?" + customFilters)
      window.open(targetURL);
    };
  }
}
