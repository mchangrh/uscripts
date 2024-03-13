// ==UserScript==
// @name         Video Titles for sb.ltn.fi (with InnerTube)
// @namespace    mchang.name
// @version      3.1.0
// @description  Replaces the video ID with the video title in the 'Video ID' column.
// @author       TheJzoli, michael mchang.name
// @match        https://sb.ltn.fi/*
// @connect      www.youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/fork/sbltnfi-it-videotitle.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/fork/sbltnfi-it-videotitle.user.js
// @connect      www.youtube.com
// @require      https://uscript.mchang.xyz/require/sbltnfi-helpers.js
// @require      https://uscript.mchang.xyz/sbltnfi/videotitle/innertube.js
// @connect      www.youtube.com
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

const videoIdAndRowElementObj = {};

(function() {
  "use strict";
  const animationCss = `
  .loading {
    display: inline-block;
    vertical-align: middle;
    width: 1em;
    height: 1em;
    margin-left: 0.5em;
  }
  .loading::after {
    content: ' ';
    display: block;
    width: 0.9em;
    height: 0.9em;
    border-radius: 50%;
    border: 0.1em solid #fff;
    border-color: #cccc #cccc #cccc transparent;
    animation: loader 1.2s linear infinite;
  }
  @keyframes loader {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;
  GM_addStyle(animationCss);

  const columnIndex = headerKeys?.["VideoID"] ?? headerKeys?.["Videoid"];
  const table = document.querySelector("table.table");
  if (headerKeys?.["VideoID"]) {
    [...table.querySelectorAll("thead th")][columnIndex].firstChild.innerText = "Video";
  } else {
    [...table.querySelectorAll("thead th")][columnIndex].innerText = "Video";
  }
  rows.forEach(row => {
    const videoIdEl = row.children[columnIndex].firstChild;
    const loadingEl = document.createElement("span");
    loadingEl.classList.add("loading");
    videoIdEl.appendChild(loadingEl);
    const videoID = videoIdEl.innerText.trim();
    if (videoID in videoIdAndRowElementObj) {
      videoIdAndRowElementObj[videoID].push(videoIdEl);
    } else {
      videoIdAndRowElementObj[videoID] = [videoIdEl];
    }
  });
  for (const [key, value] of Object.entries(videoIdAndRowElementObj)) callApi(key, value);

  function callApi(videoID, videoIdElArray) {
    function removeLoading() {
      videoIdElArray.forEach(videoIdEl => {
        videoIdEl.firstElementChild?.classList.remove("loading");
      });
    }
    getTitle(videoID)
      .then(title => {
        if (title) {
          videoIdElArray.forEach(videoIdEl => videoIdEl.innerText = title);
        }
        removeLoading();
      }).catch(() => removeLoading());
  }
})();