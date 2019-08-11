import TimeCalculations from '../Utils/TimeCalculations';

export default class InitialSession {
	videoId;
	videoTitle;
	purposeDescription;
	startTime;
	finishedVideo;

	constructor(videoId, videoTitle, purposeDescription, finishedVideo) {
		this.videoTitle = videoTitle;
		this.videoId = videoId;
		this.purposeDescription = purposeDescription;
		this.startTime = TimeCalculations.obtainCurrentTime();
		this.finishedVideo = finishedVideo;
	}
}
