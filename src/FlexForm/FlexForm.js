import React, {Component} from 'react';
import extend from 'extend';
import DataStore from './DataStore';

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

	onDataReady = (data) => {
		this.state = {
			data
		};
	};

	onDataUpdate = (data) => {
		this.setState({
			data
		}, () => this.props.onChange(this.state.data));
	};

	constructor(props) {
		super(props);
		this.schema = this.getSchema();
		this.dataStore = new DataStore({
			schema: this.schema,
			data: this.props.data,
			onReady: this.onDataReady,
			onUpdate: this.onDataUpdate
		});
	}

	componentDidMount() {
		this.props.onInit(this.state.data);
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
			flexFormSave: this.dataStore.save.bind(this.dataStore),
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