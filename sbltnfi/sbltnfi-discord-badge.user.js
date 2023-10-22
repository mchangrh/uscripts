// ==UserScript==
// @name         sb.ltn.fi discord
// @namespace    mchang.name
// @version      1.2.3
// @description  Indicates if a SB user is on discord
// @author       michael mchang.name
// @match        https://sb.ltn.fi/*
// @icon         https://uscript.mchang.xyz/require/discord-badge.png
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-discord-badge.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-discord-badge.user.js
// @connect      mongo.mchang.xyz
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const AUTH = "tlB7XLNX3b33nbnx01hw";

function lookupUser (SBID, target) {
  GM_xmlhttpRequest({
    method: "GET",
    url: `https://mongo.mchang.xyz/sb-vip/discord?auth=${AUTH}&sbID=${SBID}`,
    timeout: 1000,
    onload: (res) => addBadge(res.status === 200, target),
    onerror: () => addBadge(false, target)
  });
}

const discordBadge = document.createElement("img");
discordBadge.src = "https://uscript.mchang.xyz/require/discord-badge.svg";
discordBadge.style.height = "1em";

const spanElem = document.createElement("span");
spanElem.title = "This user is on Discord";
spanElem.id = "mchang-discord-badge";
spanElem.classList = "badge bg-secondary ms-1";
spanElem.appendChild(discordBadge);

function addBadge (onDiscord, target) {
  if (!onDiscord) return;
  const clone = spanElem.cloneNode(true);
  if (target) target.after(clone);
  else {
    // scope to header
    const header = document.querySelector("div.row.mt-2 > .col-auto > .list-group");
    const username = header.children[0];
    username.appendChild(clone);
  }
}

function addBadges() {
  const pathname = new URL(document.URL).pathname;
  if (pathname.includes("/userid/")) {
    const SBID = pathname.split("/")[2];
    lookupUser(SBID);
  } else {
    document.querySelectorAll("a[href^='/userid/']").forEach(elem => {
      const SBID = elem.href.split("/")[4];
      if (elem.nextSibling?.matches("#mchang-discord-badge")) return;
      lookupUser(SBID, elem);
    });
  }
}

document.addEventListener("newSegments", addBadges);
addBadges();
