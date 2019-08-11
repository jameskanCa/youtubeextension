/*global chrome*/
/* eslint-disable no-undef */
export default class Stroage {
	static storeValue(key, value) {
		chrome.runtime.sendMessage({ method: 'setValue', key: key, value: value }, function(response) {});
	}

	static getValue(key) {
		return new Promise((resolve, reject) => {
			chrome.runtime.sendMessage({ method: 'getValue', key: key }, function(response) {
				if (response.currentId != null) {
					return resolve(response.currentId);
				} else {
					reject('Something wrong');
				}
			});
		});
	}

	static storeLocalStorage(key, value) {
		window.localStorage.setItem(key, value);
	}

	static getLocalStroage(key) {
		let response = window.localStorage.getItem(key);
		return response;
	}
}
