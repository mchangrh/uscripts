// ==UserScript==
// @name         dab SB stats
// @namespace    mchang.name
// @version      1.0.0
// @description  Shows SB stats of a user on DAB
// @author       michael mchang.name
// @match        https://dearrow.minibomba.pro/user_id/*
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/dab/dab-sb-stats.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/dab/dab-sb-stats.user.js
// @icon         https://dearrow.minibomba.pro/logo-7d3ef56a319cca02.svg
// @require      https://uscript.mchang.xyz/require/GM_fetch.js
// @connect      sponsor.ajay.app
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

const lookupUser = async (SBID) => GM_xmlhttpRequestPromise(`https://sponsor.ajay.app/api/userinfo?publicUserID=${SBID}&values=["segmentCount","viewCount"]`);

async function addSBStats() {
    const SBID = new URL(document.URL).pathname.split("/")[2];
    const stats = await lookupUser(SBID);
    // delete minutesSaved
    const statsObj = JSON.parse(stats.response);
    delete statsObj.minutesSaved;
    const statsElem = document.querySelector("div#page-details > div#details-table");
    for (const [key, value] of Object.entries(statsObj)) {
        const elem = document.createElement("div");
        elem.textContent = `${key}: ${value}`;
        statsElem.appendChild(elem);
    }
}

addSBStats();
