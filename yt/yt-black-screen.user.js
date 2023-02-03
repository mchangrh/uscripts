// ==UserScript==
// @name         YT add black screens
// @namespace    mchang.name
// @version      0.0.1
// @description  Adds black screens for transitions
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-black-screen.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-black-screen.user.js
// @require      https://uscript.mchang.xyz/require/wfke-el.js
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
#mchang-black-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 999999;
}`)

// add black screen
function addBlackScreen(add = true) {
  const blackScreen = document.getElementById("mchang-black-screen")
  if (add && !blackScreen) {
    const blackScreen = document.createElement("div")
    blackScreen.id = "mchang-black-screen"
    document.body.appendChild(blackScreen)
  } else if (blackScreen && !add) {
    blackScreen.remove()
  }
}

// wait for yt-navigate-start
document.addEventListener("yt-navigate-start", (e) => {
  if (e.detail.pageType == "watch") addBlackScreen()
})
// when finished and video ready to play
document.addEventListener("yt-navigate-finish", () =>
  wfke("video", el =>
    el.addEventListener("canplay", () =>
      addBlackScreen(false), { once: true })
))