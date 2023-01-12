// ==UserScript==
// @name         Add SMTPE format to YouTube time
// @namespace    mchang.name
// @version      1.0.2
// @description  Add frames to YouTube time
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-smpte.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-smpte.user.js
// @require      https://uscript.mchang.xyz/require/wfke.js
// @grant        none
// ==/UserScript==

let smpte = true;
let framerate;
let video;

function getFramerate() {
  const player = document.querySelector('#movie_player');
  const fps = player
    .getStatsForNerds()
    .resolution
    .split("/")[0]
    .split("@")[1].trim();
  return Number(fps);
}

function getCurrentFrame() {
  // get current time
  const currentTime = video.currentTime;
  // split into sec, ms
  const [seconds, ms] = (""+currentTime).split(".");
  const msTime = Number("0."+ms);
  // get frame of ms
  const msFrame = Math.floor(msTime / (1/framerate));
  const secFrame = Number(seconds) * framerate;
  return { total: secFrame + msFrame, ms: msFrame };
}

function setFrames() {
  // create element if dne
  const el = document.getElementById("mchang-ytsmpte");
  if (!el) createElement()
  // get framerate, get frame
  framerate = getFramerate();
  const { total, ms } = getCurrentFrame();
  const padMs = (""+ms).padStart(2, "0")
  const value = smpte ? padMs : ` (${total})`;
  el.innerText = value;
}

function createElement() {
  const spanEl = document.createElement('span');
  spanEl.id = "mchang-ytsmpte";
  spanEl.class = "ytp-time-duration";
  if (smpte) {
    // add ; seperator
    const seperator = document.createElement('span');
    seperator.innerText = ";";
    seperator.class = "ytp-time-separator";
    // add to selectors
    const duration = document.querySelector('.ytp-time-current');
    duration.after(seperator);
    seperator.after(spanEl);
  } else {
    const timeParent = document.querySelector('.ytp-time-current').parentElement;
    timeParent.append(spanEl);
  }
}

const playingLoop = () => { if (!video.paused) setFrames(); };
const startLoop = () => setInterval(playingLoop, 10000) // update every 10s

function mainLoop() {
  video = document.querySelector("video");
  video.addEventListener("seeked", setFrames);
  video.addEventListener("pause", setFrames);
  video.addEventListener("play", startLoop, once = true);
}

const awaitPlayer = () => wfke(".ytp-time-display", mainLoop)
document.body.addEventListener("yt-navigate-finish", (event) => awaitPlayer() );