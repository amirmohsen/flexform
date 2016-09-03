import React from 'react';
import Field from '../FlexForm/Field';

export default class Text extends Field {

	onChange = (e) => {
		this.save(e.target.value);
	};

	render() {
		return (
			<input type="text" value={this.getData()} onChange={this.onChange} />
		)
	}
}