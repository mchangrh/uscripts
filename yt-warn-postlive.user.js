// ==UserScript==
// @name         Warn on Post-Live Manifestless
// @namespace    mchang.name
// @version      1.0.0
// @description  adds a big red warning to the top of the screen when video is post-live manifestless
// @author       michael@mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// @updateURL    https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/yt-warn-postlive.user.js
// @downloadURL  https://gist.github.com/mchangrh/9507604353e37b6abc2f7f6b3c6e1338/raw/yt-warn-postlive.user.js
// ==/UserScript==

let playerDetail;

function warn() {
  if (document.getElementById("postlive-warning") === null) {
    const cont = document.querySelector('ytd-masthead#masthead');
    const spanEl = document.createElement('span');
    spanEl.id = "postlive-warning";
    spanEl.textContent = "!!!!! post-live manifestless !!!!!";
    spanEl.style = `
    font-size: 16px;
    text-align: center;
    padding-top: 5px;
    display: block;
    color: #fff;
    background: #f00;
    width: 100%;
    height: 30px;`
    cont.prepend(spanEl);
  }
}

const checkRequired = () => {
  if (playerDetail.getVideoData().isManifestless) warn()
}

function awaitMasthead() {
  const ready = document.querySelector('ytd-masthead#masthead');
  if (ready) return checkRequired()
  else return setTimeout(awaitMasthead, 100)
}

const hookDetail = (e) => {
  playerDetail = e.detail
  awaitMasthead()
}

document.body.addEventListener("yt-navigate-finish", (event) => awaitMasthead() );
const setup = () => document.addEventListener("yt-player-updated", hookDetail)
setup()
