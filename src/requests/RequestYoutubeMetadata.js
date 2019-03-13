export default class RequestYoutubeMetadata {
	static extractVideoId(url) {
		console.log(url);
		let video_id = url.split('v=')[1];
		console.log(video_id);
		if (video_id.indexOf('&') !== null && video_id.indexOf('&') != -1) {
			return video_id.substring(0, video_id.indexOf('&'));
		}
		return video_id;
	}

	static async requestVideoMetadata(url) {
		const youtubeApiKey = '&key=AIzaSyBpbBfq5z_X3vpax0kdpHUsvDdCOAnOXYc';
		const youtubeApiBaseLink = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=';

		const videoId = this.extractVideoId(url);
		const requestLink = youtubeApiBaseLink + videoId + youtubeApiKey;
		return await this.httpGetAsync(requestLink);
	}

	static async httpGetAsync(theUrl) {
		let response = await fetch(theUrl);
		return await response.json();
	}
}
