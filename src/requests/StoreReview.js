import firebase from 'firebase';

export class StoreReview {
	static config = {
		apiKey: 'AIzaSyD1X94iKdJNlMrjfnVGFneyad0qgMN5NDE',
		authDomain: 'extensionproject.firebaseapp.com',
		databaseURL: 'https://extensionproject.firebaseio.com/',
		storageBucket: 'youtubeextensionproject.appspot.com'
	};
	static app = firebase.initializeApp(this.config);
	static database = this.app.database();

	static storeInitialReview(session) {
		const dbRef = this.database.ref(session.userId);
		return dbRef.push({
			videoURL: session.videoURL,
			purposeDescription: session.purposeDescription,
			startTime: session.startTime,
			finishedVideo: false
		});
	}

	static storeEndReview(endSession, databaseKey) {
		this.database
			.ref(`${endSession.userId}/${databaseKey}`)
			.update({ endTime: endSession.endTime, notes: endSession.notes, finishedVideo: endSession.finishedVideo });
	}
}
