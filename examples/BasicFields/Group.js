import React from 'react';
import {Field} from 'lib';

export default class Group extends Field {

	render() {
		return (
			<div>
				{this.getChildren()}
			</div>
		)
	}
}