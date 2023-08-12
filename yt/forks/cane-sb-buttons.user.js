// ==UserScript==
// @name         YouTube SB Buttons
// @namespace    cane-sb-buttons
// @version      1.0.8
// @description  Useful buttons/redirects for SponsorBlock moderation. No need for bookmarklets!
// @author       michael mchang.name, by cane, original by Deedit
// @match        https://www.youtube.com/*
// @icon         https://sponsor.ajay.app/LogoSponsorBlockSimple256px.png
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/forks/cane-sb-buttons.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/forks/cane-sb-buttons.user.js
// @grant        none
// ==/UserScript==

(function () {
  var intv = setInterval(function () {
    const x = document.getElementById("center");
    if (!x) return false;
    setupButtons();
    clearInterval(intv);
  }, 100);
})();

const youtube = "https://youtu.be/";
const sbc_lock = "https://mruy.github.io/sponsorBlockControl-sveltekit/lockcategories/?videoID=";
const sbc_browse = "https://mruy.github.io/sponsorBlockControl-sveltekit/browse/?videoID=";
const sbb_browse = "https://sb.ltn.fi/video/";
const dab_browse = "https://dearrow.minibomba.pro/video_id/";

const buttons = { // if you want to disable certain buttons, simply change "true" to "false"
  "playlist": {
    enabled: true,
    title: "Open video outside of playlist",
    text: "Playlist",
    url: youtube
  },
  "sbc_lock": {
    enabled: true,
    title: "Lock categories using SBC",
    text: "Lock",
    url: sbc_lock
  },
  "sbc_browse": {
    enabled: true,
    title: "Browse segments using SBC",
    text: "SBC Browse",
    url: sbc_browse
  },
  "sbb": {
    enabled: true,
    title: "Browse segments using SBB",
    text: "SBB",
    url: sbb_browse
  },
  "dab": {
    enabled: true,
    title: "Browse branding using DAB",
    text: "DAB",
    url: dab_browse
  }
};

document.body.addEventListener("yt-navigate-finish", function () {
  setupButtons();
});

function setupButtons() {
  "use strict";
  const row = document.querySelector("#container.ytd-masthead");
  if (document.getElementById("cane-button-container")) return;

  const container = document.createElement("div");
  container.id = "cane-button-container";
  container.style.display = "flex";

  Object.keys(buttons).forEach(k => {
    const button = buttons[k];
    if (!document.getElementById(`cane-button-${k}`) && button.enabled) {
      container.append(createButton(k, button.text, button.url));
    }
  });

  const searchbar = document.getElementById("center");
  row.insertBefore(container, searchbar);
}

function createButton(id, text, url) {
  const button = document.createElement("button");
  button.id = `cane-button-${id}`;
  button.textContent = text;
  button.style.color = "#888888";
  button.style.background = "#202020";
  button.style.borderStyle = "solid";
  button.style.borderColor = "#303030";
  button.style.borderWidth = "1px";
  button.style.cursor = "pointer";
  button.onclick = () => {
    const v = new URL(document.URL).searchParams.get("v");
    if (v) window.open(url + v);
  };
  return button;
}