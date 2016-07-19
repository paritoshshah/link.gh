// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
	// If the letter 'g' is found in the tab's URL...
	if (tab.url.indexOf('https://www.linkedin.com') > -1) {
		// ... show the page action.
		chrome.pageAction.show(tabId);
	}
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);			
chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, { file: "link.gh.user.js" });
	chrome.tabs.sendMessage(tab.id, {type: "LI", query: "parse_profile"}, null, function(response) {
		// redirect this response to GH, need to set an additional 'type' field for that
		response.type = 'GH';
		chrome.tabs.sendMessage(tab.id, response);
	});
});
