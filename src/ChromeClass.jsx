/*global chrome*/
/* src/content.js */
import React from 'react';
import { Form, Input, Button } from 'antd';
import moment from 'moment';
import './content.scss';

export default class ChromeClass extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		videoType: '',
		purpose: '',
		initialRating: ''
	};

	onChange = (value) => {
		this.setState({ purpose: value });
	};

	onSave = () => {
		let currentTime = moment().toISOString(true);

		const Session = {
			videoTitle: this.props.videoMetadata.videoTitle,
			videoURL: this.props.videoMetadata.url,
			purposeDescription: this.state.purpose,
			startTime: currentTime
		};

		//this.props.onClose();
	};

	render() {
		//Move this to compoent did Update
		if (this.props.readyToPause) {
			this.props.pauseVideo();
		}

		return (
			<div>
				{this.props.videoMetadata.videoTitle}
				<div>From link: {this.props.videoMetadata.url} </div>
				<div>Description: {this.props.videoMetadata.videoDescription} </div>
				<div>Duration: {this.props.videoMetadata.videoDuration} </div>
				<div>Category: {this.props.videoMetadata.videoCategory} </div>
				<Form>
					<Form.Item label={'Purpose of Watching'}>
						<Input
							placeholder="Purpose of watching this video."
							value={this.state.purpose}
							onChange={(event) => this.onChange(event.target.value)}
						/>
					</Form.Item>
				</Form>
				<Button onClick={this.onSave}>Log Session</Button>
			</div>
		);
	}
}
