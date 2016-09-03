import React, {Component} from 'react';

export default class FlexForm extends Component {

	render() {
		return (
			<div>
				<h1>FlexForm</h1>
				{this.props.children}
			</div>
		);
	}
}