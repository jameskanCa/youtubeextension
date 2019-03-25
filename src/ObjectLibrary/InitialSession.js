import TimeCalculations from '../Utils/TimeCalculations';

export default class InitialSession {
	userId;
	videoTitle;
	videoURL;
	purposeDescription;
	startTime;
	finishedVideo;

	constructor(userId, videoTitle, videoURL, purposeDescription, finishedVideo) {
		this.userId = userId;
		this.videoTitle = videoTitle;
		this.videoURL = videoURL;
		this.purposeDescription = purposeDescription;
		this.startTime = TimeCalculations.obtainCurrentTime();
		this.finishedVideo = finishedVideo;
	}
}
