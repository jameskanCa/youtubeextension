/*global chrome*/
/* src/content.js */

import Frame, { FrameContextConsumer } from 'react-frame-component';
import RequestYoutubeMetadata from './requests/RequestYoutubeMetadata';
import React from 'react';
import ReactDOM from 'react-dom';
import ChromeClass from './ChromeClass';
import { Modal } from 'antd';
import VideoMetadata from './Models/VideoMetadata';
import './content.scss';

class Main extends React.Component {
	state = {
		visibleModal: false,
		pauseVideo: false,
		url: '',
		videoMetadata: {}
	};

	obtainMetadata = (request) => {
		if (request.type === 'updatedLink') {
			this.setState({ url: request.currentURL }, async () => {
				const metaDataArray = await RequestYoutubeMetadata.requestVideoMetadata(this.state.url);
				const metaData = metaDataArray.items[0];
				const currentMetadata = new VideoMetadata(
					metaData.snippet.url,
					metaData.snippet.title,
					metaData.contentDetails.duration,
					metaData.snippet.description,
					metaData.snippet.categoryId
				);
				this.setState({ videoMetadata: currentMetadata, visible: true });
			});
		}
	};

	componentDidMount() {
		chrome.runtime.onMessage.addListener(this.obtainMetadata);
		chrome.runtime.onMessage.addListener((request) => {
			if (request.type === 'finishedLoading') {
				this.setState({ pauseVideo: true });
			}
		});
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

	handleOk = (e) => {
		this.setState({
			visibleModal: false,
			readyToPause: false
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
										onOk={this.handleOk}
										okButtonProps={{ disabled: false }}
										cancelButtonProps={{ disabled: true }}
										maskClosable={false}
									>
										<ChromeClass
											onClose={this.handleOk}
											pauseVideo={this.pauseVideo}
											readyToPause={this.state.pauseVideo}
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
