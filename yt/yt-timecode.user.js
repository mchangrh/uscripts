// ==UserScript==
// @name         Additional YouTube timecode formats
// @namespace    mchang.name
// @version      1.0.3
// @description  Add opptional timecodes/ indicator to youtube time or duration
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @match        https://uscript.mchang.xyz/config/timecode
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-timecode.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-timecode.user.js
// @require      https://uscript.mchang.xyz/require/wfke.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

let framerate;
let video;
const config = GM_getValue("config", { smpte: true });

function getFramerate() {
  const player = document.getElementById("movie_player");
  const fps = player
    .getStatsForNerds()
    .resolution
    .split("/")[0]
    .split("@")[1].trim();
  return Number(fps);
}

// ms => frames
const convertToFrame = (ms) => Math.floor(Number("0."+ms) / (1/framerate));
// use sb rounded time for consistency with extension
const sbRoundTime = (time) => (Math.round((time + Number.EPSILON) * 1000) / 1000).toFixed(3);

function getFrames(time) {
  // split into sec, ms
  const [seconds, ms] = (""+time).split(".");
  // get frame of ms
  const msFrame = convertToFrame(ms);
  const secFrame = Number(seconds) * framerate;
  return { total: secFrame + msFrame, ms: msFrame };
}

function resetLoop() {
  clearInterval(playingLoop);
  // recreate duration timecode if needed
  updateDurationTc();
  updateCurrentTc();
}

function updateTc(time, element) {
  if (config.ms) {
    const ms = (""+time).split(".").pop() ?? "000";
    element.textContent = "."+ms;
  } else {
    const { total, ms } = getFrames(time);
    element.textContent = config?.smpte
      ? (""+ms).padStart(2, "0")
      : ` (${total})`;
  }
}

function createTimecodes(time, selector, config) {
  const targetClass = `ytp-time-${selector}`;
  const target = document.querySelector(`.${targetClass}`);
  const spanEl = document.createElement("span");
  const id = `mchang-yttc-${selector}`;
  const existing = document.getElementById(id);
  if (existing) return;
  spanEl.className = targetClass;
  spanEl.id = id;
  // modify content based on flags
  if (config.ms || config.frames) target.after(spanEl);
  else if (config.smpte) {
    // add ; seperator
    const seperator = document.createElement("span");
    seperator.className = "ytp-time-separator";
    seperator.innerText = ";";
    // add to selectors
    target.after(seperator);
    seperator.after(spanEl);
  }
  updateTc(time, spanEl);
}

const updateCurrentTc = () => updateTc(sbRoundTime(video.currentTime), document.getElementById("mchang-yttc-current"));
const updateDurationTc = () => {
  const target = document.querySelector("#mchang-yttc-duration");
  if (!target) createTimecodes(video.duration, "duration", config);
  else if (!isFinite(target?.textContent)) updateTc(video.duration, target);
};
const playingLoop = () => { if (!video.paused) updateCurrentTc(); };
const startPlayingLoop = () => setInterval(playingLoop, 10000); // update every 10s

function mainLoop() {
  video = document.querySelector("video");
  framerate = getFramerate();
  createTimecodes(video.duration, "duration", config);
  createTimecodes(sbRoundTime(video.currentTime), "current", config);
  video.addEventListener("seeked", updateCurrentTc);
  video.addEventListener("pause", updateDurationTc);
  video.addEventListener("play", startPlayingLoop, true);
}

const setConfigOption = (event) => {
  const obj = {};
  obj[event.target.value] = true;
  GM_setValue("config", obj);
};

const setupConfigPage = () => {
  document.getElementById("placeholder").style.display = "none";
  document.getElementById("config").style.display = "block";
  const current = GM_getValue("config", null);
  if (current) Object.keys(current).forEach((key) => document.getElementById(key).checked = true);
  document.querySelectorAll("input[type=radio]").forEach((radio) => radio.addEventListener("change", setConfigOption));
};

const awaitPlayer = () => wfke(".ytp-time-display", mainLoop);
document.body.addEventListener("yt-navigate-finish", (e) => awaitPlayer());
if (document.URL === "https://uscript.mchang.xyz/config/timecode") setupConfigPage();
