import React from 'react';
import {Field} from 'src';

export default class Group extends Field {

	render() {
		return (
			<div>
				{this.getChildren()}
			</div>
		)
	}
}