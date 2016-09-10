import React from 'react';
import {Field} from 'src';
import extend from 'extend';

export default class GroupList extends Field {

	onAdd() {
		let data = extend([], this.getData());
		data.push({});
		this.save(data);
	}

	onRemove(index) {
		let data = extend([], this.getData());
		data.splice(index, 1);
		this.save(data);
	}

	getChildren() {
		return super.getChildren().map((child, index) => <div>{child}<button onClick={() => this.onRemove(index)}>Remove</button></div>)
	}

	render() {
		return (
			<div>
				<button onClick={() => this.onAdd()}>Add</button>
				{this.getChildren()}
			</div>
		)
	}
}