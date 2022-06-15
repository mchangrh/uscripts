// ==UserScript==
// @name         SponsorBlock clickable startTime (sb.ltn.fi) fork
// @namespace    mchang-sb.ltn.fi.clickable.starttime
// @version      1.0.1
// @description  Makes the startTime clickable
// @author       Michael Chang <michael@mchang.name
// @match        https://sb.ltn.fi/*
// @grant        none
// ==/UserScript==

const videoRegex = new RegExp(/(?:(?:video\/)|(?:videoid=))([0-9A-Za-z_-]{11})/);
const findVideoID = (str) => str.match(videoRegex)[1];
let videoId = findVideoID(window.location.href);

(function() {
    'use strict';

    [...document.querySelectorAll('table')].forEach(table => {
      const headers = [...table.querySelectorAll('thead th')].map(item => item.textContent.trim());
      if (headers.includes('Start') && headers.includes('End')) {
        const startColumnIndex = headers.indexOf('Start');
        const UUIDColumnIndex = headers.indexOf('UUID');
        const videoIdColumnIndex = headers.indexOf('Video ID');
        const rows = [...table.querySelectorAll('tbody tr')];

        rows.forEach(row => {
          if (videoIdColumnIndex != -1) {
            videoId = row.children[videoIdColumnIndex].textContent.trim().slice(0, -3);
          }
          const UUID = row.children[UUIDColumnIndex].textContent.trim().slice(0, -1);
          const cellEl = row.children[startColumnIndex];
          const content = cellEl.textContent.trim();
          const link = document.createElement('a');
          let startTimeSeconds = content.split(/[\:\.]/).map(s=>Number(s)).reverse().map((val,index) => {
            return [0, 1, 60, 3600][index] * val;
          }).reduce((acc, curr)=>acc+curr, 0);
          link.textContent = content;
          link.style.color = 'inherit';
          link.href = `https://www.youtube.com/watch?v=${videoId}&t=${Math.max(0, startTimeSeconds - 2)}s#requiredSegment=${UUID}`;
          cellEl.innerHTML = '';
          cellEl.appendChild(link);
        });
      }
    });
})();

function wrapElement(target, el) {
  el.innerHTML = target.innerHTML;
  target.innerHTML = el.innerHTML
}