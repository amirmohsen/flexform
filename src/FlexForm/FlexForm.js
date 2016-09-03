import React, {Component} from 'react';
import update from 'react-addons-update';
import extend from 'extend';

export default class FlexForm extends Component {

	static propTypes = {
		onInit: React.PropTypes.func,
		onChange: React.PropTypes.func,
		schema: React.PropTypes.object.isRequired,
		data: React.PropTypes.object.isRequired
	};

	static defaultProps = {
		onInit: () => {},
		onChange: () => {}
	};

	static childContextTypes = {
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

	save = ({key, data, schema}) => {
		data = this.initFieldData({data, schema});

		let modifier = {
			data: {}
		};

		key.reduce((modifierPart, keyPart, keyIndex) => {
			modifierPart[keyPart] = {};
			if(keyIndex === key.length - 1) {
				modifierPart[keyPart].$set = data;
				return modifier;
			}
			return modifierPart[keyPart];
		}, modifier.data);

		this.setState(update(this.state, modifier), () => this.props.onChange(this.state.data));
	};

	constructor(props) {
		super(props);
		this.schema = this.getSchema();
		this.state = {
			data: this.initData()
		};
	}

	componentDidMount() {
		this.props.onInit(this.state.data);
	}

	initData() {
		return this.initFieldData({schema: this.schema, data: extend(true, {}, this.props.data || {})});
	}

	initFieldData({schema, data}) {
		if(Array.isArray(schema) && schema.length > 0) {
			data.forEach(item => this.initFieldData({schema: schema[0], data: item}));
			return data;
		}
		else if(typeof schema === 'object') {
			for(let key in schema) {
				let schemaValue = schema[key];
				if(Array.isArray(schemaValue)) {
					if(!data[key]) {
						data[key] = [];
					}
					else if(data[key].length > 0 && schemaValue.length > 0) {
						data[key].forEach(item => this.initFieldData({schema: schemaValue[0], data: item}));
					}
				}
				else if(schemaValue === String)  {
					if(!data[key]) {
						data[key] = '';
					}
				}
				else if(schemaValue === Number)  {
					if(!data[key]) {
						data[key] = 0;
					}
				}
				else if(schemaValue === Boolean)  {
					if(!data[key]) {
						data[key] = false;
					}
				}
				else if(typeof schemaValue === 'object') {
					if(!data[key]) {
						data[key] = {};
					}
					if(Object.keys(schemaValue).length > 0) {
						this.initFieldData({schema: schemaValue, data: data[key]});
					}
				}
				else {
					if(!data[key]) {
						data[key] = null;
					}
				}
			}
		}
		else {
			return data;
		}

		return data;
	}

	getSchema() {
		let schema = extend(true, {}, this.props.schema.tree);
		delete schema.id;
		delete schema._id;
		return schema;
	}

	getChildContext() {
		return {
			flexFormSchema: this.schema,
			flexFormData: this.state.data,
			flexFormSave: this.save,
			flexFormPath: []
		};
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}