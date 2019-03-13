export default class VideoMetadata {
	url = '';
	videoTitle = '';
	videoDuration = 0;
	videoDescription = '';
	videoCategory = 0;
	constructor(url, videoTitle, videoDuration, videoDescription, videoCategory) {
		this.url = url;
		this.videoTitle = videoTitle;
		this.videoDuration = videoDuration;
		this.videoDescription = videoDescription;
		this.videoCategory = videoCategory;
	}
}
