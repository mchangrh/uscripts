// ==UserScript==
// @name         dropout.tv volume persistence
// @namespace    mchang.name
// @version      1.0.0
// @description  Persists volume settings on dropout.tv
// @author       michael mchang.name
// @match        https://embed.vhx.tv/videos/*
// @icon         https://signup.dropout.tv/favicon.png
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/misc/dropout-volume.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/misc/dropout-volume.user.js
// @require      https://uscript.mchang.xyz/require/wfke-el.js
// @grant        GM_getValue
// @grant        GM_setValue
// @license      GPL-3.0
// ==/UserScript==

const setVol = (el) => {
    const vol = GM_getValue("dropout-volume", 1);
    if (el.volume !== vol) el.volume = vol;
    el.onvolumechange = (evt) => GM_setValue("dropout-volume", evt.target.volume);
};

wfke(".vp-video video", setVol);