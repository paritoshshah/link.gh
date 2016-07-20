// ==UserScript==
// @name Link GH
// @description Fill out GH Prospecting fields from a LI page
// @match http://linkedin.com/*
// @match https://linkedin.com/*
// @match https://*.linkedin.com/*
// @match https://app.greenhouse.io/*
// ==/UserScript==

function safe_lookup(o, p) {
	if (!!o) { return o[p] };
	return "";
}

function parse_profile() {
	return { 
		name: document.getElementById('name').innerText, 
		headline: document.getElementById('headline').innerText, 
		url: safe_lookup(document.getElementsByClassName('view-public-profile')[0], 'href'),
		current: safe_lookup(document.getElementById('overview-summary-current'), 'innerText').split('\n')[1]
	};
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.type == 'LI') {
		if(message.query == 'parse_profile') {
			sendResponse(parse_profile());
		}
	}
});
