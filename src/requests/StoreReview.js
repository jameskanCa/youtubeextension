import firebase from 'firebase';

export class StoreReview {
	static config = {
		apiKey: 'AIzaSyD1X94iKdJNlMrjfnVGFneyad0qgMN5NDE',
		authDomain: 'extensionproject.firebaseapp.com',
		databaseURL: 'https://extensionproject.firebaseio.com/',
		storageBucket: 'youtubeextensionproject.appspot.com'
	};
	static storeInitialReview(Session) {
		const app = firebase.initializeApp(this.config);
		const databaseRef = app.database().ref(Session.userId);
		return databaseRef.push();
	}

	static storeEndReview(Session) {
		const app = firebase.initializeApp(this.config);
		const databaseRef = app.database().ref(Session.userId);
		return databaseRef.push(Session);
	}
}
