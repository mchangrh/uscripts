// ==UserScript==
// @name         sb.ltn.fi preset redirect + replace
// @namespace    mchang.name
// @version      1.0.1
// @description  make sure all sbltnfi links are filtered appropiately - redirect or replace hrefs
// @author       michael@mchang.name
// @match        https://sb.ltn.fi/video/*
// @match        https://sb.ltn.fi/uuid/*
// @match        https://sb.ltn.fi/username/*
// @match        https://sb.ltn.fi/userid/*
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @run-at       document-start
// @grant        none
// ==/UserScript==

// custom filters for SBB
const videoFilter = new URLSearchParams({
  "votes_min": 0,
  "views_min": 1,
  "sort": "starttime"
})

const userFilter = new URLSearchParams({
  "votes_min": 0,
  "views_min": 1
})

function substitute(url) {
  // check which endpoint
  const user = url.includes("/userid/") || url.includes("/username/")
  const video = url.includes("/video/") || url.includes("/uuid/")
  const filter = user ? userFilter
    : video ? videoFilter
    : null
  if (!filter) return false
  const newURL = new URL(url)
  const newSearchParams = new URLSearchParams(filter)
  if (!newSearchParams.toString().length) return false // don't infinite loop if no params specified
  newURL.search = newSearchParams
  return newURL.toString()
}

function redirect() {
  const url = window.location.toString()
  // check if there are search params already
  const params = new URL(url).searchParams.toString()
  if (params.length) return
  const newURL = substitute(url)
  if (!newURL) return
  window.location.replace(newURL)
}

function replaceLinks() {
  document.querySelectorAll("a").forEach(link => {
    const newhref = substitute(link.href)
    if (newhref) link.setAttribute("href", newhref)
  })
}

redirect()
// wait 200ms for document-end
window.addEventListener("DOMContentLoaded", () => setTimeout(replaceLinks, 200))