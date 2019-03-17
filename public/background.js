function runBackgroundScript() {
	chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(details.tabId, {
				type: 'updatedLink',
				currentURL: details.url,
				videoTitle: tabs[0].title
			});
		});
	});
}
runBackgroundScript();
