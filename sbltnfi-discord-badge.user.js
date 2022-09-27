// ==UserScript==
// @name         sb.ltn.fi discord badge
// @namespace    mchang.name
// @version      1.0.2
// @description  Indicates if a SB user is on discord
// @author       mchangrh
// @match        https://sb.ltn.fi/userid/*
// @icon         https://cdn.mchang.xyz/uscript/discord-badge.png
// @grant        GM_xmlhttpRequest
// @updateURL    https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/sbltnfi-discord-badge.user.js
// @downloadURL  https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/sbltnfi-discord-badge.user.js
// ==/UserScript==

const AUTH = "tlB7XLNX3b33nbnx01hw"

function lookupUser (SBID) {
  GM_xmlhttpRequest({
    method: "GET",
    url: `https://mongo.mchang.xyz/sb-vip/discord?auth=${AUTH}&sbID=${SBID}`,
    timeout: 1000,
    onload: (res) => addBadge(res.status === 200),
    onerror: (res) => addBadge(false)
  })
}

const discordBadge = document.createElement("img")
discordBadge.src = "https://cdn.mchang.xyz/uscript/discord-badge.svg"
discordBadge.style.height = "1em"

const spanElem = document.createElement("span");
spanElem.title = "This user is on Discord"
spanElem.classList = "badge bg-secondary ms-1"
spanElem.appendChild(discordBadge)

function addBadge (onDiscord) {
  // scope to header
  const header = document.querySelector("div.row.mt-2 > .col > .list-group")
  const username = header.children[0]
  if (onDiscord) username.appendChild(spanElem)
}

(function () {
  "use strict"
  const SBID = new URL(document.URL).pathname.split("/")[2]
  lookupUser(SBID)
})()