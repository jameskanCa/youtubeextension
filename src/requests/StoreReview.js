export class StoreReview {
	static async storeInitialReview(session) {
		try {
			let result = await fetch('http://localhost:3001/storeInitialReview', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					Accept: '*',
					'Access-Control-Request-Headers': '*',
					'Access-Control-Request-Method': '*'
				},
				mode: 'cors',
				body: JSON.stringify(session)
			});
		} catch (e) {
			console.log(e);
		}
	}

	static async storeEndReview(endSession, id) {
		try {
			await fetch('http://localhost:3001/storeEndSessionInfo/' + id, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					Accept: '*',
					'Access-Control-Request-Headers': '*',
					'Access-Control-Request-Method': '*'
				},
				mode: 'cors',
				body: JSON.stringify(endSession)
			});
		} catch (e) {
			console.log(e);
		}
	}
}
