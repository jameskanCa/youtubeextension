export class StoreReview {
	// static config = {
	// 	apiKey: 'AIzaSyD1X94iKdJNlMrjfnVGFneyad0qgMN5NDE',
	// 	authDomain: 'extensionproject.firebaseapp.com',
	// 	databaseURL: 'https://extensionproject.firebaseio.com/',
	// 	storageBucket: 'youtubeextensionproject.appspot.com'
	// };
	// static app = firebase.initializeApp(this.config);
	// static database = this.app.database();

	static storeInitialReview(session) {
		fetch('http://localhost:3001/test', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					Accept: '*',
					'Access-Control-Request-Headers': '*',
					'Access-Control-Request-Method': '*'
				},
				mode: 'cors',
				body: JSON.stringify({
					videoURL: session.videoURL,
					purposeDescription: session.purposeDescription,
					startTime: session.startTime,
					finishedVideo: false
				})
			})
			.then(function (response) {
				console.log(response);
			})
			.catch((e) => {
				console.log(e);
			});
		// const dbRef = this.database.ref(session.userId);
		// const databasePushRef = dbRef.push({
		// 	videoURL: session.videoURL,
		// 	purposeDescription: session.purposeDescription,
		// 	startTime: session.startTime,
		// 	finishedVideo: false
		// });
		// console.log(databasePushRef);
		// return databasePushRef;
	}

	// static storeEndReview(endSession, databaseKey) {
	// 	this.database
	// 		.ref(`${endSession.userId}/${databaseKey}`)
	// 		.update({
	// 			endTime: endSession.endTime,
	// 			notes: endSession.notes,
	// 			finishedVideo: endSession.finishedVideo
	// 		});
	// }

	// static retrieveUserData(userId) {
	// 	console.log('called');
	// 	const dbRef = this.database.ref(`${userId}`);
	// 	return dbRef.on(
	// 		'value',
	// 		(data) => {
	// 			console.log(data.val());
	// 		},
	// 		(error) => {
	// 			console.log(error);
	// 		}
	// 	);
	// }
}