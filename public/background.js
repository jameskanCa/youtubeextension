function runBackgroundScript() {
	chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			if (details.url !== 'https://www.youtube.com/') {
				chrome.tabs.sendMessage(details.tabId, {
					type: 'updatedLink',
					currentURL: details.url,
					videoTitle: tabs[0].title
				});

				chrome.identity.getProfileUserInfo((user) => {
					chrome.tabs.sendMessage(tabs[0].id, {
						type: 'userProfile',
						userName: user.email,
						userId: user.id
					});
				});
			}
		});
	});
}
runBackgroundScript();

// function googleUserProfile() {
// 	chrome.identity.getProfileUserInfo((user) => {
// 		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
// 			chrome.tabs.sendMessage(tabs[0].id, {
// 				type: 'userProfile',
// 				userEmail: user.email,
// 				userId: user.id
// 			});
// 		});
// 	});
// }
// googleUserProfile();
