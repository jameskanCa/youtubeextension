/*global chrome*/
/* src/content.js */
import React from 'react';
import { Form, Input, Button, Collapse, Alert, Divider, notification, Icon } from 'antd';
import { StoreReview } from '../../requests/StoreReview';
import '../../content.scss';
import { YoutubeCategoryMapping } from '../../Utils/YoutubeCategoryMapping';
import InitialSession from '../../ObjectLibrary/InitialSession';
import TimeCalculations from '../../Utils/TimeCalculations';

const Panel = Collapse.Panel;

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
		if (this.state.purpose == null || this.state.purpose.length < 25) {
			return;
		}

		const Session = [
			new InitialSession(
				this.props.videoMetadata.videoTitle,
				this.props.videoMetadata.url,
				this.state.purpose,
				false
			)
		];
		StoreReview.storeInitialReview({ userId: this.props.userId, session: Session });
		this.props.onClose();
		notification.open({
			message: 'Saved Succesfully',
			description: 'Remember to use your time wisely!',
			icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
			style: { zIndex: 2147483647, marginTop: 100 }
		});
	};

	warnProcastination() {
		if (!YoutubeCategoryMapping.isProcastinationVideo(Number(this.props.videoMetadata.videoCategory))) {
			return null;
		}
		return (
			<React.Fragment>
				<Alert
					message="Procastination Warning"
					description="Are you sure you want to view this video? You might just be procastinating!"
					type="warning"
					showIcon
				/>
				<Divider orientation="left">Content</Divider>
			</React.Fragment>
		);
	}

	render() {
		return (
			<div>
				{this.warnProcastination()}
				{this.props.videoMetadata.videoTitle}
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
				<Divider orientation="left">Video Info</Divider>
				<Collapse bordered={false}>
					<Panel header="Description" key="1">
						{`Description: ${this.props.videoMetadata.videoDescription}`}
					</Panel>
					<Panel header="Duration" key="2">
						{`Duration: ${TimeCalculations.formatSecondsToMinutes(this.props.videoMetadata.videoDuration)}`}
					</Panel>
					<Panel header="Category" key="3">
						{`Category: ${YoutubeCategoryMapping.getYoutubeCategoryText(
							Number(this.props.videoMetadata.videoCategory)
						)}`}
					</Panel>
					<Panel header="Link" key="4">
						{`From link: ${this.props.videoMetadata.url}`}
					</Panel>
				</Collapse>
			</div>
		);
	}
}
