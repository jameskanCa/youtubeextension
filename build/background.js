function runBackgroundScript() {
	// const object = { userEmail: 'random test' };
	// const test = JSON.stringify(object);
	// let myHeaders = new Headers();
	// myHeaders.append('Content-Type', 'application/json');
	// console.log(test);
	// fetch('http://localhost:3001/test', {
	// 	method: 'post',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		Accept: '*',
	// 		'Access-Control-Request-Headers': '*',
	// 		'Access-Control-Request-Method': '*'
	// 	},
	// 	mode: 'cors',
	// 	body: JSON.stringify(object)
	// })
	// 	.then(function(response) {
	// 		console.log(response);
	// 	})
	// 	.catch((e) => {
	// 		console.log(e);
	// 	});
	googleUserProfile();
	chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
		chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
			console.log('this is url' + details.url);
			if (
				details.url !== 'https://www.youtube.com' &&
				details.url.includes('youtube') &&
				details.url.includes('watch')
			) {
				chrome.tabs.sendMessage(details.tabId, {
					type: 'updatedLink',
					currentURL: details.url,
					metadata: await requestVideoMetadata(details.url)
				});

				chrome.storage.sync.get([ 'userId' ], function(result) {
					chrome.tabs.sendMessage(details.tabId, {
						type: 'userProfile',
						userId: result.userId
					});
				});
			} else {
				chrome.tabs.sendMessage(details.tabId, {
					type: 'noModal'
				});
			}
		});
	});
}
runBackgroundScript();

function googleUserProfile() {
	chrome.webNavigation.onCompleted.addListener(function(details) {
		chrome.identity.getProfileUserInfo((user) => {
			chrome.storage.sync.get([ 'userEmail' ], function(result) {
				if (result.userEmail == null) {
					chrome.storage.sync.set({ userEmail: result.userEmail }, function() {
						console.log('logged');
					});
				}
			});
			chrome.storage.sync.get([ 'userId' ], function(result) {
				if (result.userId == null) {
					chrome.storage.sync.set({ userId: user.userId }, function() {
						console.log('logged');
					});
				}
			});
		});
	});
}

let extractVideoId = function(url) {
	let video_id = url.split('v=')[1];
	if (video_id.indexOf('&') !== null && video_id.indexOf('&') != -1) {
		return video_id.substring(0, video_id.indexOf('&'));
	}
	return video_id;
};

let requestVideoMetadata = async function(url) {
	const youtubeApiKey = '&key=AIzaSyAashoQOOwdIq9_PeHgmHMvqzyjaxa1sbQ';
	const youtubeApiBaseLink = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=';
	const requestLink = youtubeApiBaseLink + extractVideoId(url) + youtubeApiKey;
	const result = await httpGetAsync(requestLink);
	return result.items[0];
};

let httpGetAsync = function(requestLink) {
	return fetch(requestLink).then(function(response) {
		return response.json();
	});
};
