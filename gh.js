// ==UserScript==
// @name Link GH
// @description Fill out GH Prospecting fields from a LI page
// @match http://linkedin.com/*
// @match https://linkedin.com/*
// @match https://*.linkedin.com/*
// @match https://app.greenhouse.io/*
// ==/UserScript==

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.type == 'GH') {
		console.log("GH: got message:");
		console.log(message);
	}
});

console.log("GH: gh.js loaded");
