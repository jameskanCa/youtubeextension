runBackgroundScript();

function runBackgroundScript() {
	chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, { type: 'updatedLink', currentURL: tab[0].url });
		});
	});
}
