/*global chrome*/
/* src/content.js */
import React from 'react';
import { Modal, Input } from 'antd';
export default class NotesModal extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		inputText: ''
	};

	userInputting = (value) => {
		this.setState({ inputText: value.target.value });
	};

	render() {
		return (
			<Modal
				bottom={true}
				width={1200}
				style={{ height: 900, top: '80%', position: 'fixed' }}
				visible={true}
				footer={null}
				closable={true}
				mask={false}
			>
				<Input rows={12} value={this.state.inputText} onChange={this.userInputting} />
			</Modal>
		);
	}
}
