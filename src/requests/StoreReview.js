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

	static storeInitialReview(Session) {
		console.log(Session);
		const dbRef = this.database.ref(Session.userId);
		return dbRef.push(Session);
	}

	static storeEndReview(Session) {
		const dbRef = this.database.ref(Session.userId);
		return dbRef.push(Session);
	}
}
