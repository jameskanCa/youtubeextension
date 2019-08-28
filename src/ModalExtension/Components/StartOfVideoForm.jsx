/*global chrome*/
/* src/content.js */
import React from 'react';
import { Form, Input, Button, Collapse, Alert, Divider, notification, Icon, Menu, Dropdown, message } from 'antd';
import { StoreReview } from '../../requests/StoreReview';
import '../../content.scss';
import { YoutubeCategoryMapping } from '../../Utils/YoutubeCategoryMapping';
import InitialSession from '../../ObjectLibrary/InitialSession';
import TimeCalculations from '../../Utils/TimeCalculations';
import YoutubeCaption from '../../requests/YoutubeCaption';

const Panel = Collapse.Panel;

export default class ChromeClass extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		videoType: '',
		purpose: '',
		initialRating: '',
		languageOptions: [],
		selectedLanguage: ''
	};

	onChange = (value) => {
		this.setState({ purpose: value });
	};

	async componentDidMount() {
		let options = await YoutubeCaption.requestVideoLanguageOptions();
		this.setState({ languageOptions: options });
	}

	extractVideoId(url) {
		let video_id = url.split('v=')[1];
		if (video_id.indexOf('&') !== null && video_id.indexOf('&') != -1) {
			return video_id.substring(0, video_id.indexOf('&'));
		}

		return video_id;
	}

	async onSave() {
		if (this.state.purpose == null || this.state.purpose.length < 25) {
			return;
		}
		const Session = [
			new InitialSession(
				this.extractVideoId(this.props.videoMetadata.url),
				this.props.videoMetadata.videoTitle,
				this.state.purpose,
				false
			)
		];

		await StoreReview.storeInitialReview({ userId: this.props.userId, session: Session });

		// Get Youtube Caption
		if (this.state.languageOptions[0] != null) {
			let captionForVideo = await YoutubeCaption.requestVideoCaption(this.state.selectedLanguage);
			console.log(captionForVideo);
		}

		this.props.onClose();
		notification.open({
			message: 'Saved Succesfully',
			description: 'Remember to use your time wisely!',
			icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
			style: { zIndex: 2147483647, marginTop: 100 }
		});
	}

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

	onClick = ({ key }) => {
		message.info(`Click on item ${key}`);
		this.setState({ selectedLanguage: key });
	};

	formatLanguageOptions() {
		return (
			<Menu onClick={this.onClick}>
				{this.state.languageOptions.map((language) => {
					return <Menu.Item key={language.lang_code}>{language.lang_translated}</Menu.Item>;
				})}
			</Menu>
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
				<Dropdown overlay={this.formatLanguageOptions()}>
					<a className="ant-dropdown-link">
						Select Transcript Language <Icon type="down" />
					</a>
				</Dropdown>
				<Button
					onClick={() => {
						this.onSave();
					}}
				>
					Log Session
				</Button>
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
