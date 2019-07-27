import TimeCalculations from '../Utils/TimeCalculations';

export default class InitialSession {
	videoTitle;
	videoURL;
	purposeDescription;
	startTime;
	finishedVideo;

	constructor(videoTitle, videoURL, purposeDescription, finishedVideo) {
		this.videoTitle = videoTitle;
		this.videoURL = videoURL;
		this.purposeDescription = purposeDescription;
		this.startTime = TimeCalculations.obtainCurrentTime();
		this.finishedVideo = finishedVideo;
	}
}
