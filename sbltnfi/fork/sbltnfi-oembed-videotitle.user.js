// ==UserScript==
// @name         Video Titles for sb.ltn.fi (with OEmbed)
// @namespace    mchang.name
// @version      3.0.1
// @description  Replaces the video ID with the video title in the 'Video ID' column.
// @author       TheJzoli, michael mchang.name
// @match        https://sb.ltn.fi/*
// @connect      www.youtube.com
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/fork/sbltnfi-oembed-videotitle.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/fork/sbltnfi-oembed-videotitle.user.js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

const videoIdAndRowElementObj = {};

(function() {
  'use strict';
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

  [...document.querySelectorAll('table.table')].forEach(table => {
    const headers = [...table.querySelectorAll('thead th')].map(item => item.textContent.trim());
    if (headers.includes('VideoID') || headers.includes('Videoid')) {
      const columnIndex = headers.includes('VideoID') ? headers.indexOf('VideoID') : headers.indexOf('Videoid');
      if (headers.includes('VideoID')) {
        [...table.querySelectorAll('thead th')][columnIndex].firstChild.innerText = "Video";
      } else {
        [...table.querySelectorAll('thead th')][columnIndex].innerText = "Video";
      }
      const rows = [...table.querySelectorAll('tbody tr')];

      rows.forEach(row => {
        const videoIdEl = row.children[columnIndex].firstChild;
        const loadingEl = document.createElement('span');
        loadingEl.classList.add("loading");
        videoIdEl.appendChild(loadingEl);
        const videoID = videoIdEl.innerText.trim();
        if (videoID in videoIdAndRowElementObj) {
          videoIdAndRowElementObj[videoID].push(videoIdEl);
        } else {
          videoIdAndRowElementObj[videoID] = [videoIdEl];
        }
      });
      for (const [key, value] of Object.entries(videoIdAndRowElementObj)) {
        callApi(key, value);
      }
    }
  });
})();

function callApi(videoID, videoIdElArray) {
  try {
    function removeLoading() {
      videoIdElArray.forEach(videoIdEl => {
        videoIdEl.firstElementChild?.classList.remove('loading');
      });
    }
    GM_xmlhttpRequest({
      url:            `https://www.youtube.com/oembed?url=youtube.com/watch?v=${videoID}&format=json`,
      responseType:   'json',
      timeout:        10000,
      onload:         (responseObject) => {
        // Inject the new name in place of the old video ID
        const title = responseObject?.title
        if (title) {
          videoIdElArray.forEach(videoIdEl => {
            videoIdEl.innerText = title;
          });
        }
        removeLoading()
      },
      onerror: removeLoading(),
      ontimeout: removeLoading()
    });
  } catch (error) {
    console.error(error);
  }
}