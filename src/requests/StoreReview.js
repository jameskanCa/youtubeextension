import firebase from 'firebase';

export class StoreReview {
	config = {
		apiKey: 'AIzaSyD1X94iKdJNlMrjfnVGFneyad0qgMN5NDE',
		authDomain: 'extensionproject.firebaseapp.com',
		databaseURL: 'https://extensionproject.firebaseio.com/',
		storageBucket: 'youtubeextensionproject.appspot.com'
	};
	app = firebase.initializeApp(config);

	// Get a reference to the database service
	database = this.app.database.database().ref().child('Session');
	static establishConnection() {}

	static storeReview(Session) {
		console.console.log(Session);
	}
}
