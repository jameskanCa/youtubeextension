import * as moment from 'moment';
export default class TimeCalculations {
	/*
    Calculate the total duration someone spent on a video
    which is independent of total time spent on the actual youtube page. */
	static obtainTotalActualVideoDuration(startTime, endTime) {
		const actualVideoDuration = endTime - startTime;
		return actualVideoDuration;
	}

	/**
     * 
     * @param {*} startTime 
     * @param {*} endTime 
     * @param {*} expectedDuration 
     */
	static obtainDifferenceInDurationExpectation(startTime, endTime, expectedDuration) {
		const actualVideoDuration = this.obtainTotalActualVideoDuration(startTime, endTime);
		const durationDifferences = actualVideoDuration - expectedDuration;
		return durationDifferences;
	}

	static formatReadableTime(time) {
		const readableTime = moment(time);
		if (readableTime.hour !== null || readableTime !== 0) {
			return readableTime.format('HH:mm:ss');
		} else {
			return readableTime.format('mm:ss');
		}
	}

	static formatReadableDuration(time) {
		const durationInSeconds = this.obtainDurationSeconds(time);
		const formattedDuration = moment().seconds(durationInSeconds).format('H mm:ss');
		return formattedDuration;
	}

	static obtainDurationSeconds(time) {
		const readableDuration = moment.duration(time, moment.ISO_8601);
		return readableDuration.asSeconds();
	}

	static obtainCurrentTime() {
		return moment().format('MMM/DD/YYYY HH:mm:ss');
	}

	static formatSecondsToMinutes(duration) {
		const durationSeconds = this.obtainDurationSeconds(duration);
		const seconds = durationSeconds % 60;
		const minutes = Math.trunc(durationSeconds / 60);
		return `${minutes} Minutes ${seconds} Seconds`;
	}
}
