import React, {Component} from 'react';

export default class Field extends Component {

	static propTypes = {
		key: React.PropTypes.string
	};

	static contextTypes = {
		flexFormSchema: React.PropTypes.any,
		flexFormData: React.PropTypes.any,
		flexFormSave: React.PropTypes.func,
		flexFormPath: React.PropTypes.arrayOf(
			React.PropTypes.oneOfType(
				[
					React.PropTypes.string,
					React.PropTypes.number
				]
			)
		)
	};

	static childContextTypes = {
		flexFormSchema: React.PropTypes.any,
		flexFormData: React.PropTypes.any,
		flexFormPath: React.PropTypes.arrayOf(
			React.PropTypes.oneOfType(
				[
					React.PropTypes.string,
					React.PropTypes.number
				]
			)
		)
	};

	constructor(props, context) {
		super(props, context);
		this.schema = this.getSchema();
		this.fullKey = [...this.context.flexFormPath, this.props.path];
		this.id = this.fullKey.join('-');
	}

	getSchema() {
		if(this.context.flexFormSchema[this.props.path] !== undefined) {
			return this.context.flexFormSchema[this.props.path];
		}
		else if(Number.isInteger(this.props.path) && this.context.flexFormSchema[0] !== undefined) {
			return this.context.flexFormSchema[0];
		}
		else {
			return {};
		}
	}

	getData() {
		return this.context.flexFormData[this.props.path]
	}

	getChildren() {
		if(Array.isArray(this.getSchema())) {
			return this.getData().map((itemData, index) => {
				return React.cloneElement(this.props.children, {
					path: index
				});
			});
		}
		else {
			return this.props.children;
		}
	}

	save(data) {
		this.context.flexFormSave({key: this.fullKey, data, schema: this.getSchema()});
	}

	getChildContext() {
		return {
			flexFormSchema: this.schema,
			flexFormData: this.getData(),
			flexFormPath: this.fullKey
		};
	}

	render() {
		return null;
	}
}