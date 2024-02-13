// ==UserScript==
// @name         sb.ltn.fi page input box
// @namespace    mchang.name
// @version      1.0.0
// @description  Navigate to a page by inputting the page number
// @author       michael mchang.name
// @match        https://sb.ltn.fi/*
// @icon         https://sb.ltn.fi/static/browser/logo.png
// @updateURL    https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-discord-badge.user.js
// @downloadURL  https://raw.githubusercontent.com/mchangrh/uscripts/main/sbltnfi/sbltnfi-discord-badge.user.js
// ==/UserScript==

function replaceElipsis() {
    // replace elipsis with input box
    const elipsis = document.querySelectorAll("li.page-item>a.page-link:not([href])");
    const inputBoxes = document.querySelectorAll(".pagination>li");
    const maxPage = inputBoxes[inputBoxes.length - 2].textContent.trim();
    elipsis.forEach((elipsis) => {
        const input = createInputBox(maxPage);
        elipsis.replaceWith(input);
    });
}

function navigateToPage(page) {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page);
    window.location = url;
}

function createInputBox(maxPage) {
    const input = document.createElement("input");
    const curPage = new URLSearchParams(window.location.search).get("page") || 1;
    input.type = "number";
    input.min = 1;
    input.max = maxPage;
    input.value = curPage;
    input.classList.add("page-link");
    input.style.maxWidth = "8ch";
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") navigateToPage(input.value);
    });
    return input;
}

replaceElipsis();