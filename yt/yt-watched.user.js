// ==UserScript==
// @name         YouTube Flag Watched
// @namespace    mchang.name
// @version      1.1.2
// @description  Flag watched videeos
// @author       michael mchang.name
// @match        https://www.youtube.com/*
// @icon         https://www.youtube.com/favicon.ico
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-watched.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/yt/yt-watched.user.js
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==
/* eslint-disable no-useless-escape */

const css = `
ytd-thumbnail:has(#progress[style="width: 100%;"])>#thumbnail {
    opacity: 0.35;
}
ytd-thumbnail:has(#progress[style="width: 100%;"])::after {
    content: \"WATCHED\";
    z-index: 2;
    color: white;
	top: 40%;
	font-size: 1.4rem;
	text-align: center;
	text-transform: uppercase;
    position: absolute;
    width: 100%;
}
`;
GM_addStyle(css); 