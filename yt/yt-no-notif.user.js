// ==UserScript==
// @name         Youtube No Notifications count
// @namespace    mchang.name
// @version      1.0.1
// @description  Removes notification indicator from window title
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/favicon.ico
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-no-notif.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-no-notif.user.js
// @require      https://uscript.mchang.xyz/require/wfke-el.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

let app;

function setup(elem) {
  app = elem;
  app.addEventListener("yt-update-unseen-notification-count", overrideCount);
  app.addEventListener("yt-navigate-finish", overrideCount);
}

function overrideCount() {
  app.unseenNotificationCount = 0;
  const title = document.querySelector("div.ytp-title-text > a.ytp-title-link").textContent;
  app.dispatchEvent(new CustomEvent("yt-update-title", { detail: title }));
}

wfke("ytd-app", setup);
