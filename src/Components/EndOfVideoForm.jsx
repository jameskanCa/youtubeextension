/*global chrome*/
/* src/content.js */
import React from 'react';
import { Form, Input, Button } from 'antd';
import { StoreReview } from '../requests/StoreReview';
import '../content.scss';
import EndSession from '../ObjectLibrary/EndSession';

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
		const endSession = new EndSession(this.props.userId, true, this.state.notes);
		StoreReview.storeEndReview(endSession, this.props.databaseKey);
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
				<Button onClick={this.onSave}>Log Session</Button>
			</div>
		);
	}
}
