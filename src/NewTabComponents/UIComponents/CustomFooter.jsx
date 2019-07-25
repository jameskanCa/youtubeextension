import * as React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;
export default class CustomFooter extends React.Component {
	render() {
		return <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>;
	}
}
