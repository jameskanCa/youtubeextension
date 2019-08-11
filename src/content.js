/*global chrome*/
/* src/content.js */

import Frame, { FrameContextConsumer } from 'react-frame-component';
import React from 'react';
import ReactDOM from 'react-dom';
import StartOfVideoForm from './ModalExtension/Components/StartOfVideoForm';
import EndOfVideoForm from './ModalExtension/Components/EndOfVideoForm';
import { Modal } from 'antd';
import VideoMetadata from './ModalExtension/Models/VideoMetadata';
import './content.scss';

class Main extends React.Component {
	state = {
		userId: '',
		visibleModal: false,
		pauseVideo: false,
		url: '',
		videoMetadata: {},
		endOfVideo: false,
		dataBaseRef: '',
		caption: ''
	};

	obtainMetadata = (request) => {
		if (request.type === 'updatedLink') {
			this.setState({ videoMetadata: request.metadata }, async () => {
				const currentMetadata = new VideoMetadata(
					request.currentURL,
					this.state.videoMetadata.snippet.title,
					this.state.videoMetadata.contentDetails.duration,
					this.state.videoMetadata.snippet.description,
					this.state.videoMetadata.snippet.categoryId
				);
				this.setState({ videoMetadata: currentMetadata, visibleModal: true });
			});
		}
	};

	obtainUserProfile = (request) => {
		if (request.type === 'userProfile') {
			this.setState({ userId: request.userId }, async () => {
				if (this.state.userId === null || this.state.userId === '') {
					throw new Error('cannot handle empty userId');
				}
			});
		}
	};

	componentDidMount() {
		chrome.runtime.onMessage.addListener(this.obtainMetadata);
		chrome.runtime.onMessage.addListener(this.obtainUserProfile);
		chrome.runtime.onMessage.addListener(this.modalCheck);
	}

	componentWillUpdate(prevProp, prevState) {
		if (prevState.url !== this.state.url) {
			setTimeout(this.pauseVideo, 2000);
		}
	}

	componentWillUnmount() {
		chrome.runtime.onMessage.removeListener(this.obtainMetadata);
		chrome.runtime.onMessage.removeListener(this.obtainUserProfile);
		chrome.runtime.onMessage.removeListener(this.modalCheck);
	}

	modalCheck = (request) => {
		if (request.type === 'noModal') {
			if (this.state.visibleModal === true) {
				this.setState({ visibleModal: false });
			}
		}
	};

	pauseVideo = () => {
		document.getElementsByClassName('ytp-play-button ytp-button')[0].click();
	};

	setVisible = () => {
		this.setState({ visibleModal: true });
	};

	saveDbEntryRef = (reference) => {
		this.setState({ dataBaseRef: reference });
	};

	storeCaption = (caption) => {
		this.setState({ caption: caption });
	};

	handleInitialOk = (e) => {
		this.setState({
			visibleModal: false,
			readyToPause: false
		});
		document.getElementsByClassName('ytp-play-button ytp-button')[0].click();
		document.querySelector('video').addEventListener('ended', () => {
			this.setState({ endOfVideo: true });
		});
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
					<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL('/static/css/3.chunk.css')} />,
					<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL('/static/css/4.chunk.css')} />
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
											userId={this.state.userId}
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
										footer={null}
										maskClosable={false}
										closable={false}
									>
										<EndOfVideoForm
											databaseKey={this.state.dataBaseRef}
											onClose={this.handleEndOk}
											userId={this.state.userId}
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
document.body.appendChild(app);
ReactDOM.render(<Main />, app);
