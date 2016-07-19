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
		name_tokens = message.name.split(' ');
		document.getElementById('person_first_name').value = name_tokens[0];

		// assuming last name is everything in the name except first name
		name_tokens.splice(0, 1);
		document.getElementById('person_last_name').value = name_tokens.join(' ');

		// assuming headline is of the form "position at company"
		headline_tokens = message.headline.split(' at ');
		document.getElementById('person_title').value = headline_tokens[0];

		if (headline_tokens.length > 1) {
			headline_tokens.splice(0, 1);
			document.getElementById('person_company').value = headline_tokens.join(' ');
		}

		document.getElementById('social_media').value = message.url;

		var li_url = document.createElement('a');
		var name = document.createTextNode(message.name);
		li_url.appendChild(name);
		li_url.title = message.name;
		li_url.href = message.url;
		document.getElementById('names').appendChild(li_url);

	}
});

console.log("GH: gh.js loaded");
