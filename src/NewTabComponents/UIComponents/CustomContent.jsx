/*global chrome*/

import * as React from 'react';
import { StoreReview } from '../../requests/StoreReview';
import HistoryDisplay from './HistoryDisplay';

export default class CustomContent extends React.Component {
	render() {
		return (
			<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
				<HistoryDisplay userData={this.props.userData} />
			</div>
		);
	}
}
