import React from 'react';
import {Field} from 'lib';

export default class Radio extends Field {

	onChange = () => {
		this.save(this.props.value);
	};

	render() {
		return (
			<input
				type="radio"
				name={this.id}
				value={this.props.value}
				onChange={this.onChange}
				checked={this.getData() === this.props.value}
			/>
		)
	}
}