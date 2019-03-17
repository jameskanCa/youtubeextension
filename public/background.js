function runBackgroundScript() {
	chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (details.url !== 'https://www.youtube.com/') {
				chrome.tabs.sendMessage(details.tabId, {
					type: 'updatedLink',
					currentURL: details.url,
					videoTitle: tabs[0].title
				});
			}
		});
	});
}
runBackgroundScript();
