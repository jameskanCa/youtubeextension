/*global chrome*/

import React, { Component } from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import './App.scss';

class App extends Component {
	componentDidMount() {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const currentURL = tabs[0].url;
			if (currentURL == null) {
				throw new Error('currentURL is not obtained thus null');
			}
			let url = new URL(currentURL);
			const domain = url.hostname;
			this.setState({
				domain: domain,
				url: currentURL
			});
			console.log(this.state.url);
		});
	}

	render() {
		return <div className="App">heyyy</div>;
	}
}

export default App;
{
	/* <Frame head={}>
<FrameContextConsumer>
  {({ document, window }) => {
    return <div className="App" />;
  }}
</FrameContextConsumer>
</Frame> */
}
