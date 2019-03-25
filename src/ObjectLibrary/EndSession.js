import TimeCalculations from '../Utils/TimeCalculations';
export default class EndSession {
	userId;
	finishedVideo;
	endTime;
	notes;
	constructor(userId, finishedVideo, notes) {
		this.userId = userId;
		this.finishedVideo = finishedVideo;
		this.endTime = TimeCalculations.obtainCurrentTime();
		this.notes = notes;
	}
}
