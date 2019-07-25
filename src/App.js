/*global chrome*/
import { Layout } from 'antd';
import React from 'react';
import './App.scss';
import CustomFooter from './NewTabComponents/UIComponents/CustomFooter';
import Sidebar from './NewTabComponents/UIComponents/Sidebar';
import CustomContent from './NewTabComponents/UIComponents/CustomContent';
import DashboardUserProfile from './NewTabComponents/ObjectLibrary/DashboardUserProfile';
import CustomHeader from './NewTabComponents/UIComponents/CustomHeader';

export default class Main extends React.Component {
	// state = {
	// 	userProfile: null
	// };

	// // obtainUserProfile = (request) => {
	// // 	if (request.type === 'userProfile') {
	// // 		this.setState({ userProfile: new DashboardUserProfile(request.userId, request.userEmail) }, () => {
	// // 			if (this.state.userId === null || this.state.userId === '') {
	// // 				throw new Error('cannot handle empty userId');
	// // 			}
	// // 		});
	// // 	}
	// // };
	// componentDidMount() {
	// 	//chrome.runtime.onMessage.addListener(this.obtainUserProfile);
	// }

	// componentWillUnmount() {
	// 	//chrome.runtime.onMessage.removeListener(this.obtainUserProfile);
	// }

	// retrieveUserData() {
	// 	if (this.state.userId == null) {
	// 		return null;
	// 	}
	// 	//return StoreReview.retrieveUserData(this.state.userId);
	// 	return 'temp';
	// }

	render() {
		const userData = this.retrieveUserData();
		return (
			<div />
			// <Layout style={{ minHeight: '100vh' }}>
			// 	<Sidebar />
			// 	<Layout>
			// 		<CustomHeader userProfile={this.state.userProfile} />
			// 		<CustomContent userData={userData} />
			// 		<CustomFooter />
			// 	</Layout>
			// </Layout>
		);
	}
}
