/*global chrome*/
/* src/content.js */

import Frame, { FrameContextConsumer } from 'react-frame-component';
import RequestYoutubeMetadata from './requests/RequestYoutubeMetadata';
import React from 'react';
import ReactDOM from 'react-dom';
import StartOfVideoForm from './Components/StartOfVideoForm';
import EndOfVideoForm from './Components/EndOfVideoForm';
import { Modal } from 'antd';
import VideoMetadata from './Models/VideoMetadata';
import './content.scss';

class Main extends React.Component {
	state = {
		visibleModal: false,
		pauseVideo: false,
		url: '',
		videoMetadata: {},
		endOfVideo: false,
		dataBaseRef: ''
	};

	obtainMetadata = (request) => {
		if (request.type === 'updatedLink') {
			this.setState({ url: request.currentURL }, async () => {
				const metaDataArray = await RequestYoutubeMetadata.requestVideoMetadata(this.state.url);
				const metaData = metaDataArray.items[0];
				const currentMetadata = new VideoMetadata(
					this.state.url,
					metaData.snippet.title,
					metaData.contentDetails.duration,
					metaData.snippet.description,
					metaData.snippet.categoryId
				);
				this.setState({ videoMetadata: currentMetadata, visibleModal: true });
			});
		}
	};

	componentDidMount() {
		// document.querySelector('video').addEventListener('started', () => {
		// 	alert('videostarted');
		// });
		// document.querySelector('video').addEventListener('pause', () => {
		// 	alert('videostopped');
		// });
		// document.querySelector('video').addEventListener('play', () => {
		// 	alert('videoresumed');
		// });
		document.querySelector('video').addEventListener('ended', () => {
			this.setState({ endOfVideo: true });
		});
		chrome.runtime.onMessage.addListener(this.obtainMetadata);
	}

	componentWillUpdate(prevProp, prevState) {
		if (prevState.url !== this.state.url) {
			setTimeout(this.pauseVideo, 2000);
		}
	}

	componentWillUnmount() {
		chrome.runtime.onMessage.removeListener(this.obtainMetadata);
	}

	pauseVideo = () => {
		document.getElementsByClassName('ytp-play-button ytp-button')[0].click();
	};

	setVisible = () => {
		this.setState({ visibleModal: true });
	};

	saveDbEntryRef = (reference) => {
		this.setState({ dataBaseRef: reference });
	};

	handleInitialOk = (e) => {
		this.setState({
			visibleModal: false,
			readyToPause: false
		});
		document.getElementsByClassName('ytp-play-button ytp-button')[0].click();
	};

	handleEndOk = (e) => {
		this.setState({
			visibleModal: false,
			endOfVideo: false
		});
	};

	render() {
		return (
			<Frame
				head={[
					<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL('/static/css/content.css')} />,
					<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL('/static/css/0.chunk.css')} />,
					<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL('/static/css/3.chunk.css')} />
				]}
			>
				<FrameContextConsumer>
					{({ document, window }) => {
						return (
							<div>
								{this.state.visibleModal && (
									<Modal
										title="Youtube Noter"
										visible={this.state.visibleModal}
										onOk={this.handleInitialOk}
										footer={null}
										maskClosable={false}
										closable={false}
									>
										<StartOfVideoForm
											getDatabaseRef={this.saveDbEntryRef}
											pauseVideo={this.pauseVideo}
											readyToPause={this.state.pauseVideo}
											videoMetadata={this.state.videoMetadata}
											onClose={this.handleInitialOk}
										/>
									</Modal>
								)}
								{this.state.endOfVideo && (
									<Modal
										title="Youtube Noter"
										visible={this.state.endOfVideo}
										onOk={this.handleEndOk}
										okButtonProps={{ disabled: false }}
										cancelButtonProps={{ disabled: true }}
										maskClosable={false}
										closable={false}
									>
										<EndOfVideoForm
											databaseKey={this.state.dataBaseRef}
											onClose={this.handleEndOk}
											videoMetadata={this.state.videoMetadata}
										/>
									</Modal>
								)}
							</div>
						);
					}}
				</FrameContextConsumer>
			</Frame>
		);
	}
}

const app = document.createElement('div');
app.id = 'my-extension-root';
console.log('dom loaded');
document.body.appendChild(app);
ReactDOM.render(<Main />, app);
