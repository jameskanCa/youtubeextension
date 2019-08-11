/*global chrome*/
import xmlConverter from 'xml-js';

export default class YoutubeCaption {
	static requestVideoCaption(languageType) {
		return new Promise((resolve, reject) => {
			chrome.runtime.sendMessage({ method: 'getCaption', languageType: languageType }, function(response) {
				if (response.xmlResult != null) {
					let convertedJson = xmlConverter.xml2json(response.xmlResult, { compact: true, spaces: 4 });
					let captionResult = JSON.parse(convertedJson);
					let captionPara = captionResult.transcript.text.reduce((textAccumulator, captionObject) => {
						return textAccumulator.concat(captionObject._text).concat(' ');
					}, '');
					return resolve(captionPara);
				} else {
					reject('Empty xmlResult');
				}
			});
		});
	}

	static requestVideoLanguageOptions() {
		return new Promise((resolve, reject) => {
			chrome.runtime.sendMessage({ method: 'getLanguageOptions' }, function(response) {
				if (response.xmlResult != null) {
					let convertedJson = xmlConverter.xml2json(response.xmlResult, { compact: true, spaces: 4 });
					let languageTrackOptions = JSON.parse(convertedJson);
					if (languageTrackOptions.transcript_list.track != null) {
						let option = languageTrackOptions.transcript_list.track.map((attributes) => {
							return {
								lang_code: attributes._attributes.lang_code,
								lang_translated: attributes._attributes.lang_translated
							};
						});
						return resolve(option);
					} else {
						return resolve([]);
					}
				} else {
					reject('Empty xmlResult');
				}
			});
		});
	}
}
