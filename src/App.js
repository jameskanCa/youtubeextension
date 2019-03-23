/*global chrome*/
/* src/content.js */

import Frame, { FrameContextConsumer } from 'react-frame-component';
import RequestYoutubeMetadata from './requests/RequestYoutubeMetadata';
import React from 'react';
import StartOfVideoForm from './Components/StartOfVideoForm';
import EndOfVideoForm from './Components/EndOfVideoForm';
import { Modal } from 'antd';
import VideoMetadata from './Models/VideoMetadata';
import './content.scss';

export default class Main extends React.Component {
	state = {
		visibleModal: true,
		pauseVideo: false,
		url: '',
		videoMetadata: new VideoMetadata('https://www.youtube.com/watch?v=grse', 'fea', 0, 'fe', 'fea'),
		endOfVideo: false,
		dataBaseRef: ''
	};

	obtainMetadata = (request) => {
		this.setState({ url: 'https://www.youtube.com/watch?v=6Nyd1c3KNec' }, async () => {
			const metaDataArray = await RequestYoutubeMetadata.requestVideoMetadata(this.state.url);
			const metaData = metaDataArray.items[0];
			const currentMetadata = new VideoMetadata(
				metaData.snippet.url,
				metaData.snippet.title,
				metaData.contentDetails.duration,
				metaData.snippet.description,
				metaData.snippet.categoryId
			);
			this.setState({ videoMetadata: currentMetadata, visibleModal: true });
		});
	};

	componentDidMount() {
		// document.querySelector('video').addEventListener('ended', () => {
		// 	this.setState({ endOfVideo: true });
		// });
		//chrome.runtime.onMessage.addListener(this.obtainMetadata);
	}

	componentWillUpdate(prevProp, prevState) {
		if (prevState.url != this.state.url) {
			setTimeout(this.pauseVideo, 2000);
		}
	}

	componentWillUnmount() {
		//	chrome.runtime.onMessage.removeListener(this.obtainMetadata);
	}

	pauseVideo = () => {
		//document.getElementsByClassName('ytp-play-button ytp-button')[0].click();
	};

	setVisible = () => {
		this.setState({ visibleModal: true });
	};

	saveDbEntryRef = (reference) => {
		this.setState({ dataBaseRef: reference });
		console.log(reference);
	};

	handleInitialOk = (e) => {
		this.setState({
			visibleModal: false,
			readyToPause: false
		});
		//document.getElementsByClassName('ytp-play-button ytp-button')[0].click();
	};

	handleEndOk = (e) => {
		this.setState({
			endOfVideo: false
		});
	};

	render() {
		return (
			<Frame>
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
