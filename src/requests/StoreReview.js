export class StoreReview {
	static storeInitialReview(session) {
		console.log(JSON.stringify(session));
		fetch('http://localhost:3001/test', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*',
				'Access-Control-Request-Headers': '*',
				'Access-Control-Request-Method': '*'
			},
			mode: 'cors',
			body: JSON.stringify(session)
		})
			.then(function(response) {
				console.log(response);
			})
			.catch((e) => {
				console.log(e);
			});
	}
}
