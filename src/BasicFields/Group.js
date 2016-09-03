import React from 'react';
import Field from '../FlexForm/Field';

export default class Group extends Field {

	render() {
		return (
			<div>
				{this.getChildren()}
			</div>
		)
	}
}