// ==UserScript==
// @name         Video Titles for sb.ltn.fi (with InnerTube)
// @namespace    mchang.name
// @version      2.0.4
// @description  Replaces the video ID with the video title in the 'Video ID' column.
// @author       TheJzoli, michael@mchang.name
// @match        https://sb.ltn.fi/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      www.youtube.com
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
        const itRequest = JSON.stringify({
            context: {
                client: {
                clientName: "WEB",
                clientVersion: "2.20211129.09.00"
                }
            },
            videoId: videoID,
        })
        function removeLoading() {
          videoIdElArray.forEach(videoIdEl => {
              videoIdEl.firstElementChild?.classList.remove('loading');
          });
        }
        GM_xmlhttpRequest({
            method:         'POST',
            url:            "https://www.youtube.com/youtubei/v1/player",
            responseType:   'json',
            data:           itRequest,
            timeout:        10000,
            onload:         (responseObject) => {
                // Inject the new name in place of the old video ID
                const title = responseObject?.response?.videoDetails?.title
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