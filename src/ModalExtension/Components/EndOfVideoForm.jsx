/*global chrome*/
/* src/content.js */
import React from 'react';
import { Form, Input, Button } from 'antd';
import { StoreReview } from '../../requests/StoreReview';
import '../../content.scss';
import EndSession from '../../ObjectLibrary/EndSession';

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

	extractVideoId(url) {
		let video_id = url.split('v=')[1];
		if (video_id.indexOf('&') !== null && video_id.indexOf('&') != -1) {
			return video_id.substring(0, video_id.indexOf('&'));
		}

		return video_id;
	}

	onSave = async () => {
		const endSession = new EndSession(this.props.userId, true, this.state.notes);
		StoreReview.storeEndReview(endSession, this.extractVideoId(this.props.videoMetadata.url));
		this.props.onClose();
	};

	render() {
		return (
			<div>
				{this.props.videoMetadata.videoTitle}
				<Form>
					<Form.Item label={'What did you learn?'}>
						<Input
							placeholder="Enter notes"
							value={this.state.notes}
							onChange={(event) => this.onChange(event.target.value)}
						/>
					</Form.Item>
				</Form>
				<Button
					onClick={() => {
						this.onSave();
					}}
				>
					Log Session
				</Button>
			</div>
		);
	}
}
