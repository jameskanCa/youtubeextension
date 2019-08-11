async function requestVideoCaption(languageType) {
	const youtubeCaptionDownloadLink =
		'https://video.google.com/timedtext?type=track&v=' +
		localStorage.getItem('youtubeURLVideoId') +
		'&id=0&lang=' +
		languageType;

	let result = await fetch(youtubeCaptionDownloadLink);
	return await result.text();
}

async function requestVideoLanguageOption() {
	const languageOption = 'http://video.google.com/timedtext?type=list&v=' + localStorage.getItem('youtubeURLVideoId');
	let result = await fetch(languageOption);
	return await result.text();
}
