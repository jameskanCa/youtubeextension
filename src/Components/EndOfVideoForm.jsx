/*global chrome*/
/* src/content.js */
import React from 'react';
import { Form, Input, Button } from 'antd';
import moment from 'moment';
import '../content.scss';

export default class ChromeClass extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		videoType: '',
		notes: '',
		endRating: ''
	};

	onChange = (value) => {
		this.setState({ notes: value });
	};

	onSave = () => {
		let currentTime = moment().toISOString(true);

		const Session = {
			userId: 'jamesKan',
			videoTitle: this.props.videoMetadata.videoTitle,
			videoURL: this.props.videoMetadata.url,
			purposeDescription: this.state.notes,
			startTime: currentTime
		};

		//StoreReview.storeReview(Session);
		//this.props.onClose();
	};

	render() {
		return (
			<div>
				{this.props.videoMetadata.videoTitle}
				<div>Duration: {this.props.videoMetadata.videoDuration} </div>
				<Form>
					<Form.Item label={'What did you learn?'}>
						<Input
							placeholder="Enter notes"
							value={this.state.notes}
							onChange={(event) => this.onChange(event.target.value)}
						/>
					</Form.Item>
				</Form>
				<Button onClick={this.onSave}>Log Session</Button>
			</div>
		);
	}
}
