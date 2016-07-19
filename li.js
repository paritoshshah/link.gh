// ==UserScript==
// @name Link GH
// @description Fill out GH Prospecting fields from a LI page
// @match http://linkedin.com/*
// @match https://linkedin.com/*
// @match https://*.linkedin.com/*
// @match https://app.greenhouse.io/*
// ==/UserScript==

function parse_profile() {
	return { name: document.getElementById('name').innerText, headline: document.getElementById('headline').innerText, url: document.getElementsByClassName('view-public-profile')[0].href };
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.type == 'LI') {
		if(message.query == 'parse_profile') {
			sendResponse(parse_profile());
		}
	}
});
