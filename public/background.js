function runBackgroundScript() {
	chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			console.log('message sent');
			chrome.tabs.sendMessage(details.tabId, {
				type: 'updatedLink',
				currentURL: details.url,
				videoTitle: tabs[0].title
			});
		});

		// document.addEventListener('DOMContentLoaded', () => {
		// 	console.log('finished');
		// 	this.setState({ pauseVideo: true });
		// });
	});
}
runBackgroundScript();
