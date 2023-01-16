// ==UserScript==
// @name         YT Set Quality
// @namespace    mchang.name
// @version      1.0.1
// @description  FOrce YouTube Quality
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @match        https://uscript.mchang.xyz/config/setquality
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-setquality.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-setquality.user.js
// @require      https://uscript.mchang.xyz/require/wfke.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

const setPlayerQuality = () => {
  const player = document.querySelector(".html5-video-player")
  const desiredQuality = GM_getValue("yt-quality", "auto")
  if (desiredQuality === "auto") return
  // check if quality is available
  if (!player.getAvailableQualityLevels().includes(desiredQuality)) {
    // if quality DNE, set to desired
    player.setPlaybackQuality(desiredQuality)
    return
  }
  // if available, set
  const curQuality = player.getPlaybackQuality()
  if (curQuality !== desiredQuality) player.setPlaybackQualityRange(desiredQuality)
}

const setQualityOption = (event) => GM_setValue("yt-quality", event.target.value)

const setupConfigPage = () => {
  document.getElementById("placeholder").style.display = "none"
  document.getElementById("config").style.display = "block"
  const qualitySelect = document.getElementById("quality")
  const currentQuality = GM_getValue("yt-quality", "auto")
  qualitySelect.value = currentQuality
  qualitySelect.addEventListener("input", setQualityOption)
}

if (document.URL === "https://uscript.mchang.xyz/config/setquality") setupConfigPage()
document.addEventListener("yt-navigate-finish", setPlayerQuality);