import firebase from 'firebase';

export class StoreReview {
	// Get a reference to the database service

	static storeReview(Session) {
		const config = {
			apiKey: 'AIzaSyD1X94iKdJNlMrjfnVGFneyad0qgMN5NDE',
			authDomain: 'extensionproject.firebaseapp.com',
			databaseURL: 'https://extensionproject.firebaseio.com/',
			storageBucket: 'youtubeextensionproject.appspot.com'
		};
		const app = firebase.initializeApp(config);
		const databaseRef = app.database().ref(Session.userId);
		databaseRef.push(Session);
	}
}
