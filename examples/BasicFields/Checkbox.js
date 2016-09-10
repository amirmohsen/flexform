import React from 'react';
import {Field} from 'lib';

export default class Checkbox extends Field {

	static defaultProps = {
		value: true,
		offValue: false
	};

	onChange = () => {
		this.save(this.getData() ? this.props.offValue : this.props.value);
	};

	render() {
		return (
			<input
				type="checkbox"
				name={this.id}
				value={this.props.value}
				onChange={this.onChange}
				checked={this.getData() === this.props.value}
			/>
		)
	}
}