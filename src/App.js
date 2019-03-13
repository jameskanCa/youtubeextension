import Frame, { FrameContextConsumer } from 'react-frame-component';
import RequestYoutubeMetadata from './requests/RequestYoutubeMetadata';
import React from 'react';
import ReactDOM from 'react-dom';
import ChromeClass from './ChromeClass';
import { Modal } from 'antd';
import VideoMetadata from './Models/VideoMetadata';
import './content.scss';

import './App.scss';

class App extends React.Component {
	state = {
		visible: false,
		pauseVideo: false,
		url: '',
		// Is giving empty object correct?
		videoInfo: new VideoMetadata('https://www.youtube.com/watch?v=grse', 'fea', 0, 'fe', 'fea')
	};

	obtainMetadata = (request) => {
		//if (request.type === 'updatedLink') {
		this.setState({ url: 'https://www.youtube.com/watch?v=0tnX81N6Ris' }, async () => {
			const metaDataArray = await RequestYoutubeMetadata.requestVideoMetadata(this.state.url);
			const metaData = metaDataArray.items[0];
			const currentMetadata = new VideoMetadata(
				metaData.snippet.url,
				metaData.snippet.title,
				metaData.contentDetails.duration,
				metaData.snippet.description,
				metaData.snippet.categoryId
			);
			this.setState({ videoInfo: currentMetadata, visible: true });
		});
		//}
	};

	componentDidMount() {
		this.obtainMetadata('');
		//chrome.runtime.onMessage.addListener(this.obtainMetadata);
		// chrome.runtime.onMessage.addListener((request) => {
		// 	if (request.type === 'finishedLoading') {
		// 		this.setState({ pauseVideo: true });
		// 	}
		// });
	}

	componentWillUnmount() {
		//chrome.runtime.onMessage.removeListener(this.obtainMetadata);
	}

	pauseVideo = () => {
		document.getElementsByClassName('ytp-play-button ytp-button')[0].click();
	};

	setVisible = () => {
		this.setState({ visible: true });
	};

	handleOk = (e) => {
		this.setState({
			visible: false,
			readyToPause: false
		});
	};

	render() {
		return (
			<Frame>
				<FrameContextConsumer>
					{({ document, window }) => {
						return (
							<div>
								{this.state.visible && (
									<Modal
										title="Youtube Extension"
										visible={this.state.visible}
										onOk={this.handleOk}
										okButtonProps={{ disabled: false }}
										maskClosable={false}
									>
										<ChromeClass
											onClose={this.handleOk}
											pauseVideo={this.pauseVideo}
											readyToPause={this.state.pauseVideo}
											videoMetadata={this.state.videoInfo}
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

export default App;
