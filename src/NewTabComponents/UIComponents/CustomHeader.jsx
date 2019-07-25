import * as React from 'react';
import { Layout, Avatar } from 'antd';

const { Header } = Layout;
export default class CustomHeader extends React.Component {
	render() {
		return (
			<Header style={{ background: '#fff', padding: 10 }}>
				<div>
					<Avatar shape="square" icon="user" />
					<div>Email: {this.props.userProfile.email}</div>
				</div>
			</Header>
		);
	}
}
